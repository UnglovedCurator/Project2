import styled from 'styled-components';
import { motion } from 'framer-motion';

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Circle = styled(motion.div)`
  position: absolute;
  background: radial-gradient(circle, 
    ${props => props.color} 0%, 
    rgba(0,0,0,0) 70%);
  border-radius: 50%;
`;

const AnimatedBackground = () => {
  return (
    <Background>
      {[...Array(3)].map((_, i) => (
        <Circle
          key={i}
          color={i === 0 ? 'var(--color-accent-1)' : 'var(--color-accent-2)'}
          style={{
            width: `${300 + i * 100}px`,
            height: `${300 + i * 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </Background>
  );
};

export default AnimatedBackground;
