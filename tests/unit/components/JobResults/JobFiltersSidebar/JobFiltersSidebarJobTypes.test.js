import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

import { useRoute } from "vue-router";
vi.mock("vue-router");

describe("JobFiltersSidebarJobTypes", () => {
  const renderJobFilterSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();

    render(JobFiltersSidebarJobTypes, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore };
  };

  it("renders unique list of job types from jobs", async () => {
    const { jobsStore } = renderJobFilterSidebarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user click checkbox", () => {
    it("communicates that user selected checkbox for organization", async () => {
      useRoute.mockReturnValue({ push: vi.fn() });
      const { jobsStore, userStore } = renderJobFilterSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        "Full-time",
      ]);
    });

    it("navigates user to job results page to see filtered jobs", async () => {
      const push = vi.fn();
      useRoute.mockReturnValue({ push });
      const { jobsStore } = renderJobFilterSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Part-time"]);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const partTimeCheckbox = screen.getByRole("checkbox", {
        name: /part-time/i,
      });
      await userEvent.click(partTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
