import './src/jest/globals';
import "@testing-library/jest-dom";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

beforeEach(() => {
  // Reset the implementations before each test
  jest.clearAllMocks();
});
