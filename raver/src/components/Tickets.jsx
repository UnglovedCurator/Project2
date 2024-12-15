import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useContentful } from '../ContentfulContext';

const TicketsSection = styled.section`
  padding: 4rem 1rem;
  background: var(--color-secondary);
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

const TicketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TicketCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 2rem;
  backdrop-filter: blur(5px);
  border: 1px solid var(--color-accent-1);
  color: white;
  font-family: 'Rajdhani', sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 8px rgba(0, 255, 0, 0.3);
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: var(--color-accent-1);
  }

  .price {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    margin-bottom: 1rem;

    li {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;

      &::before {
        content: '✓';
        color: var(--color-accent-1);
        margin-right: 0.5rem;
      }
    }
  }
`;

const BuyButton = styled(motion.a)`
  display: block;
  background: linear-gradient(to right, var(--color-accent-1), var(--color-accent-2));
  color: black;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const Tickets = () => {
  const { ticketTiers } = useContentful();

  return (
    <TicketsSection>
      <SectionTitle>
        Get Your <span>Tickets</span>
      </SectionTitle>
      <TicketsGrid>
        {ticketTiers.map((tier, index) => (
          <TicketCard
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <h3>{tier.name}</h3>
            <p className="price">{tier.price}</p>
            <ul>
              {tier.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <BuyButton
              href={tier.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Now
            </BuyButton>
          </TicketCard>
        ))}
      </TicketsGrid>
    </TicketsSection>
  );
};

export default Tickets;
