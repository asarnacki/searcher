import { render, screen } from "@testing-library/vue";

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


});
