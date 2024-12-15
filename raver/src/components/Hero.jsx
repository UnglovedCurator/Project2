import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.div`
  height: 100vh;
  background: linear-gradient(45deg, #000033, #000066);
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

const Hero = () => {
  return (
    <HeroSection>
      <AnimatedBackground />
      <HeroContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Next Event: Techno Night</h1>
        <p>Date: XX.XX.XXXX</p>
        <button>Get Tickets</button>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

