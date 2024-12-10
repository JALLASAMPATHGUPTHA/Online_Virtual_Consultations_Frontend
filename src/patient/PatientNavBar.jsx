import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import PatientProfile from "./PatientProfile";
import PatientHome from './PatientHome';
import UpdateProfile from "./UpdateProfile";
import AddAppointment from './AddAppointment';
import ViewDoctorsByDepartment from './ViewDoctorsByDept';
import PatientReg from './PatientReg';
import MyAppointments from './MyAppointments';
import ViewPrescription from './ViewPrescription';

export default function PatientNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isPatientLoggedIn');
    localStorage.removeItem('patient');
    navigate('/patientlogin');
    window.location.reload();
  };

  return (
    <div>
      {/* Bootstrap Navigation Bar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="hospital-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">SSB Hospital - Patient Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="patient-navbar" />
          <Navbar.Collapse id="patient-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
              <Nav.Link as={Link} to="/addappointment" className="mx-2">Book Appointment</Nav.Link>
              <Nav.Link as={Link} to="/myappointments" className="mx-2">My Appointments</Nav.Link>
              <Nav.Link as={Link} to="/myprescription" className="mx-2">Prescriptions</Nav.Link>
              <Nav.Link as={Link} to="/viewdocbydept" className="mx-2">View Doctors By Department</Nav.Link>

              {/* Profile Dropdown */}
              <NavDropdown title="Profile" id="profile-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/PatientProfile">View Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/UpdateProfile">Update Profile</NavDropdown.Item>
              </NavDropdown>
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
        <Route path="/" element={<PatientHome />} />
        <Route path="/patienthome" element={<PatientHome/>}/>
        <Route path="/PatientProfile" element={<PatientProfile />} />
        <Route path="/UpdateProfile" element={<UpdateProfile />} />
        <Route path="/addappointment" element={<AddAppointment />} />
        <Route path="/myappointments" element={<MyAppointments />} />
        <Route path="/myprescription" element={<ViewPrescription />} />
        <Route path="/viewdocbydept" element={<ViewDoctorsByDepartment />} />
        <Route path="/patientregistration" element={<PatientReg />} />
      </Routes>
    </div>
  );
}
