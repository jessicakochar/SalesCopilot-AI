import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/login", () => () => <div>Login Page</div>);
jest.mock("./components/Sales", () => () => <div>Sales Dashboard</div>);
jest.mock("./protectedRoutes", () => ({ children }) => children);

test("renders the login route", () => {
  window.history.pushState({}, "Login", "/login");

  render(<App />);

  expect(screen.getByText(/login page/i)).toBeInTheDocument();
});
