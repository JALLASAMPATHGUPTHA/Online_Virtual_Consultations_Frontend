import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import Home from './AdminHome';
import AddDoctor from './AddDoctor';
import ViewAllPatients from './ViewAllPatients';
import ViewAllPharmacist from './ViewAllPharmacist';
import ViewAllDoctors from './ViewAllDoctors';
import AddPharmacist from './AddPharmacist';
import '../main/main.css';

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      {/* Navigation Bar with custom hospital blue color */}
      <Navbar bg="primary" variant="dark" expand="lg" className="hospital-navbar">
        <Container>
          <Navbar.Brand href="/adminhome">SSB Hospital</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/adminhome" className="mx-3">Home</Nav.Link>



              {/* Dropdown for Add */}
              <Dropdown className="mx-3">
                <DropdownButton   id="dropdown-basic-button" title="Add">
                  <Dropdown.Item as={Link} to="/adddoctor">Add Doctor</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/addpharmacist">Add Pharmacist</Dropdown.Item>
                </DropdownButton>
              </Dropdown>

              {/* Dropdown for View All */}
              <Dropdown className="mx-3">
                <DropdownButton  id="dropdown-basic-button" title="View All">
                  <Dropdown.Item as={Link} to="/viewallpatients">Patients</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/viewallpharmacist">Pharmacists</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/viewalldoctors">Doctors</Dropdown.Item>
                </DropdownButton>
              </Dropdown>
            </Nav>

            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/adminhome" element={<Home />} />
        <Route path="/adddoctor" element={<AddDoctor />} />
        <Route path="/addpharmacist" element={<AddPharmacist />} />
        <Route path="/viewallpatients" element={<ViewAllPatients />} />
        <Route path="/viewallpharmacist" element={<ViewAllPharmacist />} />
        <Route path="/viewalldoctors" element={<ViewAllDoctors />} />
      </Routes>
    </div>
  );
}
