import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { FaCalendarAlt, FaUsers, FaImages, FaInfoCircle, FaTicketAlt } from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 15, 0.9);
  backdrop-filter: blur(5px);
  padding: 1rem;
  z-index: 1000;
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
  font-size: 1.5rem;
  font-weight: bold;
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent-1);
  }

  &.active {
    color: var(--color-accent-1);
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

  &:hover {
    background: var(--color-accent-2);
  }
`;

const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: var(--color-accent-1);
  transition: all 0.3s ease;
`;

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
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

        if (scrollPosition >= heroTop && scrollPosition < eventsTop) {
          setActiveSection('hero');
        } else if (scrollPosition >= eventsTop && scrollPosition < artistsTop) {
          setActiveSection('events');
        } else if (scrollPosition >= artistsTop && scrollPosition < galleryTop) {
          setActiveSection('artists');
        } else if (scrollPosition >= galleryTop && scrollPosition < aboutTop) {
          setActiveSection('gallery');
        } else if (scrollPosition >= aboutTop && scrollPosition < ticketsTop) {
          setActiveSection('about');
        } else if (scrollPosition >= ticketsTop) {
          setActiveSection('tickets');
        } else {
          setActiveSection('hero');
        }
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const activeItem = document.querySelector(`.menu-item.active`);
    if (activeItem && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeItem.offsetWidth}px`;
      indicatorRef.current.style.left = `${activeItem.offsetLeft}px`;
    }
  }, [activeSection]);

  const handleClick = (section) => {
    setActiveSection(section);
    const sectionElement = document.getElementById(section);
    const navbarHeight = document.querySelector('nav').offsetHeight;
    const offsetTop = sectionElement.offsetTop - navbarHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <Nav>
      <NavItems>
        <Logo>RAVE</Logo>
        <MenuItems>
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
