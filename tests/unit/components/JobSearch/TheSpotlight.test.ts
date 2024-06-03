import type { Mock } from "vitest";
import axios from "axios";
import TheSpotlight from "@/components/JobSearch/TheSpotlight.vue";
import { render, screen } from "@testing-library/vue";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("TheSpotlight", () => {
  const mockSpotlightResponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Some img",
          title: "Some title",
          description: "Some description",
          ...spotlight,
        },
      ],
    });
  };

  it("Provides img to parent component", async () => {
    const spotlight = { img: "Other img" };
    mockSpotlightResponse(spotlight);

    render(TheSpotlight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.img }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Other img");
    expect(text).toBeInTheDocument();
  });

  it("Provides title to parent component", async () => {
    const spotlight = { title: "Other title" };
    mockSpotlightResponse(spotlight);

    render(TheSpotlight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.title }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Other title");
    expect(text).toBeInTheDocument();
  });

  it("Provides description to parent component", async () => {
    const spotlight = { description: "Other description" };
    mockSpotlightResponse(spotlight);

    render(TheSpotlight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.description }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Other description");
    expect(text).toBeInTheDocument();
  });
});
