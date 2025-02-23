import { format } from "date-fns";

export const formatServerDate = (date: Date | undefined) =>
  /* But we don't expect Date to be undefined since createdAt is
automatically created on expense creation */
  !(date instanceof Date) || date === undefined
    ? undefined
    : format(
        new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
          ),
        ),
        "MM/dd/yyyy",
      );

export const formatClientDate = (date: Date) => {
  const toUTC = (hh: number, mm: number, ss: number, ms: number) =>
    new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        hh,
        mm,
        ss,
        ms,
      ),
    );

  return [toUTC(0, 0, 0, 0), toUTC(23, 59, 59, 999)];
};
