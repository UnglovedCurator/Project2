import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

const HeroSection = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
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
  
  @media (max-width: 480px) {
    font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  }
`;

const CTAButton = styled.button`
  background: var(--color-accent-1);
  border: none;
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 4vw, 2.5rem);
  border-radius: 4px;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-accent-2);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    width: 90%;
    max-width: 300px;
  }
`;

// Optional: Add a container for better content width control
const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Hero = () => {
  console.log('Hero component rendering'); // Debug log

  return (
    <HeroSection>
      <AnimatedBackground />
      <Container>
        <HeroContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>Next Event: Techno Night</Title>
          <Subtitle>Experience the ultimate rave experience</Subtitle>
          <CTAButton>Get Tickets</CTAButton>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
