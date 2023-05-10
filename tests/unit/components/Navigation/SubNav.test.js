import { render, screen } from "@testing-library/vue";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav", () => {
  const renderSubnav = (routeName) => {
    render(SubNav, {
      global: {
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesoneIcon: true,
        },
      },
    });
  };
  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      const routeName = "JobResults";
      renderSubnav(routeName);
      const jobCount = screen.getByText("1655");
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe("when user is on jobs page", () => {
    it("does NOT display job count", () => {
      const routeName = "Test";
      renderSubnav(routeName);
      const jobCount = screen.queryByText("1655");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
