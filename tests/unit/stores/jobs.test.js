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

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from jobs list", () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Full-time" },
      ];

      const result = store.UNIQUE_JOB_TYPES;

      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
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
      const result = jobsStore.FILTERED_JOBS;

      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" },
      ]);
    });
  }); 

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected any organizations", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const store = useJobsStore();
        const job = {
          organization: "Google",
        };

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];
      const store = useJobsStore();
      const job = {
        organization: "Google",
      };

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job types", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const store = useJobsStore();
        const job = {
          jobType: "Full-time",
        };

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time", "Part-time"];
      const store = useJobsStore();
      const job = {
        jobType: "Part-time",
      };

      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

      expect(result).toBe(true);
    });
  });
});
