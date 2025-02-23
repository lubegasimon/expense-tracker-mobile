import { format } from "date-fns";

/**
 * The `formatServerDate` function takes a `Date` object (or`undefined`)
 * and returns a formatted string in `MM/dd/yyyy` format if a valid
 * date is provided. If the input is not a `Date` object or is `undefined`,
 * it returns `undefined`.
 *
 * **Note**: We don't expect input `date` to be `undefined` since
 * `createdAt` is automatically generated on expense creation.
 * @param date
 * @returns `string | undefined`
 */
export const formatServerDate = (date: Date | undefined) =>
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

/**
 * The `formatClientDate` function takes a `Date` object and returns an
 * array containing two `Date` objects representing the start and end
 * of the given date in `UTC` time.
 * @param date
 * @returns `Date[]`
 */
export const formatClientDate = (date: Date) => {
  /**
   * `toUTC` helper function;
   * - creates a new Date object in UTC by using Date.UTC, ensuring the
   * time is properly set without relying on local timezone.
   * - Accepts hours, minutes, seconds, and milliseconds to specify
   * the exact time of day.
   *
   * @param hh hours
   * @param mm minutes
   * @param ss seconds
   * @param ms milliseconds
   * @returns Date
   */
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
