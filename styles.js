import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }

  .heroCard {
    background-color: #f5f5dc;
    border: 2px solid rgb(9, 9, 8);
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    text-align: center;
  }

  .title {
    font-size: 2rem;
    font-weight: 600;
    color: #4a3f35;
    margin: 0;
  }

  .activityCard {
    position: relative;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 250px; /* Fixed height for the card */
    border: 2px solid #ddd;
    border-radius: 12px;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .cardContent {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1rem;
    color: white;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
    width: 100%;
  }

  .cardTitle {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 600;
  }

  .cardCountry {
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  .cardTags {
    margin-top: 0.5rem;
  }

  .tag {
    display: inline-block;
    background-color: #4a90e2;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    margin-right: 0.5rem;
    font-size: 0.875rem;
  }

  /* Grid Layout for the activities */
  .activityGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
    overflow-y: auto; /* Scrollable on small screens */
  }

  /* Ensure the cards are scrollable on smaller screens */
  @media (max-width: 375px) {
    .activityGrid {
      grid-template-columns: 1fr; /* Single column for smaller screens */
    }
  }
`;
