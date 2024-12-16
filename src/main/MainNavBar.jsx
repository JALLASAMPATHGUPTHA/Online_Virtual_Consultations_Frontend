import PropTypes from 'prop-types';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './Home';
import About from './About';
import Facilities from './Facilities';

import Service from './Service';
import Contact from './Contact';
import Packages from './Packages';
import Login from './Login';
import DoctorLogin from '../doctor/DoctorLogin';
import AdminLogin from '../admin/AdminLogin';
import PatientLogin from '../patient/PatientLogin';
import PharmacistLogin from '../pharmacist/PharmacistLogin';
import PatientReg from '../patient/PatientReg';
import './main.css';

export default function MainNavBar({ onAdminLogin, onDoctorLogin, onPatientLogin, onPharmacistLogin }) {
  const popalert = () => {
    alert("Please Login!!");
  };
  return (
    

    <div>
      {/* Navigation Bar with custom hospital blue color */}
      <Navbar bg="primary" variant="dark" expand="lg" className="hospital-navbar">
        <Container>
          <Navbar.Brand href="#home">SSB Hospital</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="mx-3">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="mx-3">About</Nav.Link>
              <Nav.Link as={Link} to="/facilities" className="mx-3">Facilities</Nav.Link>
              
              <Nav.Link as={Link} to="/service" className="mx-3">Service</Nav.Link>
              <Nav.Link as={Link} to="/packages" className="mx-3">Packages</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="mx-3">Contact Us</Nav.Link>
             

              {/* Direct Login Link */}
              <Nav.Link as={Link} to="/login" className="mx-3">Login</Nav.Link>

              <li>
              <button
  className="nav-link book-appointment-link mx-3"
  onClick={popalert}
  style={{
    color: 'white',  
    backgroundColor: 'navyblue',  
    border: 'none',  
    padding: '10px 20px',  
    borderRadius: '5px',  
    fontWeight: 'bold',  
    cursor: 'pointer',  
    transition: 'background-color 0.3s ease',  
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = '#003366')}  
  onMouseOut={(e) => (e.target.style.backgroundColor = 'midnightblue')}  
>
  Book Appointment
</button>


            </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/facilities" element={<Facilities />} />
        
        <Route path="/service" element={<Service />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctorlogin" element={<DoctorLogin onDoctorLogin={onDoctorLogin} />} />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin} />} />
        <Route path="/patientlogin" element={<PatientLogin onPatientLogin={onPatientLogin} />} />
        <Route path="/pharmacistlogin" element={<PharmacistLogin onPharmacistLogin={onPharmacistLogin} />} />
        <Route path="/patientreg" element={<PatientReg />} />
      </Routes>

     
    </div>
  );
}

MainNavBar.propTypes = {
  onAdminLogin: PropTypes.func,
  onDoctorLogin: PropTypes.func,
  onPatientLogin: PropTypes.func,
  onPharmacistLogin: PropTypes.func,
};
