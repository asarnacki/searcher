import "@testing-library/jest-dom/";
import { cleanup } from "@testing-library/vue";
import { afterEach } from "vitest";

// expect.extend(matchers);

afterEach(() => {
  cleanup();
});
