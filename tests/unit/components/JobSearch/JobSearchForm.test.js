import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSearchForm", () => {
  describe("When usedr submits form", () => {
    it("directs user to job results page with params", async () => {
      const push = vi.fn();
      const $router = { push };
      render(JobSearchForm, {
        global: {
          mocks: {
            $router,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const roleInput = screen.getByRole("textbox", {
        name: /role/i,
      });
      await userEvent.type(roleInput, "Vue Dev");

      const locationInput = screen.getByRole("textbox", {
        name: /where?/i,
      });
      await userEvent.type(locationInput, "Gdynia");

      const sutmitButton = screen.getByRole("button", {
        name: /search/i,
      });
      await userEvent.click(sutmitButton);

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: { role: "Vue Dev", location: "Gdynia" },
      });
    });
  });
});
