import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimatedBackground from './components/AnimatedBackground';
import UpcomingEvents from './components/UpcomingEvents';
import FeaturedArtists from './components/FeaturedArtists';

const AppContainer = styled.div`
  background-color: var(--color-primary);
  min-height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Navbar />
      <Hero>
        <AnimatedBackground /> {/* Add this inside Hero */}
      </Hero>
      <UpcomingEvents />
      <FeaturedArtists />
    </AppContainer>
  );
}

export default App;
