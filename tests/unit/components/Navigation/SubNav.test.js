import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import SubNav from "@/components/Navigation/SubNav.vue";
import { useJobsStore } from "@/stores/jobs";

describe("SubNav", () => {
  const renderSubnav = (routeName) => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(SubNav, {
      global: {
        plugins: [pinia],
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
    return { jobsStore };
  };
  describe("when user is on jobs page", () => {
    it("displays job count", async () => {
      const routeName = "JobResults";

      const { jobsStore } = renderSubnav(routeName);
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe("when user is on jobs page", () => {
    it("does NOT display job count", () => {
      const routeName = "Test";

      const { jobsStore } = renderSubnav(routeName);
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
