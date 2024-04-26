/**
 * Converts a date range to a friendly format that removes duplicate information
 *
 * @param startDate - Start of the date range
 * @param endDate - End of the date range
 * @param monthFormat - Whether to use a long or short month format
 * @returns Friendly string representing the date range
 */
const dateRangeString = (
  startDate: Date,
  endDate: Date,
  monthFormat: "long" | "short",
) => {
  const startOpts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: monthFormat,
    day: "numeric",
  };
  const endOpts = {
    ...startOpts,
  };

  if (startDate.getFullYear() === endDate.getFullYear()) {
    startOpts.year = undefined;

    if (startDate.getMonth() === endDate.getMonth()) {
      startOpts.month = undefined;

      if (startDate.getDate() === endDate.getDate()) {
        return startDate.toLocaleString("en-GB", endOpts);
      }
    }
  }

  return `${startDate.toLocaleString("en-GB", startOpts)} – ${endDate.toLocaleString("en-GB", endOpts)}`;
};

export default dateRangeString;
