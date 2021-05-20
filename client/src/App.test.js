import { render, screen } from "@testing-library/react";

test("Needs have a div component", () => {
  render(<div></div>);
});

test("Needs a H3 with text message", () => {
  const text = "Test message wiuwiuwiu";
  render(<h3>{text}</h3>);
});
