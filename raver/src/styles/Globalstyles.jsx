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

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'Arial', sans-serif;
    background-color: var(--color-primary);
    color: white;
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  button {
    font-family: inherit;
  }

  /* Add some basic animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Add smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
`;

export default GlobalStyles;
