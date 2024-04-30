import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locates elemtn in list and return next element", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementInList(list, value);
    expect(result).toBe("D");
  });

  describe("when element is at the end of the list", () => {
    it("locates elemtn in list and return next element", () => {
      const list = ["A", "B", "C", "D", "E"];
      const value = "E";
      const result = nextElementInList(list, value);
      expect(result).toBe("A");
    });
  });
});
