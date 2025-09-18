import Select from "@/components/ui/Select";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("Select Component", () => {
  it("renders with placeholder when no value selected", () => {
    const handleChange = jest.fn();

    render(
      <Select
        value=""
        onValueChange={handleChange}
        options={mockOptions}
        placeholder="Choose an option"
      />,
    );

    expect(screen.getByText("Choose an option")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders with default placeholder when no custom placeholder provided", () => {
    const handleChange = jest.fn();

    render(
      <Select value="" onValueChange={handleChange} options={mockOptions} />,
    );

    expect(screen.getByText("Select option...")).toBeInTheDocument();
  });

  it("renders with selected value", () => {
    const handleChange = jest.fn();

    render(
      <Select
        value="option2"
        onValueChange={handleChange}
        options={mockOptions}
      />,
    );

    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.queryByText("Select option...")).not.toBeInTheDocument();
  });

  it("applies correct text color classes for selected and placeholder text", () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Select
        value=""
        onValueChange={handleChange}
        options={mockOptions}
        placeholder="Choose option"
      />,
    );

    // Placeholder text should have different color class
    const placeholderSpan = screen.getByText("Choose option");
    expect(placeholderSpan).toHaveClass("text-[#f9fafb]0");

    // Selected option should have different color class
    rerender(
      <Select
        value="option1"
        onValueChange={handleChange}
        options={mockOptions}
      />,
    );

    const selectedSpan = screen.getByText("Option 1");
    expect(selectedSpan).toHaveClass("text-[#111827]");
  });

  it("opens dropdown when main button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Select value="" onValueChange={handleChange} options={mockOptions} />,
    );

    const mainButton = screen.getByRole("button", { name: /select option/i });

    // Initially, dropdown options should not be visible
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();

    // Click to open dropdown
    await user.click(mainButton);

    // Now options should be visible
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("closes dropdown when main button is clicked again", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Select value="" onValueChange={handleChange} options={mockOptions} />,
    );

    const mainButton = screen.getByRole("button", { name: /select option/i });

    // Open dropdown
    await user.click(mainButton);
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    // Close dropdown
    await user.click(mainButton);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  it("selects option when option button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Select value="" onValueChange={handleChange} options={mockOptions} />,
    );

    // Open dropdown
    const mainButton = screen.getByRole("button", { name: /select option/i });
    await user.click(mainButton);

    // Click on specific option
    const option2Button = screen.getByRole("button", { name: "Option 2" });
    await user.click(option2Button);

    // Check that callback was called with correct value
    expect(handleChange).toHaveBeenCalledWith("option2");
    expect(handleChange).toHaveBeenCalledTimes(1);

    // Dropdown should close after selection
    expect(
      screen.queryByRole("button", { name: "Option 1" }),
    ).not.toBeInTheDocument();
  });

  it("closes dropdown when overlay is clicked", async () => {
    const handleChange = jest.fn();

    render(
      <Select value="" onValueChange={handleChange} options={mockOptions} />,
    );

    // Open dropdown
    const mainButton = screen.getByRole("button", { name: /select option/i });
    fireEvent.click(mainButton);

    // Verify dropdown is open
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    // Find and click overlay
    const overlay = document.querySelector(".fixed.inset-0.z-0");
    expect(overlay).toBeInTheDocument();

    if (overlay) {
      fireEvent.click(overlay);
    }

    // Dropdown should be closed
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  it("rotates arrow icon when dropdown is opened", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Select value="" onValueChange={handleChange} options={mockOptions} />,
    );

    const mainButton = screen.getByRole("button", { name: /select option/i });
    const arrow = mainButton.querySelector("svg");

    // Initially arrow should not be rotated
    expect(arrow).not.toHaveClass("rotate-180");

    // Open dropdown
    await user.click(mainButton);

    // Arrow should be rotated
    expect(arrow).toHaveClass("rotate-180");

    // Close dropdown
    await user.click(mainButton);

    // Arrow should return to normal position
    expect(arrow).not.toHaveClass("rotate-180");
  });

  it("applies custom className to container", () => {
    const handleChange = jest.fn();

    render(
      <Select
        value=""
        onValueChange={handleChange}
        options={mockOptions}
        className="custom-select-class"
      />,
    );

    const container = screen.getByRole("button").parentElement;
    expect(container).toHaveClass("custom-select-class", "relative");
  });

  it("renders all provided options in dropdown", async () => {
    const user = userEvent.setup();
    const customOptions = [
      { value: "cat", label: "Cat" },
      { value: "dog", label: "Dog" },
      { value: "bird", label: "Bird" },
      { value: "fish", label: "Fish" },
    ];
    const handleChange = jest.fn();

    render(
      <Select value="" onValueChange={handleChange} options={customOptions} />,
    );

    // Open dropdown
    const mainButton = screen.getByRole("button", { name: /select option/i });
    await user.click(mainButton);

    // Check all options are rendered
    expect(screen.getByText("Cat")).toBeInTheDocument();
    expect(screen.getByText("Dog")).toBeInTheDocument();
    expect(screen.getByText("Bird")).toBeInTheDocument();
    expect(screen.getByText("Fish")).toBeInTheDocument();
  });

  it("handles empty options array gracefully", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Select value="" onValueChange={handleChange} options={[]} />);

    // Should render main button
    const mainButton = screen.getByRole("button", { name: /select option/i });
    expect(mainButton).toBeInTheDocument();

    // Open dropdown
    await user.click(mainButton);

    // Should not crash and should show empty dropdown
    const dropdown = document.querySelector(".absolute.top-full");
    expect(dropdown).toBeInTheDocument();
  });

  it("maintains correct button type attributes", () => {
    const handleChange = jest.fn();

    render(
      <Select value="" onValueChange={handleChange} options={mockOptions} />,
    );

    const mainButton = screen.getByRole("button", { name: /select option/i });
    expect(mainButton).toHaveAttribute("type", "button");
  });

  it("handles keyboard accessibility", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Select value="" onValueChange={handleChange} options={mockOptions} />,
    );

    const mainButton = screen.getByRole("button", { name: /select option/i });

    // Focus the main button
    mainButton.focus();
    expect(mainButton).toHaveFocus();

    // Should be able to open with Enter key
    await user.keyboard("{Enter}");
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });
});
