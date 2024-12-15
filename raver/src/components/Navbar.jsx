import styled from 'styled-components';

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
  gap: 2rem;
`;

const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
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
  
  &:hover {
    background: var(--color-accent-2);
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavItems>
        <Logo>RAVE</Logo>
        <MenuItems>
          <MenuItem>Events</MenuItem>
          <MenuItem>Artists</MenuItem>
          <MenuItem>Gallery</MenuItem>
          <MenuItem>About</MenuItem>
          <TicketButton>Tickets</TicketButton>
        </MenuItems>
      </NavItems>
    </Nav>
  );
};

export default Navbar;
