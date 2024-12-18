import styled from 'styled-components';
import { motion, useAnimation, useDragControls } from 'framer-motion';
import { useContentful } from '../ContentfulContext';
import { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ArtistsSection = styled.section`
  padding: 4rem 0;
  background: transparent;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: white;
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: 2rem;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;

  span {
    color: var(--color-accent-1);
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem; // Add minimal padding for edge spacing
`;

const ArtistsCarousel = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  cursor: grab;
  user-select: none;
  
  &:active {
    cursor: grabbing;
  }
`;

const ArtistCard = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 0 0 auto;
  width: 300px; // Fixed width instead of percentage
  aspect-ratio: 0.75;
  
  @media (max-width: 640px) {
    width: calc(50% - 0.5rem); // Only use percentage at mobile for 2-card minimum
  }

  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  }
`;


const ArtistImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
`;


const ArtistInfo = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    color: white;
    font-family: 'Rajdhani', sans-serif;
    z-index: 1;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
    font-weight: 600;
  }

  p {
    font-size: 0.9rem;
  }
`;


const SocialLinks = styled.div`
  margin-top: 0.5rem;

  a {
    color: var(--color-accent-1);
    margin-right: 0.5rem;
    font-size: 1.1rem;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-accent-2);
    }
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 2;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.7);
  }

  &.left {
    left: 1rem;
  }

  &.right {
    right: 1rem;
  }
`;

const FeaturedArtists = () => {
    const { artists } = useContentful();
    const carouselRef = useRef(null);
    const controls = useAnimation();
    const dragControls = useDragControls();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [constraintsWidth, setConstraintsWidth] = useState(0);

    useEffect(() => {
        updateConstraints();
        window.addEventListener('resize', updateConstraints);
        return () => window.removeEventListener('resize', updateConstraints);
    }, [artists]);

    const updateConstraints = () => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const containerWidth = container.offsetWidth;
        const totalWidth = container.scrollWidth;
        setConstraintsWidth(totalWidth - containerWidth);
    };

    const getItemsPerView = () => {
        if (window.innerWidth <= 640) return 2;
        return Math.floor((carouselRef.current?.offsetWidth || 0) / 300);
    };

    const handleDragEnd = (event, info) => {
        const velocity = info.velocity.x;
        const offset = info.offset.x;
        const cardWidth = 300;
        
        if (Math.abs(velocity) > 500 || Math.abs(offset) > 50) {
            const direction = velocity < 0 || offset < 0 ? 1 : -1;
            const moveAmount = Math.ceil(Math.abs(offset) / cardWidth);
            const newIndex = Math.min(
                Math.max(0, currentIndex + (direction * moveAmount)),
                artists.length - getItemsPerView()
            );
            
            setCurrentIndex(newIndex);
            const newOffset = -(newIndex * cardWidth);
            controls.start({ 
                x: newOffset,
                transition: { type: "spring", stiffness: 300, damping: 30 }
            });
        } else {
            // Snap back to the current position
            const currentOffset = -(currentIndex * cardWidth);
            controls.start({ 
                x: currentOffset,
                transition: { type: "spring", stiffness: 300, damping: 30 }
            });
        }
    };

    const handleNavigation = (direction) => {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, artists.length - itemsPerView);
        const newIndex = Math.min(Math.max(0, currentIndex + direction), maxIndex);
        
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            const offset = -(newIndex * 300);
            controls.start({ 
                x: offset, 
                transition: { type: "spring", stiffness: 300, damping: 30 } 
            });
        }
    };

    return (
        <ArtistsSection>
            <SectionTitle>
                Featured <span>Artists</span>
            </SectionTitle>
            <CarouselContainer>
                <NavButton
                    className="left"
                    onClick={() => handleNavigation(-1)}
                    disabled={currentIndex === 0}
                >
                    <FaChevronLeft />
                </NavButton>
                <ArtistsCarousel
                    ref={carouselRef}
                    drag="x"
                    dragControls={dragControls}
                    dragConstraints={{ left: -constraintsWidth, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    initial={false}
                >
                    {artists.map((artist, index) => (
                        <ArtistCard
                            key={artist.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ArtistImage src={artist.image} alt={artist.name} />
                            <ArtistInfo>
                                <h3>{artist.name}</h3>
                                <p>{artist.genre}</p>
                                <SocialLinks>
                                    {artist.socialLinks?.map((link) => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.platform}
                                        </a>
                                    ))}
                                </SocialLinks>
                            </ArtistInfo>
                        </ArtistCard>
                    ))}
                </ArtistsCarousel>
                <NavButton
                    className="right"
                    onClick={() => handleNavigation(1)}
                    disabled={currentIndex >= artists.length - getItemsPerView()}
                >
                    <FaChevronRight />
                </NavButton>
            </CarouselContainer>
        </ArtistsSection>
    );
};

export default FeaturedArtists;
