import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFiltersOrganizations", () => {
  const renderJobFilterSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();

    render(JobFiltersOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore };
  };

  it("renders unique list of organizations from jobs", async () => {
    const { jobsStore } = renderJobFilterSidebarOrganizations();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const organizationListItems = screen.getAllByRole("listitem");
    const organizations = organizationListItems.map((node) => node.textContent);
    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  it("communicates that user selected checkbox for organization", async () => {
    const { jobsStore, userStore } = renderJobFilterSidebarOrganizations();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const googleCheckbox = screen.getByRole("checkbox", { name: /google/i });
    await userEvent.click(googleCheckbox);

    expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
      "Google",
    ]);
  });
});
