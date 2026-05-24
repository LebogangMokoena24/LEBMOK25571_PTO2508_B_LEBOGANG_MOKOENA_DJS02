import { genres } from "../data.js";

/**
 * Genre Service - Maps genre IDs to human-readable genre names.
 *
 * @principle SRP - Only responsible for resolving genre IDs to titles.
 */
export const GenreService = {
  /**
   * Resolves an array of genre IDs into an array of genre title strings.
   * @param {number[]} genreIds - Array of genre IDs.
   * @returns {string[]} Array of genre titles.
   */
  getNames(genreIds) {
    return genreIds.map(
      (id) => genres.find((g) => g.id === id)?.title || "Unknown"
    );
  },
};
