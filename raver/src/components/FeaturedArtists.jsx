import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useContentful } from '../ContentfulContext'; // Import the hook

const ArtistsSection = styled.section`
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

const ArtistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ArtistCard = styled(motion.div)`
  position: relative;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.5);
  }

  &:hover .artist-info {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ArtistImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArtistInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0;
  transform: translateY(20%);
  transition: opacity 0.3s ease, transform 0.3s ease;
  color: white;
  font-family: 'Rajdhani', sans-serif;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
  }
`;

const SocialLinks = styled.div`
  margin-top: 0.5rem;

  a {
    color: var(--color-accent-1);
    margin-right: 0.5rem;
    font-size: 1.2rem;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-accent-2);
    }
  }
`;

const FeaturedArtists = () => {
  const { artists } = useContentful();

  return (
    <ArtistsSection>
      <SectionTitle>
        Featured <span>Artists</span>
      </SectionTitle>
      <ArtistsGrid>
        {artists.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ArtistImage src={artist.image} alt={artist.name} />
            <ArtistInfo className="artist-info">
              <h3>{artist.name}</h3>
              <p>{artist.genre}</p>
              {/* Add social links if available */}
              <SocialLinks>
                {artist.socialLinks?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Use an icon library or display the platform name */}
                    {link.platform}
                  </a>
                ))}
              </SocialLinks>
            </ArtistInfo>
          </ArtistCard>
        ))}
      </ArtistsGrid>
    </ArtistsSection>
  );
};

export default FeaturedArtists;
