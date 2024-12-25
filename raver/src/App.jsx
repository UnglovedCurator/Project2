import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UpcomingEvents from './components/UpcomingEvents';
import FeaturedArtists from './components/FeaturedArtists';
import Gallery from './components/Gallery';
import About from './components/About';
import Tickets from './components/Tickets';

const AppContainer = styled.div`
  background-color: var(--color-primary);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const Section = styled.section`
  min-height: 50vh; // Reduced from 100vh to decrease vertical spacing
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 2rem 0; // Added padding top and bottom instead of using min-height

  @media (max-width: 1200px) {
    min-height: auto;
    padding: 1.5rem 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Navbar />
      <Section id="hero">
        <ContentWrapper>
          <Hero />
        </ContentWrapper>
      </Section>
      <Section id="events">
        <ContentWrapper>
          <UpcomingEvents />
        </ContentWrapper>
      </Section>
      <Section id="artists">
        <ContentWrapper>
          <FeaturedArtists />
        </ContentWrapper>
      </Section>
      <Section id="gallery">
        <ContentWrapper>
          <Gallery />
        </ContentWrapper>
      </Section>
      <Section id="about">
        <ContentWrapper>
          <About />
        </ContentWrapper>
      </Section>
      <Section id="tickets">
        <ContentWrapper>
          <Tickets />
        </ContentWrapper>
      </Section>
    </AppContainer>
  );
}

export default App;
