import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './doctor.css';
import config from './../config';

export default function AcceptedAppointments() {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedDoctorData = localStorage.getItem('doctor');
    if (storedDoctorData) {
      const parsedDoctorData = JSON.parse(storedDoctorData);
      setDoctor(parsedDoctorData);
    } else {
      console.log('No doctor data found in localStorage.');
    }
  }, []);

  useEffect(() => {
    if (doctor) {
      const fetchPatients = async () => {
        try {
          const response = await axios.get(
            `${config.url}viewallapprovedappoint?doctorname=${doctor.name}`
          );
          setPatients(response.data);
        } catch (error) {
          setError('Failed to fetch patients: ' + error.message);
        }
      };
      fetchPatients();
    }
  }, [doctor]);

  const acceptedPatients = patients.filter((patient) => patient.status === 'ACCEPTED');

  // Function to format date from array (if applicable)
  const formatDate = (appointmentdate) => {
    if (Array.isArray(appointmentdate)) {
      return `${appointmentdate[0]}-${String(appointmentdate[1]).padStart(2, '0')}-${String(appointmentdate[2]).padStart(2, '0')}`;
    }
    return appointmentdate; // if it's already in a string or date format
  };

  const handleViewClick = (patient) => {
    // Navigate to the OnlineConsultant page, passing patient and doctor data as state
    navigate('/onlineconsultant', {
      state: {
        patientmail: patient.email,
        patientid: patient.id,
        patientgender: patient.gender,
        doctorname: doctor.name,
        doctordepartment: doctor.department,
        appointmentdate: patient.apdate,
      },
    });
  };

  return (
    <div>
      <h3>View All Booked Patients</h3>
      {error && <p className="error">{error}</p>}
      {acceptedPatients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Contact</th>
              <th>ApTakenTime</th>
              <th>ApDate</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {acceptedPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.email}</td>
                <td>{patient.contactno}</td>
                <td>{patient.aptime}</td>
                <td>{formatDate(patient.apdate)}</td>
                <td>
                  <button onClick={() => handleViewClick(patient)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{patients.length === 0 && !error ? 'No patients found' : ''}</p>
      )}
    </div>
  );
}