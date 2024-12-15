import styled from 'styled-components';
import { motion } from 'framer-motion';

const EventsSection = styled.section`
  padding: 4rem 1rem;
  background: linear-gradient(0deg, var(--color-primary) 0%, var(--color-secondary) 100%);
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
  
  &:hover {
    border-color: var(--color-accent-1);
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  
  span {
    color: var(--color-accent-1);
  }
`;

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Techno Night",
      date: "2024-02-20",
      location: "Underground Club",
      description: "A night of pure techno with international DJs",
    },
    // Add more events
  ];

  return (
    <EventsSection>
      <SectionTitle>Upcoming <span>Events</span></SectionTitle>
      <EventsGrid>
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} // Add this line
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
          </EventCard>
        ))}
      </EventsGrid>
    </EventsSection>
  );
};

export default UpcomingEvents;
