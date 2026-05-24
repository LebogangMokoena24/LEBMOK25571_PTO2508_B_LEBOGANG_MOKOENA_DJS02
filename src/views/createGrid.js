import "../components/PodcastCard.js";
import { createModal } from "../components/createModal.js";

/**
 * Grid Renderer - Renders podcast cards into the grid container.
 *
 * @principle SRP - Manages layout and rendering only; delegates card
 *   creation to PodcastCard and modal logic to createModal.
 *
 * @returns {{ render: Function }}
 */
export const createGrid = () => {
  const container = document.getElementById("podcastGrid");

  return {
    /**
     * Clears the grid and renders a <podcast-card> for each podcast.
     * @param {Object[]} podcastList - Array of podcast data objects.
     * @returns {void}
     */
    render(podcastList) {
      container.innerHTML = "";

      podcastList.forEach((podcast) => {
        const card = document.createElement("podcast-card");
        card.setPodcast(podcast);

        card.addEventListener("podcast-selected", (e) => {
          createModal.open(e.detail);
        });

        container.appendChild(card);
      });
    },
  };
};
