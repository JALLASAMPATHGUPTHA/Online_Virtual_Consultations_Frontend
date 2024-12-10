import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';

export default function MyAppointments() {
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedPatientData = localStorage.getItem('patient');
    if (storedPatientData) {
      const parsedPatientData = JSON.parse(storedPatientData);
      setPatientData(parsedPatientData);
    }
  }, []);

  useEffect(() => {
    if (patientData) {
      const fetchAppointments = async () => {
        try {
          const response = await axios.get(`${config.url}viewmyappointments?email=${patientData.email}`);
          setAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error.response || error.message);
          setError('Failed to fetch appointments.');
        }
      };

      fetchAppointments();
    }
  }, [patientData]);

  return (
    <div>
      <h3>My Appointments</h3>
      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ApDate</th>
              <th>ApTime</th>
              <th>Department</th>
              <th>DoctorName</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.apdate}</td>
                <td>{appointment.aptime}</td>
                <td>{appointment.department}</td>
                <td>{appointment.doctorname}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No Booked Appointments</p>
      )}
    </div>
  );
}
