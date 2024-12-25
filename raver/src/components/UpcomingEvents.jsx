import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useContentful } from '../ContentfulContext';

const EventsSection = styled.section`
  width: 100%;
  padding: 2rem 0;
`;

const EventsContainer = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-right: 1rem;
  font-family: 'Rajdhani', sans-serif;

  span {
    color: var(--color-accent-1);
  }
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const EventItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 120px minmax(200px, 300px) auto 120px;
  align-items: center;
  padding: 1.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--color-accent-1);
    transform: translateY(-2px);
  }
`;

const DateInfo = styled.div`
  color: white;
  font-family: 'Rajdhani', sans-serif;
  
  .month {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-accent-1);
    text-transform: uppercase;
  }
  
  .day {
    font-size: 1.4rem;
    font-weight: 600;
  }
  
  .year {
    font-size: 0.9rem;
    opacity: 0.7;
  }
`;

const EventInfo = styled.div`
  color: white;
  font-family: 'Rajdhani', sans-serif;
  text-align: left;
  
  .event-name {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }
`;

const MoreInfoButton = styled.button`
  color: white;
  background: transparent;
  border: none;
  font-size: 0.9rem;
  opacity: 0.7;
  cursor: pointer;
  text-align: right;
  padding-right: 1rem;
  font-family: 'Rajdhani', sans-serif;
  
  &:hover {
    opacity: 1;
    color: var(--color-accent-1);
  }
`;

const formatLocation = (location) => {
  if (!location) return 'Location TBA';
  if (typeof location === 'string') return location;
  if (location.lat && location.lng) {
    return 'Location TBA';
  }
  return 'Location TBA';
};

const UpcomingEvents = () => {
  const { events } = useContentful();

  return (
    <EventsSection>
      <EventsContainer>
        <Header>
          <Title>
            Upcoming <span>Events</span>
          </Title>
        </Header>
        <EventsList>
          {events.map((event, index) => {
            const date = new Date(event.date);
            return (
              <EventItem
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DateInfo>
                  <div className="month">
                    {date.toLocaleString('en-US', { month: 'short' })}
                  </div>
                  <div className="day">
                    {date.getDate()}
                  </div>
                  <div className="year">
                    {date.getFullYear()}
                  </div>
                </DateInfo>
                <EventInfo>
                  <div className="event-name">{event.title}</div>
                </EventInfo>
                <MoreInfoButton>+ MORE INFO</MoreInfoButton>
              </EventItem>
            );
          })}
        </EventsList>
      </EventsContainer>
    </EventsSection>
  );
};

export default UpcomingEvents;
