import { useEffect, useState } from 'react';
import axios from 'axios';
import './doctor.css'
import config from './../config';
export default function ViewAllPatients() 
{
  const [patients, setPatients] = useState([]); 
  const [error, setError] = useState('');

   const fetchPatients = async () => 
    {
      try 
      {
        const response = await axios.get(`${config.url}viewallpatients`); //url remainning
        setPatients(response.data);
      } 
      catch (error) 
      {
        setError(error.message);
      }
    };

    useEffect(() => {
      fetchPatients();
    }, []);


  return (
    <div>
      <h3>View All Patients</h3>
      {
          patients ? 
         <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DateofBirth</th>
              <th>Email</th>
              <th>Location</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                 <td>{patient.dateofbirth}</td>
                <td>{patient.email}</td>
                <td>{patient.location}</td>
                <td>{patient.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>:
        error?
        <p>{error}</p> :
        <p>No patient found</p>
      }
    </div>
  );
}
