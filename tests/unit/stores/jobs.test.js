import { createPinia, setActivePinia } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import axios from "axios";

vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API requests and stores received jobs", async () => {
      axios.get.mockResolvedValue({
        data: ["Job 1", "Job 2"],
      });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });
});

describe("getteres", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique oganizations from list jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" },
      ];

      const result = store.UNIQUE_ORGANIZATIONS;

      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("FILTERED_JOBS_ORGANIZATIONS", () => {
    it("identifies jobs that are associated with given organizations", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" },
      ];

      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];

      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;
      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Microsoft" },
      ]);
    });
  });

  describe("when user has not selected organizations", () => {
    it("return all jobs", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" },
      ];

      const userStore = useUserStore();
      userStore.selectedOrganizations = [];
      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" },
      ]);
    });
  });
});
