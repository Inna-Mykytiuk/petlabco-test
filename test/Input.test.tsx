import Input from "@/components/ui/Input";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Input Component", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("input");
  });

  it("displays error message when error prop is provided", () => {
    const errorMessage = "This field is required";
    render(<Input error={errorMessage} />);

    const input = screen.getByRole("textbox");
    const errorText = screen.getByText(errorMessage);

    expect(input).toHaveClass("border-red-500", "focus-visible:ring-red-500");
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass("text-red-600");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
    expect(handleChange).toHaveBeenCalled();
  });
});
