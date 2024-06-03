import "@testing-library/jest-dom/";
import { cleanup } from "@testing-library/vue";
import { afterEach } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
