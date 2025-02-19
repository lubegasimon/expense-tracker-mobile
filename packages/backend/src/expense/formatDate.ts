import { format, parse } from "date-fns";

export const formatClientDate = (date: string) => {
  return new Date(
    Date.UTC(
      parse(date, "MM/dd/yyyy", new Date()).getFullYear(),
      parse(date, "MM/dd/yyyy", new Date()).getMonth(),
      parse(date, "MM/dd/yyyy", new Date()).getDate(),
    ),
  );
};

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
