import { formatServerDate } from "../../../expense/formatDate";

describe("Format Date", () => {
  it("should server Date to client date string", () => {
    const date = formatServerDate(new Date("2025-02-05T21:00:00.000Z"));
    expect(date).toBe("02/05/2025");
  });

  it("should convert undefined server date to undefined client Date", () => {
    const date = formatServerDate(undefined);
    expect(date).toBeUndefined();
  });
});
