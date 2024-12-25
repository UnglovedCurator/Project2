import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useContentful } from '../ContentfulContext';
import { useState, useEffect } from 'react';
import LogoImage from '../assets/reseb.jpg'; // Update with your logo path
import EventModal from "./EventModal";

const HeroSection = styled.section`
  height: 70vh;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2rem;
  
  @media (max-width: 768px) {
    height: auto;
    padding: 4rem 1rem;
  }
`;

const HappeningNow = styled.div`
  color: var(--color-accent-1);
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Rajdhani', sans-serif;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  img {
    max-width: 300px;
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
    object-fit: contain;
  }
`;

const Tagline = styled.p`
  color: white;
  font-size: 1.2rem;
  font-family: 'Rajdhani', sans-serif;
  opacity: 0.9;
`;

const EventSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const CountdownWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const CountdownItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-accent-1);
    font-family: 'Rajdhani', sans-serif;
  }
  
  .label {
    font-size: 0.9rem;
    color: white;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const EventTitle = styled.h2`
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Rajdhani', sans-serif;
`;

const EventDate = styled.div`
  color: white;
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled(motion.button)`
  background: var(--color-accent-1);
  color: black;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  align-self: center;
  
  &:hover {
    background: var(--color-accent-2);
  }
`;

const calculateTimeLeft = (eventDate) => {
  const difference = new Date(eventDate) - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};

const Hero = () => {
  const { events } = useContentful();
  const [currentOrNextEvent, setCurrentOrNextEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [eventStatus, setEventStatus] = useState('upcoming'); // 'upcoming' or 'happening'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEventStatus = (eventDate) => {
    const now = new Date();
    const eventStart = new Date(eventDate);
    const eventEnd = new Date(eventDate);
    eventEnd.setHours(7, 0, 0, 0); // 7 AM the next day
    eventEnd.setDate(eventEnd.getDate() + 1);

    if (now >= eventStart && now < eventEnd) {
      return 'happening';
    }
    return 'upcoming';
  };

  useEffect(() => {
    if (events && events.length > 0) {
      const now = new Date();
      const tomorrow7AM = new Date();
      tomorrow7AM.setDate(tomorrow7AM.getDate() + 1);
      tomorrow7AM.setHours(7, 0, 0, 0);

      // Sort all events by date
      const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      // Find the current or next event
      const currentOrNext = sortedEvents.find(event => {
        const eventDate = new Date(event.date);
        const eventEndDate = new Date(event.date);
        eventEndDate.setDate(eventEndDate.getDate() + 1);
        eventEndDate.setHours(7, 0, 0, 0);
        
        return eventEndDate > now; // Event hasn't ended yet
      });

      if (currentOrNext) {
        setCurrentOrNextEvent(currentOrNext);
        setEventStatus(getEventStatus(currentOrNext.date));
      }
    }
  }, [events]);

  useEffect(() => {
    if (currentOrNextEvent && eventStatus === 'upcoming') {
      const timer = setInterval(() => {
        const status = getEventStatus(currentOrNextEvent.date);
        if (status !== eventStatus) {
          setEventStatus(status);
        }
        setTimeLeft(calculateTimeLeft(currentOrNextEvent.date));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentOrNextEvent, eventStatus]);

  return (
    <>
      <HeroSection>
        <Container>
          <LogoSection>
            <motion.img 
              src={LogoImage} 
              alt="Logo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Tagline>Your tagline here</Tagline>
            </motion.div>
          </LogoSection>

          <EventSection
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentOrNextEvent ? (
              <>
                {eventStatus === 'upcoming' ? (
                  <CountdownWrapper>
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <CountdownItem key={unit}>
                        <div className="number">{value || 0}</div>
                        <div className="label">{unit}</div>
                      </CountdownItem>
                    ))}
                  </CountdownWrapper>
                ) : (
                  <HappeningNow>
                    HAPPENING NOW
                  </HappeningNow>
                )}

                <EventTitle>{currentOrNextEvent.title}</EventTitle>
                <EventDate>
                  {new Date(currentOrNextEvent.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </EventDate>

                <CTAButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                >
                  {eventStatus === 'upcoming' ? 'Get Tickets' : 'Event Info'}
                </CTAButton>
              </>
            ) : (
              <EventTitle>No upcoming events</EventTitle>
            )}
          </EventSection>
        </Container>
      </HeroSection>

      <EventModal
        event={currentOrNextEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Hero;
