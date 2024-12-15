import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UpcomingEvents from './components/UpcomingEvents';
import FeaturedArtists from './components/FeaturedArtists';

const AppContainer = styled.div`
  background-color: var(--color-primary);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden; // Prevent horizontal scrolling
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
  max-width: 1440px; // Maximum width for very large screens
  margin: 0 auto; // Center content horizontally

  // Responsive breakpoints
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

const PlaceholderSection = styled(Section)`
  background-color: ${({ bgColor }) => bgColor || 'var(--color-secondary)'};
  color: white;
  font-size: clamp(1.5rem, 3vw, 2rem);
  text-align: center;

  // Add responsive styles for placeholder sections
  @media (max-width: 768px) {
    min-height: 50vh;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px; // Maximum content width
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
      <PlaceholderSection id="gallery" bgColor="var(--color-secondary)">
        <ContentWrapper>
          Gallery (Coming Soon)
        </ContentWrapper>
      </PlaceholderSection>
      <PlaceholderSection id="about" bgColor="var(--color-primary)">
        <ContentWrapper>
          About (Coming Soon)
        </ContentWrapper>
      </PlaceholderSection>
      <PlaceholderSection id="tickets" bgColor="var(--color-secondary)">
        <ContentWrapper>
          Tickets (Coming Soon)
        </ContentWrapper>
      </PlaceholderSection>
    </AppContainer>
  );
}

export default App;
