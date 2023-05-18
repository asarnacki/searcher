import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Kotlin Coder",
    organization: "VueTube",
    locations: ["Warsaw"],
    minimumQualifications: ["Code"],
    ...jobProps,
  });

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
        },
      },
    });
  };

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "Go Specialist" });
    renderJobListing(jobProps);
    expect(screen.getByText("Go Specialist")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const jobProps = createJobProps({ organization: "Vue and a Half Man" });
    renderJobListing(jobProps);
    expect(screen.getByText("Vue and a Half Man")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJobProps({
      locations: ["Kraków", "Wrocław"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Kraków")).toBeInTheDocument();
    expect(screen.getByText("Wrocław")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: [
        "Incubate one-to-one applications, re-contextualize killer applications, and implement collaborative systems",
        "Incubate collaborative functionalities, aggregate holistic e-tailers, and matrix rich experiences",
      ],
    });
    renderJobListing(jobProps);
    expect(
      screen.getByText(
        "Incubate one-to-one applications, re-contextualize killer applications, and implement collaborative systems"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Incubate collaborative functionalities, aggregate holistic e-tailers, and matrix rich experiences"
      )
    ).toBeInTheDocument();
  });
});
