import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.div`
  height: 100vh;
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  color: white;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: var(--color-accent-1);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const CTAButton = styled.button`
  background: var(--color-accent-1);
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    background: var(--color-accent-2);
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Next Event: Techno Night</Title>
        <Subtitle>Experience the ultimate rave experience</Subtitle>
        <CTAButton>Get Tickets</CTAButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
