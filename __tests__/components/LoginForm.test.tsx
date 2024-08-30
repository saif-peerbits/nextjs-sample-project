import LoginForm from "@/components/auth/LoginForm";
import { loginApi } from "@/services/login";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Cookies from "js-cookie";
import { act } from "react";

import translations from "../../messages/en.json";
import { NextIntlClientProvider } from "next-intl";

jest.mock("@/services/login", () => ({
  loginApi: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

describe("LoginForm", () => {
  const renderWithIntl = (ui: React.ReactElement, locale = "en") => {
    return render(
      <NextIntlClientProvider locale={locale} messages={translations}>
        {ui}
      </NextIntlClientProvider>
    );
  };

  it("renders the login form with heading", () => {
    renderWithIntl(<LoginForm />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("fills errors if submit without entering username and password", async () => {
    renderWithIntl(<LoginForm />);

    // Simulate user typing in the form
    const usernameField = await waitFor(() =>
      screen.getByLabelText("Username")
    );
    const passwordField = screen.getByLabelText("Password");
    const submitButton = screen.getByTestId("test-login-submit-button");

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: "" } });
      fireEvent.change(passwordField, { target: { value: "" } });
      fireEvent.click(submitButton);
    });
  });

  it("fills in the form and submits successfully", async () => {
    (loginApi as jest.Mock).mockResolvedValue({
      data: { token: "mock-token" },
    });

    renderWithIntl(<LoginForm />);

    // Simulate user typing in the form
    const usernameField = await waitFor(() =>
      screen.getByLabelText("Username")
    );
    const passwordField = screen.getByLabelText("Password");
    const submitButton = screen.getByTestId("test-login-submit-button");

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: "emilys" } });
      fireEvent.change(passwordField, { target: { value: "emilyspass" } });
      fireEvent.click(submitButton);
    });

    expect(Cookies.set).toHaveBeenCalledWith("token", "mock-token", {
      expires: 7,
    });
  });

  it("handles login failure", async () => {
    const mockError = new Error("Login failed");
    (loginApi as jest.Mock).mockRejectedValueOnce(mockError);

    renderWithIntl(<LoginForm />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Username"), {
        target: { value: "wronguser" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "wrongpassword" },
      });
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    await waitFor(() => {
      expect(loginApi).toHaveBeenCalledWith("wronguser", "wrongpassword");
      expect(screen.queryByText("Login failed")).not.toBeInTheDocument();
    });
  });
});
