import { render, screen } from "@testing-library/react";
import "@testing-library/react";
import React from "react";
import Landing from "./Landing";

test("Needs have a div component", () => {
  render(<div></div>);
});

test("Needs a H3 with text message", () => {
  const text = "Test message wiuwiuwiu";
  render(<h3>{text}</h3>);
});

describe(" Testing Lading Page ", () => {
  it("Needs a H3 with text message 'Be your own Chef' ", () => {
    render(<Landing />);
    expect(screen.queryByText(/Be your own Chef/i)).toBeInTheDocument();
  });

  it("The First div must have 'todo' id", () => {
    render(<Landing />);
    expect(screen.getByTestId("todo")).toBeInTheDocument();
  });

  it("Needs have the text 'Join Now!' on the button", () => {
    render(<Landing />);
    expect(screen.queryByText(/Join Now!/i)).toBeInTheDocument();
  });

  it("The First a component must have 'fakebutton' id", () => {
    render(<Landing />);
    expect(screen.getByTestId("fakebutton")).toBeInTheDocument();
  });
});
