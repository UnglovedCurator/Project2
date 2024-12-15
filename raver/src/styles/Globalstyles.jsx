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
    font-family: 'Arial', sans-serif;
    background-color: var(--color-primary);
    color: white;
  }
`;

export default GlobalStyles;
