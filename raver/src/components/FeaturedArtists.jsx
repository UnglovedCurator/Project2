import styled from 'styled-components';
import { motion } from 'framer-motion';

const ArtistsSection = styled.section`
  padding: 4rem 1rem;
  background: var(--color-secondary);
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
  
  &:hover .artist-info {
    opacity: 1;
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
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
  opacity: 0;
  transition: opacity 0.3s ease;
  class-name: artist-info;
`;

const FeaturedArtists = () => {
  const artists = [
    {
      id: 1,
      name: "DJ Thunder",
      image: "/path-to-image.jpg",
      genre: "Techno",
    },
    // Add more artists
  ];

  return (
    <ArtistsSection>
      <SectionTitle>Featured <span>Artists</span></SectionTitle>
      <ArtistsGrid>
        {artists.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <ArtistImage src={artist.image} alt={artist.name} />
            <ArtistInfo>
              <h3>{artist.name}</h3>
              <p>{artist.genre}</p>
            </ArtistInfo>
          </ArtistCard>
        ))}
      </ArtistsGrid>
    </ArtistsSection>
  );
};

export default FeaturedArtists;
