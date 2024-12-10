import { useEffect, useState } from 'react';
import './patient.css'; 
import './PatientNavBar'
export default function PatientProfile() {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const storedPatientData = localStorage.getItem('patient');
    if (storedPatientData) {
      const parsedPatientData = JSON.parse(storedPatientData);
      setPatientData(parsedPatientData);
    }
  }, []);

  return (
    patientData ? (
      <div className="patient-card">
        <p><strong>ID:</strong> {patientData.id}</p>
        <p><strong>Name:</strong> {patientData.name}</p>
        <p><strong>Date of Birth:</strong> {patientData.dateofbirth}</p>
        <p><strong>Gender:</strong> {patientData.gender}</p>
        <p><strong>Contact:</strong> {patientData.contact}</p>
        <p><strong>Location:</strong> {patientData.location}</p>
        <p><strong>Email:</strong> {patientData.email}</p>
        <p><strong>Password:</strong> {patientData.password}</p>
      </div>
    ) : (
      <p>No Patient Data Found</p>
    )
  );
}