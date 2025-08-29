import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Bitcoin Ticker heading", () => {
  render(<App />);
  const heading = screen.getByText(/Bitcoin Ticker/i);
  expect(heading).toBeInTheDocument();
});
