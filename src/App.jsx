import './App.css'
import { BrowserRouter as Router} from "react-router-dom"
import { useEffect,useState } from 'react';
import AdminNavBar from './admin/AdminNavBar'
import MainNavBar from './main/MainNavBar';

import DoctorNavBar from './doctor/DoctorNavBar';
import PatientNavBar from './patient/PatientNavBar';
import PharmacistNavBar from './pharmacist/PharmacistNavBar';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);
  const [isPharmacistLoggedIn, setIsPharmacistLoggedIn] = useState(false);

    useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const doctorLoggedIn = localStorage.getItem('isDoctorLoggedIn') === 'true';
    const patientLoggedIn = localStorage.getItem('isPatientLoggedIn') === 'true';
    const pharmacistLoggedIn = localStorage.getItem('isPharmacistLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsDoctorLoggedIn(doctorLoggedIn);
    setIsPatientLoggedIn(patientLoggedIn);
    setIsPharmacistLoggedIn(pharmacistLoggedIn);
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onDoctorLogin = () => {
    localStorage.setItem('isDoctorLoggedIn', 'true');
    setIsDoctorLoggedIn(true);
  };

  const onPatientLogin = () => {
    localStorage.setItem('isPatientLoggedIn', 'true');
    setIsPatientLoggedIn(true);
  };

  const onPharmacistLogin = () => {
    localStorage.setItem('isPharmacistLoggedIn', 'true');
    setIsPharmacistLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        {isAdminLoggedIn ? (
         <AdminNavBar/>
        ) : isPatientLoggedIn ? (
          <PatientNavBar />
        ) : isDoctorLoggedIn ? (
          <DoctorNavBar />
        ) :isPharmacistLoggedIn ?(
          < PharmacistNavBar/>
        ) :(
          <MainNavBar
            onAdminLogin={onAdminLogin}
            onDoctorLogin={onDoctorLogin}
            onPatientLogin={onPatientLogin}
            onPharmacistLogin={onPharmacistLogin}
          />
        )}
      </Router>
    </div>
  )
}

export default App
