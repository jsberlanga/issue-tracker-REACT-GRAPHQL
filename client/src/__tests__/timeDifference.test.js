import { timeDifferenceForDate } from "../utils";

describe("timeDifference Function", () => {
  it("returns now date", () => {
    expect(timeDifferenceForDate(Date.now())).toEqual("just now");
    expect(timeDifferenceForDate(Date.now() - 60 * 1000)).toEqual("1 min ago");
    expect(
      timeDifferenceForDate(Date.now() - 60 * 1000 * 60 * 24 * 30)
    ).toEqual("1 mo ago");
  });
});
