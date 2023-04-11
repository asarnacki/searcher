import { render, screen } from "@testing-library/vue";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav", () => {
  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      render(SubNav, {
        global: {
          stubs: {
            FontAwesoneIcon: true,
          },
        },
        data() {
          return { onJobResultsPage: true };
        },
      });
      const jobCount = screen.getByText("1655");
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe("when user is on jobs page", () => {
    it("does NOT display job count", () => {
      render(SubNav, {
        global: {
          stubs: {
            FontAwesoneIcon: true,
          },
        },
        data() {
          return { onJobResultsPage: false };
        },
      });
      const jobCount = screen.queryByText("1655");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
