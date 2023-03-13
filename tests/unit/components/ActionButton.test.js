import { render, screen } from "@testing-library/vue";
import ActionButton from "@/components/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    render(ActionButton, {
      props: {
        text: "Sign in",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("applies one style to button", () => {
    render(ActionButton, {
      props: {
        text: "Test",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /test/i,
    });

    expect(button).toHaveClass("primary");
  });
});
