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
