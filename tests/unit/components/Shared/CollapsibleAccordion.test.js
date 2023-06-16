import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  const renderCollapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "My Category",
      },
      slots: {
        default: "<h3>Nested child</h3>",
      },
      ...config,
    });
  };
  it("renders child compoenent", async () => {
    const props = {
      header: "My Category",
    };
    const slots = {
      default: "<h3>Nested child</h3>",
    };
    const config = { props, slots };

    renderCollapsibleAccordion(config);

    expect(screen.queryByText("Nested child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /my category/i });
    await userEvent.click(button);
    expect(screen.queryByText("Nested child")).toBeInTheDocument();
  });

  describe("when parent doesnt provide custom child content", () => {
    it("renders default content", async () => {
      const props = {
        header: "My Category",
      };
      const slots = {};
      const config = { props, slots };

      renderCollapsibleAccordion(config);

      const button = screen.getByRole("button", { name: /my category/i });
      await userEvent.click(button);
      expect(screen.queryByText("Default content")).toBeInTheDocument();
    });
  });
});
