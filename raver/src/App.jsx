import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UpcomingEvents from './components/UpcomingEvents';
import FeaturedArtists from './components/FeaturedArtists';
import Gallery from './components/Gallery'; // Import the Gallery component
import About from './components/About';
import Tickets from './components/Tickets';

const AppContainer = styled.div`
  background-color: var(--color-primary);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1rem, 5vw, 3rem);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    min-height: auto;
    padding: 6rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
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
