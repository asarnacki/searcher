import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("kepps track if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that user filter jobs", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it("stores job types that user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it("stores degrees that the user would like to filters jobs by", () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });
});

describe("actions", () => {
  describe("loginUser", () => {
    it("log user in", () => {
      const store = useUserStore();
      store.LOGIN_USER();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updated organizations user has chosen to filter jobs", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["Org1", "Org2"]);
      expect(store.selectedOrganizations).toEqual(["Org1", "Org2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types that user choose to filter", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["Full-time", "Part-time"]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees types that user choose to filter degrees by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Master's", "Bachelor's"]);
    });
  });
  describe("CLEAR_USER_JOB_FILTER_SELECTIONS", () => {
    it("removes job filters that has been chosen", () => {
      const store = useUserStore();
      store.selectedDegrees = ["Sth degree"];
      store.selectedOrganizations = ["Sth organization"];
      store.selectedJobTypes = ["Sth job type"];
      store.CLEAR_USER_JOB_FILTER_SELECTIONS();

      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
    });
  });
});
