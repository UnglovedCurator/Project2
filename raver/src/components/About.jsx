import styled from 'styled-components';
import { useContentful } from '../ContentfulContext';

const AboutSection = styled.section`
  padding: 4rem 1rem;
  background: var(--color-primary);
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

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  line-height: 1.6;

  p {
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;

const TeamMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamMemberCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    font-size: 0.9rem;
  }
`;

const About = () => {
  const { aboutContent } = useContentful();

  return (
    <AboutSection>
      {/* ... */}

      {aboutContent?.teamMembers && (
        <>
          <h3>Meet the Team</h3>
          <TeamMembers>
            {aboutContent.teamMembers.map((member) => (
              <TeamMemberCard key={member.name}> {/* Assuming 'name' is unique */}
                <img src={member.photo} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </TeamMemberCard>
            ))}
          </TeamMembers>
        </>
      )}
    </AboutSection>
  );
};

export default About;
