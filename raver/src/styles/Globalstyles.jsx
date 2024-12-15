import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #000033;
    --color-secondary: #000000;
    --color-accent-1: #00ff00;
    --color-accent-2: #00ffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Rajdhani', sans-serif;
    background-color: var(--color-primary);
    color: white;
  }

  /* Add fonts for headings and navbar */
  @import url('https://fonts.googleapis.com/css2?family=Monoton&family=Rajdhani:wght@400;500;600;700&display=swap');
`;

export default GlobalStyles;
