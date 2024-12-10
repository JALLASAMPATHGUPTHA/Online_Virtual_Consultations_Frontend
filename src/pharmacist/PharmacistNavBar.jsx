import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import PharmacistHome from './PharmacistHome';
import PendingOrders from './PendingOrders';
import AcceptedOrders from './AcceptedOrders';

export default function PharmacistNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isPharmacistLoggedIn');
    localStorage.removeItem('pharmacist');
    navigate('/pharmacistlogin');
    window.location.reload();
  };

  return (
    <div>
      {/* Bootstrap Navigation Bar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="hospital-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">SSB Hospital - Pharmacist Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="pharmacist-navbar" />
          <Navbar.Collapse id="pharmacist-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/pharmacisthome" className="mx-2">Home</Nav.Link>
              <Nav.Link as={Link} to="/pendingorders" className="mx-2">Pending Orders</Nav.Link>
              <Nav.Link as={Link} to="/acceptedorders" className="mx-2">Accepted Orders</Nav.Link>
            </Nav>

            {/* Logout Button */}
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/pharmacisthome" element={<PharmacistHome />} />
        <Route path="/pendingorders" element={<PendingOrders />} />
        <Route path="/acceptedorders" element={<AcceptedOrders />} />
      </Routes>
    </div>
  );
}
