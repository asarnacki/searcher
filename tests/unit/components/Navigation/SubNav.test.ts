import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import type { Mock } from "vitest";
import SubNav from "@/components/Navigation/SubNav.vue";
import { useJobsStore } from "@/stores/jobs";

import { useRoute } from "vue-router";
vi.mock("vue-router");

const useRouteMock = useRoute as Mock;

describe("SubNav", () => {
  const renderSubnav = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(SubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesoneIcon: true,
        },
      },
    });
    return { jobsStore };
  };
  describe("when user is on jobs page", () => {
    it("displays job count", async () => {
      useRouteMock.mockReturnValue({ name: "JobResults" });

      const { jobsStore } = renderSubnav();
      const numberOfJobs = 16;
      //@ts-expect-error
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe("when user is on jobs page", () => {
    it("does NOT display job count", () => {
      useRouteMock.mockReturnValue({ name: "Test" });

      const { jobsStore } = renderSubnav();
      const numberOfJobs = 16;
      //@ts-expect-error
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
