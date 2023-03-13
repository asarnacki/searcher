import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays MainNav component", () => {
    render(MainNav);
    screen.debug();
    const appName = screen.getByText("G-Searcher");
    const navItem = screen.getByText("Contact");
    expect(appName).toBeInTheDocument();
    expect(navItem).toBeInTheDocument();
  });

  it("displays menu items in nav", () => {
    render(MainNav);
    const navMenuItems = screen.getAllByRole("listitem");
    const navMenuTexts = navMenuItems.map((item) => item.textContent);
    console.log(navMenuTexts);

    expect(navMenuTexts).toEqual([
      "Home",
      "Life at company",
      "Shop",
      "Careers",
      "Contact",
    ]);
  });

  describe("when user log in", () => {
    it("displays user profile pic", async () => {
      render(MainNav);

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.queryByRole("button", {
        name: /sign in/i,
      });
      await userEvent.click(loginButton);

      profileImage = screen.getByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
