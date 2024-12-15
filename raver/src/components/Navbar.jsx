import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import {
  FaCalendarAlt,
  FaUsers,
  FaImages,
  FaInfoCircle,
  FaTicketAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: transparent;
  backdrop-filter: blur(5px);
  padding: 1rem;
  z-index: 1000;
  transition: background 0.3s ease;

  &.scrolled {
    background: rgba(0, 0, 15, 0.9);
  }
`;

const NavItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  color: var(--color-accent-1);
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Monoton', cursive;
  cursor: pointer;
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 15, 0.9);
    padding: 1rem;
  }
`;

const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;

  &:hover {
    color: var(--color-accent-1);
  }

  &.active {
    color: var(--color-accent-1);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }
`;

const TicketButton = styled.button`
  background: var(--color-accent-1);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;

  &:hover {
    background: var(--color-accent-2);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: var(--color-accent-1);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const indicatorRef = useRef(null);
  const heroRef = useRef(null);
  const eventsRef = useRef(null);
  const artistsRef = useRef(null);
  const galleryRef = useRef(null);
  const aboutRef = useRef(null);
  const ticketsRef = useRef(null);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const heroTop = heroRef.current?.offsetTop || 0;
        const eventsTop = eventsRef.current?.offsetTop;
        const artistsTop = artistsRef.current?.offsetTop;
        const galleryTop = galleryRef.current?.offsetTop;
        const aboutTop = aboutRef.current?.offsetTop;
        const ticketsTop = ticketsRef.current?.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight / 4;

        let newActiveSection = 'hero';

        if (scrollPosition >= eventsTop && scrollPosition < artistsTop) {
          newActiveSection = 'events';
        } else if (scrollPosition >= artistsTop && scrollPosition < galleryTop) {
          newActiveSection = 'artists';
        } else if (scrollPosition >= galleryTop && scrollPosition < aboutTop) {
          newActiveSection = 'gallery';
        } else if (scrollPosition >= aboutTop && scrollPosition < ticketsTop) {
          newActiveSection = 'about';
        } else if (scrollPosition >= ticketsTop) {
          newActiveSection = 'tickets';
        }

        if (newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);
        }
      }, 50);

      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  useEffect(() => {
    const activeItem = document.querySelector(`.menu-item.active`);
    if (activeItem && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeItem.offsetWidth}px`;
      indicatorRef.current.style.left = `${activeItem.offsetLeft}px`;
    }
  }, [activeSection]);

  const handleClick = (section) => {
    setActiveSection(section);
    setIsOpen(false);
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      const navbarHeight = document.querySelector('nav').offsetHeight;
      const offsetTop = sectionElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav className={isScrolled ? 'scrolled' : ''}>
      <NavItems>
        <Logo onClick={() => handleClick('hero')}>RAVE</Logo>
        <HamburgerIcon onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </HamburgerIcon>
        <MenuItems isOpen={isOpen}>
          <MenuItem
            className={`menu-item ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => handleClick('hero')}
            ref={heroRef}
          >
            Home
          </MenuItem>
          <MenuItem
            className={`menu-item ${activeSection === 'events' ? 'active' : ''}`}
            onClick={() => handleClick('events')}
            ref={eventsRef}
          >
            <FaCalendarAlt />
            Events
          </MenuItem>
          <MenuItem
            className={`menu-item ${activeSection === 'artists' ? 'active' : ''}`}
            onClick={() => handleClick('artists')}
            ref={artistsRef}
          >
            <FaUsers />
            Artists
          </MenuItem>
          <MenuItem
            className={`menu-item ${activeSection === 'gallery' ? 'active' : ''}`}
            onClick={() => handleClick('gallery')}
            ref={galleryRef}
          >
            <FaImages />
            Gallery
          </MenuItem>
          <MenuItem
            className={`menu-item ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleClick('about')}
            ref={aboutRef}
          >
            <FaInfoCircle />
            About
          </MenuItem>
          <TicketButton onClick={() => handleClick('tickets')} ref={ticketsRef}>
            <FaTicketAlt />
            Tickets
          </TicketButton>
          <Indicator ref={indicatorRef} />
        </MenuItems>
      </NavItems>
    </Nav>
  );
};

export default Navbar;
