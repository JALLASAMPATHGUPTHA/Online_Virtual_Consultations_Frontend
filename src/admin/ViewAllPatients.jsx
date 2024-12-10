import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';

export default function ViewAllPatients() {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const recordsPerPage = 8;

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${config.url}viewallpt`); // Replace with your API URL
      setPatients(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`${config.url}deletepatient/${id}`); // Replace with your delete URL
      fetchPatients();
      alert(`Patient with ID: ${id} has been successfully removed.`);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Pagination logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentPatients = patients.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(patients.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h3>View All Patients</h3>
      {patients.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Password</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.dateofbirth}</td>
                  <td>{patient.email}</td>
                  <td>{patient.password}</td>
                  <td>{patient.location}</td>
                  <td>{patient.contact}</td>
                  <td>
                    <button onClick={() => deletePatient(patient.id, patient.name)}>Delete</button>
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
        <p>No patient found</p>
      )}
    </div>
  );
}