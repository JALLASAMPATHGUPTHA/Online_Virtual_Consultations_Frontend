import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';
export default function ViewDoctorsByDepartment() {
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch doctors by department
  const fetchDoctorsByDepartment = async () => {
    if (!department) {
      setError('Please select a department.');
      setDoctors([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${config.url}viewdoctorsbydepartment`, {
        params: { department },
      });
      setDoctors(response.data);
    } catch (err) {
      setError('Error fetching doctors: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (department) {
      fetchDoctorsByDepartment();
    }
  }, [department]);

  return (
    <div>
       <h3>View Doctors By Department</h3>

{/* Department selection */}
<div className="department-container">
  <label htmlFor="department" className="department-label">Choose Department: </label>
  <select
    id="department"
    className="department-select"
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
  >
    <option value="">--Select Department--</option>
    <option value="Cardiology">Cardiology</option>
    <option value="Orthopedics">Orthopedics</option>
    <option value="Neurology">Neurology</option>
    <option value="Pediatrics">Pediatrics</option>
    {/* Add more departments as needed */}
  </select>
</div>

{loading && <p>Loading doctors...</p>}

{error && <p style={{ color: 'red' }}>{error}</p>}

{doctors.length > 0 ? (
  <table border="1" style={{ marginTop: '20px', width: '100%' }}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Date of Birth</th>
        <th>Department</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      {doctors.map((doctor) => (
        <tr key={doctor.id}>
          <td>{doctor.id}</td>
          <td>{doctor.name}</td>
          <td>{doctor.gender}</td>
          <td>{doctor.dateofbirth}</td>
          <td>{doctor.department}</td>
          <td>{doctor.email}</td>
          <td>{doctor.contact}</td>
          <td>{doctor.location}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  !loading && !error && <p>No doctors found for the selected department.</p>
)}
    </div>
  );
}