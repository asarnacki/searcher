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
});

describe("actions", () => {
  describe("loginUser", () => {
    it("log user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });
});
