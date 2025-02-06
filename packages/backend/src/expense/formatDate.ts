import { format, parse } from "date-fns";

export const formatClientDate = (date: string | undefined) =>
  date ? parse(date, "dd/MM/yyyy", new Date()) : undefined;

export const formatServerDate = (date: Date | undefined | null) =>
  !(date instanceof Date) || !date ? undefined : format(date, "dd/MM/yyyy");
