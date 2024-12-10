import { useEffect, useState } from 'react';
import './doctor.css';
import './DoctorNavBar';

export default function DoctorProfile() {
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const storedDoctorData = localStorage.getItem('doctor');
    if (storedDoctorData) {
      const parsedDoctorData = JSON.parse(storedDoctorData);
      setDoctorData(parsedDoctorData);
    }
  }, []);

  return (
    doctorData ? (
      <div className="patient-card">
        <p><strong>ID:</strong> {doctorData.id}</p>
        <p><strong>Name:</strong> {doctorData.name}</p>
        <p><strong>Date of Birth:</strong> {doctorData.dateofbirth}</p>
        <p><strong>Department:</strong> {doctorData.department}</p>
        <p><strong>Gender:</strong> {doctorData.gender}</p>
        <p><strong>Contact:</strong> {doctorData.contact}</p>
        <p><strong>Location:</strong> {doctorData.location}</p>
        <p><strong>Email:</strong> {doctorData.email}</p>
        <p><strong>Password:</strong> {doctorData.password}</p>
        <p><strong>Salary:</strong> {doctorData.salary}</p>
      </div>
    ) : (
      <p>No Doctor Data Found</p>
    )
  );
}
