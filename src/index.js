import { podcasts, genres } from "./data.js";
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";

/**
 * Initializes the PodcastApp.
 *
 * @principle SRP - Only handles startup logic: event binding and
 *   initial rendering. All other logic is delegated to modules.
 * @returns {void}
 */
function init() {
  const grid = createGrid();

  // Populate genre filter from dataset
  const genreFilter = document.getElementById("genreFilter");
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.title;
    genreFilter.appendChild(option);
  });

  // Close modal via button
  document.getElementById("closeModal").addEventListener("click", createModal.close);

  // Close modal by clicking the overlay
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) createModal.close();
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") createModal.close();
  });

  /**
   * Filters and sorts podcasts based on current dropdown values,
   * then re-renders the grid.
   * @returns {void}
   */
  function applyFilters() {
    const selectedGenre = genreFilter.value;
    const selectedSort = document.getElementById("sortFilter").value;

    let filtered =
      selectedGenre === "all"
        ? [...podcasts]
        : podcasts.filter((p) => p.genres.includes(Number(selectedGenre)));

    if (selectedSort === "recent") {
      filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (selectedSort === "newest") {
      filtered.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (selectedSort === "popular") {
      filtered.sort((a, b) => b.seasons - a.seasons);
    }

    grid.render(filtered);
  }

  genreFilter.addEventListener("change", applyFilters);
  document.getElementById("sortFilter").addEventListener("change", applyFilters);

  applyFilters();
}

init();
