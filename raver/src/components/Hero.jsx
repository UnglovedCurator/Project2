import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import { useContentful } from '../ContentfulContext'; // Import the hook

const HeroSection = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(
    45deg,
    var(--color-primary),
    var(--color-secondary)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  color: white;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: clamp(2rem, 8vw, 4.5rem);
  margin-bottom: clamp(1rem, 3vw, 2rem);
  color: var(--color-accent-1);
  line-height: 1.2;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    font-size: clamp(1.8rem, 6vw, 2.5rem);
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(to right, var(--color-accent-1), var(--color-accent-2));
  border: none;
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 4vw, 2.5rem);
  border-radius: 4px;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  color: black;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 90%;
    max-width: 300px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Hero = () => {
  const { heroContent } = useContentful();

  return (
    <HeroSection>
      <AnimatedBackground />
      <Container>
        <HeroContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Use Contentful data */}
          <Title>{heroContent?.title}</Title>
          <Subtitle>{heroContent?.subtitle}</Subtitle>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {heroContent?.ctaButtonText}
          </CTAButton>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
