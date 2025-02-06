import {
  formatClientDate,
  formatServerDate,
} from "../../../expense/formatDate";

describe("Format Date", () => {
  it("should convert client date string to server Date", () => {
    const date = formatClientDate("06/02/2025");
    expect(date!.toISOString()).toBe("2025-02-05T21:00:00.000Z");
  });

  it("should convert undefined client date to undefined server Date", () => {
    const date = formatClientDate(undefined);
    expect(date).toBeUndefined();
  });

  it("should server Date to client date string", () => {
    const date = formatServerDate(new Date("2025-02-05T21:00:00.000Z"));
    expect(date).toBe("06/02/2025");
  });

  it("should convert undefined server date to undefined client Date", () => {
    const date = formatServerDate(undefined);
    expect(date).toBeUndefined();
  });
});
