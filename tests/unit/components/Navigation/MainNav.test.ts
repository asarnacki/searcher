import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import MainNav from "@/components/Navigation/MainNav.vue";

import { useRoute } from "vue-router";
vi.mock("vue-router");

const useRouteMock = useRoute as Mock;

describe("MainNav", () => {
  const renderMainNav = () => {
    useRouteMock.mockReturnValue({ name: "Home" });
    const pinia = createTestingPinia({
      stubActions: false,
    });

    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
        plugins: [pinia],
      },
    });
  };

  it("displays MainNav component", () => {
    renderMainNav();
    screen.debug();
    const appName = screen.getByText("G-Searcher");
    const navItem = screen.getByText("Contact");
    expect(appName).toBeInTheDocument();
    expect(navItem).toBeInTheDocument();
  });

  it("displays menu items in nav", () => {
    renderMainNav();
    const navMenuItems = screen.getAllByRole("listitem");
    const navMenuTexts = navMenuItems.map((item) => item.textContent);
    console.log(navMenuTexts);

    expect(navMenuTexts).toEqual([
      "Teams",
      "Life at company",
      "Shop",
      "Careers",
      "Contact",
    ]);
  });

  describe("when user log in", () => {
    it("displays user profile pic", async () => {
      renderMainNav();

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.queryByRole("button", {
        name: /sign in/i,
      }) as HTMLElement;
      await userEvent.click(loginButton);

      profileImage = screen.getByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
