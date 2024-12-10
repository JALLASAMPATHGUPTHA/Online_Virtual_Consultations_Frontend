import axios from "axios";
import { useEffect, useState } from "react";
import './admin.css';
import config from './../config';

export default function ViewAllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const recordsPerPage = 8; // Number of records per page

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.url}viewalldr`); // Replace with your API URL
      setDoctors(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  // Delete a doctor
  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`${config.url}deletedoctor?id=${id}`); // Replace with your delete URL
      fetchDoctors();
      alert(`Doctor with ID: ${id} has been successfully removed.`);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Pagination logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentDoctors = doctors.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(doctors.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h3>View All Doctors</h3>
      {doctors.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Department</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Password</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.dateofbirth}</td>
                  <td>{doctor.department}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.salary}</td>
                  <td>{doctor.password}</td>
                  <td>{doctor.location}</td>
                  <td>{doctor.contact}</td>
                  <td>
                    <button onClick={() => deleteDoctor(doctor.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {/* Pagination buttons */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  margin: '0 5px',
                  padding: '5px 10px',
                  backgroundColor: currentPage === index + 1 ? '#007bff' : '#f8f9fa',
                  color: currentPage === index + 1 ? 'white' : 'black',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No doctor found</p>
      )}
    </div>
  );
}