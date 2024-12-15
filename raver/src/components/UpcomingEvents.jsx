import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useContentful } from '../ContentfulContext'; // Import the hook

const EventsSection = styled.section`
  padding: 4rem 1rem;
  background: linear-gradient(
    0deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const EventCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  color: white;
  font-family: 'Rajdhani', sans-serif;

  &:hover {
    border-color: var(--color-accent-1);
    transform: translateY(-5px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 0.3rem;
  }

  .description {
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;

  span {
    color: var(--color-accent-1);
  }
`;

const ReadMoreButton = styled(motion.button)`
  background: transparent;
  border: 2px solid var(--color-accent-1);
  color: var(--color-accent-1);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  font-family: 'Rajdhani', sans-serif;

  &:hover {
    background: var(--color-accent-1);
    color: black;
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const UpcomingEvents = () => {
  const { events } = useContentful(); // Get events from Contentful

  return (
    <EventsSection>
      <SectionTitle>
        Upcoming <span>Events</span>
      </SectionTitle>
      <EventsGrid>
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Add an image if available in your Contentful model */}
            {event.image && (
              <EventImage src={event.image} alt={event.title} />
            )}
            <h3>{event.title}</h3>
            <p>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <p>{event.location}</p>
            <p className="description">{event.description}</p>
            {/* Add a "Read More" button or link to a dedicated event page */}
            <ReadMoreButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
            </ReadMoreButton>
          </EventCard>
        ))}
      </EventsGrid>
    </EventsSection>
  );
};

export default UpcomingEvents;
