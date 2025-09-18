import Button from "@/components/ui/Button";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn-primary", "px-4", "py-2");
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="secondary">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-secondary");

    rerender(<Button variant="ghost">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-gray-100");

    rerender(<Button variant="outline">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "border",
      "border-[#d1d5db]",
    );
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
