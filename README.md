# LEBMOK25571_PTO2508_B_LEBOGANG_MOKOENA_DJS02

**DJS02 – Web Component Podcast Preview**

A modular Vanilla JavaScript app that displays podcast cards using a custom <podcast-card> Web Component. Built with Shadow DOM, custom elements, and event-driven architecture — no frameworks used.

**How to Run the Project**

Clone or download the repository
Open the project folder in VS Code
Right-click index.html and select Open with Live Server
The app will open in your browser at http://localhost:5500


You must use a local server because the project uses ES Modules. Opening index.html directly via file:// will not work.

**Project Structure**

index.html                  # App shell, modal markup
 
 styles.css                  # Global styles and responsive layout
 
 README.md
     
     src/
    
    ├── index.js                # App entry point, filters, event binding
    
    ├── data.js                 # Podcast, genre, and season data
    
    ├── components/
    
    │   ├── PodcastCard.js      # <podcast-card> Web Component
    
    │   └── createModal.js      # Modal open/close controller
    
    ├── utils/
    
    │   ├── DateUtils.js        # Formats ISO dates to readable strings
    
    │   └── GenreService.js     # Maps genre IDs to genre names
    
    └── views/
        
        └── createGrid.js       # Renders podcast cards into the grid

**How to Register the Web Component**

The <podcast-card> element is registered in PodcastCard.js using the native Web Component API:
jscustomElements.define("podcast-card", PodcastCard);
Import the file before creating any card elements:
jsimport "../components/PodcastCard.js";
Once imported, <podcast-card> works like any standard HTML element.

**How to Pass Data to the Component**

Data is passed using the setPodcast() method. The component is stateless — it relies entirely on the parent to provide its data.
jsconst card = document.createElement("podcast-card");

card.setPodcast({
  id: "10716",
  title: "Something Was Wrong",
  image: "https://example.com/cover.jpg",
  description: "A true-crime docuseries...",
  seasons: 14,
  genres: [1, 2],
  updated: "2022-11-03T07:00:00.000Z"
});

document.getElementById("podcastGrid").appendChild(card);

**How to Listen for Interaction Events**

When a user clicks a card, it fires a podcast-selected CustomEvent that bubbles up through the DOM. The parent can listen for it without knowing anything about the component's internal structure.
jscard.addEventListener("podcast-selected", (e) => {
  console.log(e.detail.title); // Full podcast object is in e.detail
});
You can also listen at the grid container level since the event bubbles:
jsdocument.getElementById("podcastGrid").addEventListener("podcast-selected", (e) => {
  createModal.open(e.detail);
});

**Features**

Responsive podcast grid using CSS Grid
Filter podcasts by genre
Sort by Recently Updated, Most Popular, or Newest
Click any card to open a detailed modal with description, genres, and full seasons list
Close the modal by clicking the X button, clicking outside it, or pressing Escape
Keyboard accessible — cards activate with Enter or Space

**Design Principles Followed**

SRP — Every file does one job only
OCP — New fields can be added to the modal or card without changing how other modules use them
Encapsulation — Shadow DOM keeps the card's styles and markup self-contained
Event-Driven — Components talk to each other through custom events, not direct function calls
