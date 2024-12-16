import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useContentful } from '../ContentfulContext'; // Import the hook

const GallerySection = styled.section`
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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  aspect-ratio: 1;
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const Gallery = () => {
  const { galleryImages } = useContentful();
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <GallerySection>
      <SectionTitle>
        Photo <span>Gallery</span>
      </SectionTitle>
      <GalleryGrid>
        {galleryImages.map((image, index) => (
          <GalleryImage
            key={index} // Use index as key
            src={image}
            alt={`Gallery Image ${index + 1}`}
            onClick={() => openLightbox(image)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          />
        ))}
      </GalleryGrid>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <LightboxImage src={selectedImage} alt="Selected Image" />
          <CloseButton onClick={closeLightbox}>×</CloseButton>
        </Lightbox>
      )}
    </GallerySection>
  );
};

export default Gallery;
