import { useEffect, useState } from 'react';
import axios from 'axios';
import './doctor.css';
import config from './../config';

export default function PendingAppointments() {
  const [doctor, setDoctor] = useState(null); // Start with null instead of an empty object
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  // Load doctor data only once on component mount
  useEffect(() => {
    const storedDoctorData = localStorage.getItem('doctor');
    if (storedDoctorData) {
      const parsedDoctorData = JSON.parse(storedDoctorData);
      setDoctor(parsedDoctorData);
    } else {
      console.log("No doctor data found in localStorage.");
    }
  }, []); // Empty dependency array to run once on component mount

  // Fetch patients once doctor data is loaded
  useEffect(() => {
    if (doctor) {
      const fetchPatients = async () => {
        try {
          const response = await axios.get(`${config.url}viewallbookedappointments?doctorname=${doctor.name}`);
          setPatients(response.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchPatients(); // Fetch patients only after doctor data is available
    }
  }, [doctor]); // Run this effect when doctor is updated

  // Function to format the appointment date
  const formatDate = (appointmentdate) => {
    if (Array.isArray(appointmentdate)) {
      return `${appointmentdate[0]}-${String(appointmentdate[1]).padStart(2, '0')}-${String(appointmentdate[2]).padStart(2, '0')}`;
    }
    return appointmentdate; // Return as is if not an array
  };

  const handleStatusChange = async (patientid, status) => {
    try {
      await axios.post(`${config.url}changepatientstatus?id=${patientid}&status=${status}`);
      setError(''); // Reset error if successful
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <h3>View All Booked Patients</h3>
      {patients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Department</th>
              <th>Contact</th>
              <th>ApTakenTime</th>
              <th>ApDate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.email}</td>
                <td>{patient.department}</td>
                <td>{patient.contactno}</td>
                <td>{patient.aptime}</td>
                <td>{formatDate(patient.apdate)}</td> {/* Format date here */}
                <td>
                  <button onClick={() => handleStatusChange(patient.id, "ACCEPTED")}>ACCEPT</button>
                  <button onClick={() => handleStatusChange(patient.id, "REJECTED")}>REJECT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <img 
            src="image.png" 
            alt="No Data Found" 
            style={{
              width: '300px', 
              height: '300px', 
              objectFit: 'cover', 
              border: '1px solid #ccc',
              borderRadius: '8px',
            }} 
          />
        </div>
      )}
    </div>
  );
}