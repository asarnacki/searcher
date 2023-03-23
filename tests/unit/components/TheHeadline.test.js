import { render, screen } from "@testing-library/vue";
import TheHeadline from "@/components/TheHeadline.vue";
import { vi } from "vitest";
import { nextTick } from "vue";

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays action verb", () => {
    render(TheHeadline);

    const actionPharse = screen.getByRole("heading", {
      name: /build for everyone/i,
    });
    expect(actionPharse).toBeInTheDocument();
  });

  it("changes actions verb at interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);
    render(TheHeadline);

    expect(mock).toHaveBeenCalled();
  });

  it("change action verb", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();

    await nextTick();

    const actionPharse = screen.getByRole("heading", {
      name: /create for everyone/i,
    });

    expect(actionPharse).toBeInTheDocument();
  });

  it("removes interval when component disappear", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);

    const { unmount } = render(TheHeadline);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
