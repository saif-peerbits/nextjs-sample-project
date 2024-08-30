import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "@/components/LoginForm";
import { loginUser } from "@/services/login";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Mock the loginUser function and useRouter
jest.mock("@/services/login");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

describe("LoginForm", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it("renders the login form with heading", () => {
    render(<LoginForm />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 6 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it("calls loginUser and redirects on successful login", async () => {
    const mockResponse = {
      data: {
        token: "test-token",
      },
    };
    (loginUser as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith("testuser", "password123");
      expect(Cookies.set).toHaveBeenCalledWith("token", "test-token", {
        expires: 7,
      });
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("handles login failure", async () => {
    const mockError = new Error("Login failed");
    (loginUser as jest.Mock).mockRejectedValueOnce(mockError);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith("wronguser", "wrongpassword");
      expect(mockPush).not.toHaveBeenCalled();
      expect(screen.queryByText("Login failed")).not.toBeInTheDocument();
    });
  });
});
