import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import DoctorHome from "./DoctorHome";
import PendingAppointments from './PendingAppointments';
import UpdateDoctorProfile from './UpdateDoctorProfile';
import AcceptedAppointments from './AcceptedAppointments';
import OnlineConsultant from './OnlineConsultant';
import DoctorProfile from './DoctorProfile';
import AddPrescription from './AddPrescription';
import '../main/main.css';


export default function DoctorNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isDoctorLoggedIn');
    localStorage.removeItem('doctor');
    navigate('/doctorlogin');
    window.location.reload();
  };

  return (
    <div>
      {/* Navigation Bar with custom hospital blue color */}
      <Navbar bg="primary" variant="dark" expand="lg" className="hospital-navbar">
        <Container>
          <Navbar.Brand href="/doctorhome">SSB Hospital</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/doctorhome" className="mx-3">Home</Nav.Link>
              <Nav.Link as={Link} to="/acceptedappointments" className="mx-3">My Appointments</Nav.Link>
              <Nav.Link as={Link} to="/pendingappointments" className="mx-3">Pending Appointments</Nav.Link>

              {/* Dropdown for Profile */}
              <Dropdown className="mx-3">
                <DropdownButton id="dropdown-basic-button" title="Profile">
                  <Dropdown.Item as={Link} to="/doctupdateprofile">Update</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/doctorprofile">View</Dropdown.Item>
                </DropdownButton>
              </Dropdown>
            </Nav>

            {/* Logout Button */}
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/doctorhome" element={<DoctorHome />} />
        <Route path="/pendingappointments" element={<PendingAppointments />} />
        <Route path="/acceptedappointments" element={<AcceptedAppointments />} />
        <Route path="/doctupdateprofile" element={<UpdateDoctorProfile />} />
        <Route path="/onlineconsultant" element={<OnlineConsultant />} />
        <Route path="/doctorprofile" element={<DoctorProfile />} />
        <Route path="/addprescription" element={<AddPrescription />} />
      </Routes>
    </div>
  );
}
