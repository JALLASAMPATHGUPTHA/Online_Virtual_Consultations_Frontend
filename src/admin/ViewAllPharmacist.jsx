import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';

export default function ViewAllPharmacist() {
  const [pharmacists, setPharmacists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const recordsPerPage = 8; // Number of records per page

  // Fetch pharmacists data
  const fetchPharmacists = async () => {
    try {
      const response = await axios.get(`${config.url}viewallpr`); // Replace with your API URL
      setPharmacists(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete pharmacist
  const deletePharmacist = async (id) => {
    try {
      await axios.delete(`${config.url}deletepharmacist/${id}`); // Replace with your delete URL
      fetchPharmacists();
      alert(`Pharmacist with ID: ${id} has been successfully removed.`);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPharmacists();
  }, []);

  // Pagination logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentPharmacists = pharmacists.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(pharmacists.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h3>View All Pharmacists</h3>
      {pharmacists.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Salary</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Password</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPharmacists.map((pharmacist) => (
                <tr key={pharmacist.id}>
                  <td>{pharmacist.id}</td>
                  <td>{pharmacist.name}</td>
                  <td>{pharmacist.gender}</td>
                  <td>{pharmacist.dateofbirth}</td>
                  <td>{pharmacist.salary}</td>
                  <td>{pharmacist.email}</td>
                  <td>{pharmacist.contact}</td>
                  <td>{pharmacist.password}</td>
                  <td>{pharmacist.location}</td>
                  <td>
                    <button onClick={() => deletePharmacist(pharmacist.id)}>Delete</button>
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
        <p>No Pharmacist found</p>
      )}
    </div>
  );
}