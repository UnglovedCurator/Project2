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
  max-width: 1200px;
  margin: 0 auto;
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
