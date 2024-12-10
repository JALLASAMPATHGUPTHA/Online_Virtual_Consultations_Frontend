import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';

export default function ViewAllDoctors() {
  const [doctors, setDoctors] = useState([]); // empty array
  const [error, setError] = useState('');

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.url}viewalldoctors`);
      setDoctors(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <h3>View All Doctors</h3>
      {
        doctors.length > 0 ? 
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.gender}</td>
                <td>{doctor.dateofbirth}</td>
                <td>{doctor.department}</td>
                <td>{doctor.salary}</td>
                <td>{doctor.email}</td>
                <td>{doctor.contact}</td>
                <td>{doctor.location}</td>
              </tr>
            ))}
          </tbody>
        </table> :
        error ?
        <p>{error}</p> :
        <p>No doctors found</p>
      }
    </div>
  );
}