import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import JobListings from "@/components/JobResults/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";

describe("JobListings", () => {
  const createRoute = (queryParams) => ({
    query: {
      page: "2",
      ...queryParams,
    },
  });

  const renderJobListings = ($route) => {
    const pinia = createTestingPinia();

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route,
        },
      },
    });
  };

  it("fetches jobs", () => {
    const $route = createRoute();
    renderJobListings($route);
    const jobStore = useJobsStore();
    expect(jobStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("displays max of 10 jobs", async () => {
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);
    renderJobListings($route);

    const jobStore = useJobsStore();
    jobStore.jobs = Array(15).fill({});

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1 ", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number ", () => {
      const queryParams = { page: "6" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      expect(screen.getByText("Page 6")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("does not show link to prev page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows link do previous page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
