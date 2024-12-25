import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
  background: var(--color-primary);
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const EventTitle = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'Rajdhani', sans-serif;
`;

const EventDetails = styled.div`
  color: white;
  font-family: 'Rajdhani', sans-serif;

  h3 {
    color: var(--color-accent-1);
    margin: 1.5rem 0 0.5rem 0;
  }

  p {
    margin: 0.5rem 0;
    line-height: 1.6;
  }
`;

const EventModal = ({ event, isOpen, onClose }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <EventTitle>{event.title}</EventTitle>
            <EventDetails>
              <h3>Date & Time</h3>
              <p>
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {event.time && ` at ${event.time}`}
              </p>

              {event.description && (
                <>
                  <h3>About the Event</h3>
                  <p>{event.description}</p>
                </>
              )}

              {event.lineup && (
                <>
                  <h3>Lineup</h3>
                  <p>{event.lineup}</p>
                </>
              )}

              {event.ticketInfo && (
                <>
                  <h3>Ticket Information</h3>
                  <p>{event.ticketInfo}</p>
                </>
              )}

              {event.venue && (
                <>
                  <h3>Venue</h3>
                  <p>{event.venue}</p>
                </>
              )}
            </EventDetails>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
