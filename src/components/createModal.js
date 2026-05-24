import { GenreService } from "../utils/GenreService.js";
import { DateUtils } from "../utils/DateUtils.js";
import { seasons } from "../data.js";

/**
 * Modal Controller - Controls the podcast details modal overlay.
 *
 * @principle SRP - Handles modal logic only (open, close, populate content).
 * @principle OCP - New fields can be added to updateContent without changing
 *   how external callers use open/close.
 */
export const createModal = (() => {
  const el = (id) => document.getElementById(id);
  const modal = el("modal");

  /**
   * Populates all modal fields with the selected podcast's data.
   * @param {Object} podcast - The podcast data object.
   * @returns {void}
   */
  function updateContent(podcast) {
    el("modalImage").src = podcast.image;
    el("modalImage").alt = `${podcast.title} cover`;
    el("modalTitle").textContent = podcast.title;
    el("modalDesc").textContent = podcast.description;

    el("modalGenres").innerHTML = GenreService.getNames(podcast.genres)
      .map((g) => `<span class="tag">${g}</span>`)
      .join("");

    el("modalUpdated").innerHTML = `📅 Last updated: ${new Date(
      podcast.updated
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;

    const seasonData =
      seasons.find((s) => s.id === podcast.id)?.seasonDetails || [];

    el("seasonList").innerHTML = seasonData
      .map(
        (s, index) => `
        <li class="season-item">
          <div>
            <strong class="season-title">Season ${index + 1}: ${s.title}</strong>
          </div>
          <span class="episodes">${s.episodes} episodes</span>
        </li>`
      )
      .join("");
  }

  return {
    /**
     * Opens the modal and populates it with the provided podcast's details.
     * @param {Object} podcast - The podcast data object to display.
     * @returns {void}
     */
    open(podcast) {
      updateContent(podcast);
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    },

    /**
     * Closes the modal and restores background scrolling.
     * @returns {void}
     */
    close() {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    },
  };
})();
