/**
 * Date Formatter - Utility module for formatting date strings.
 *
 * @principle SRP - This module only formats dates and does nothing else.
 */
export const DateUtils = {
  /**
   * Formats an ISO date string into a human-readable format.
   * @param {string} dateStr - ISO 8601 date string.
   * @returns {string} Formatted date string (e.g. "Updated November 3, 2022").
   */
  format(dateStr) {
    const date = new Date(dateStr);
    return `Updated ${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  },
};
