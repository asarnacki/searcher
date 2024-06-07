import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

vi.mock("vue-router");

const useRouteMock = useRouter as Mock;

describe("JobFiltersSidebarCheckboxGroup", () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>;
    action: Mock;
  }
  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => ({
    uniqueValues: new Set(["ValA", "ValV"]),
    action: vi.fn(),
    ...props,
  });

  const renderJobFilterSidebarCheckboxGroup = (
    props: JobFiltersSidebarCheckboxGroupProps
  ) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it("renders unique list of values", () => {
    const props = createProps({
      uniqueValues: new Set(["Full-time", "Part-time"]),
    });
    renderJobFilterSidebarCheckboxGroup(props);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user click checkbox", () => {
    it("communicates that user selected checkbox for value", async () => {
      useRouteMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(["Full-time", "Part-time"]),
        action,
      });
      renderJobFilterSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(["Full-time"]);
    });

    it("navigates user to job results page to see filtered jobs", async () => {
      const push = vi.fn();
      useRouteMock.mockReturnValue({ push });
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(["part-time"]),
        action,
      });
      renderJobFilterSidebarCheckboxGroup(props);

      const partTimeCheckbox = screen.getByRole("checkbox", {
        name: /part-time/i,
      });
      await userEvent.click(partTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });

  describe("when user clear job filters", () => {
    it("uncheack any checked checkboxes", async () => {
      useRouteMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(["part-time"]),
        action,
      });

      const { userStore } = renderJobFilterSidebarCheckboxGroup(props);

      const partTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>(
        "checkbox",
        {
          name: /part-time/i,
        }
      );
      await userEvent.click(partTimeCheckboxBeforeAction);

      expect(partTimeCheckboxBeforeAction.checked).toBe(true);

      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();

      const partTimeCheckboxAfterAction =
        await screen.findByRole<HTMLInputElement>("checkbox", {
          name: /part-time/i,
        });
      expect(partTimeCheckboxAfterAction.checked).toBe(false);
    });
  });
});
