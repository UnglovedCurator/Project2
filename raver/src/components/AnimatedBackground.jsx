import styled from 'styled-components';
import { motion } from 'framer-motion';

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const AnimatedGradient = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    var(--color-accent-1) 0%,
    rgba(0, 0, 0, 0) 50%
  );
  animation: gradientAnimation 20s linear infinite;

  @keyframes gradientAnimation {
    0% {
      transform: scale(0.8) rotate(0deg);
    }
    50% {
      transform: scale(1.2) rotate(180deg);
    }
    100% {
      transform: scale(0.8) rotate(360deg);
    }
  }
`;

const AnimatedBackground = () => {
  return (
    <Background>
      <AnimatedGradient />
    </Background>
  );
};

export default AnimatedBackground;
