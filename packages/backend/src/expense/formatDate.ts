import { format, parse } from "date-fns";

export const formatClientDate = (date: string | undefined) =>
  date
    ? new Date(
        Date.UTC(
          parse(date, "dd/MM/yyyy", new Date()).getFullYear(),
          parse(date, "dd/MM/yyyy", new Date()).getMonth(),
          parse(date, "dd/MM/yyyy", new Date()).getDate(),
        ),
      )
    : undefined;

export const formatServerDate = (date: Date | undefined | null) =>
  !(date instanceof Date) || !date
    ? undefined
    : format(
        new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
          ),
        ),
        "dd/MM/yyyy",
      );
