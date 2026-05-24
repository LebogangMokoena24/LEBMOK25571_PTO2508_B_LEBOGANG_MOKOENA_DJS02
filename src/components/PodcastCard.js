import { GenreService } from "../utils/GenreService.js";
import { DateUtils } from "../utils/DateUtils.js";

/**
 * HTML template containing markup and encapsulated styles for the card.
 * Defined once and cloned for every instance of <podcast-card>.
 */
const template = document.createElement("template");
template.innerHTML = /* html */ `
  <style>
    .card {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .card:hover {
      transform: scale(1.02);
    }
    .card img {
      width: 100%;
      border-radius: 6px;
      display: block;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
    .card h3 {
      margin: 0.5rem 0 0.25rem;
      font-size: 1rem;
      font-family: "Inter", sans-serif;
    }
    .seasons {
      margin: 0;
      font-size: 0.8rem;
      color: var(--grey-text, #555);
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .seasons::before {
      content: "🗓";
      font-size: 0.75rem;
    }
    .tags {
      margin: 0.5rem 0;
    }
    .tag {
      background: #eee;
      padding: 0.3rem 0.6rem;
      margin-right: 0.4rem;
      margin-top: 0.4rem;
      border-radius: 4px;
      display: inline-block;
      font-size: 0.75rem;
      font-family: "Inter", sans-serif;
    }
    .updated-text {
      font-size: 0.8rem;
      color: var(--grey-text, #555);
      margin: 0.4rem 0 0;
      font-family: "Inter", sans-serif;
    }
  </style>
  <div class="card" role="button" tabindex="0" aria-label="View podcast details">
    <img alt="" />
    <h3></h3>
    <p class="seasons"></p>
    <div class="tags"></div>
    <p class="updated-text"></p>
  </div>
`;

/**
 * PodcastCard - Custom Web Component that renders a single podcast preview card.
 *
 * @element podcast-card
 * @fires podcast-selected - Dispatched on click. event.detail contains the podcast object.
 */
class PodcastCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    /** @type {Object.<string, HTMLElement>} */
    this.elements = {
      card: shadow.querySelector(".card"),
      img: shadow.querySelector("img"),
      title: shadow.querySelector("h3"),
      seasons: shadow.querySelector(".seasons"),
      tags: shadow.querySelector(".tags"),
      updated: shadow.querySelector(".updated-text"),
    };
  }

  /**
   * Stores podcast data and triggers a UI render.
   * @param {Object} podcast - The podcast data object.
   * @param {string} podcast.id
   * @param {string} podcast.title
   * @param {string} podcast.image
   * @param {string} podcast.description
   * @param {number} podcast.seasons
   * @param {number[]} podcast.genres
   * @param {string} podcast.updated
   */
  setPodcast(podcast) {
    this._podcast = podcast;
    this.renderPodcast();
  }

  /**
   * Updates all Shadow DOM elements with the stored podcast data and
   * binds click and keyboard event handlers.
   * @returns {void}
   */
  renderPodcast() {
    if (!this._podcast) return;

    const { image, title, seasons, genres, updated } = this._podcast;
    const genreNames = GenreService.getNames(genres);

    this.elements.img.src = image;
    this.elements.img.alt = `${title} cover`;
    this.elements.title.textContent = title;
    this.elements.seasons.textContent = `${seasons} season${seasons !== 1 ? "s" : ""}`;
    this.elements.tags.innerHTML = genreNames
      .map((g) => `<span class="tag">${g}</span>`)
      .join("");
    this.elements.updated.textContent = DateUtils.format(updated);
    this.elements.card.setAttribute("aria-label", `View details for ${title}`);

    this.elements.card.onclick = () => this._dispatchSelected();
    this.elements.card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this._dispatchSelected();
      }
    };
  }

  /**
   * Dispatches the podcast-selected CustomEvent with podcast data in detail.
   * @private
   */
  _dispatchSelected() {
    this.dispatchEvent(
      new CustomEvent("podcast-selected", {
        detail: this._podcast,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("podcast-card", PodcastCard);
