import { render, screen } from "@testing-library/vue";

import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays MainNav component", () => {
    render(MainNav);
    screen.debug();
    const appName = screen.getByText("G-Searcher");
    expect(appName).toBeInTheDocument();
  });
});


