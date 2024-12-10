import { useState, useEffect } from 'react';
import axios from 'axios';
import '../patient/patient.css';
import config from './../config';

export default function UpdateDoctorProfile() {
  const [doctorData, setDoctorData] = useState({
    id: '',
    name: '',
    gender: '',
    dateofbirth: '',
    department: '',
    salary: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialDoctorData, setInitialDoctorData] = useState({});

  // Load doctor data from localStorage and initialize state
  useEffect(() => {
    const storedDoctorData = localStorage.getItem('doctor');
    if (storedDoctorData) {
      const parsedDoctorData = JSON.parse(storedDoctorData);
      setDoctorData(parsedDoctorData);
      setInitialDoctorData(parsedDoctorData); // Store initial doctor data
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in doctorData) {
        if (doctorData[key] !== initialDoctorData[key] && initialDoctorData[key] !== '') {
          updatedData[key] = doctorData[key];
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = doctorData.email;
        const response = await axios.put(`${config.url}updatedoctorprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}doctorprofile/${doctorData.email}`);
        localStorage.setItem('doctor', JSON.stringify(res.data));
      } else {
        // No changes
        setMessage('No Changes in Doctor Profile');
        setError('');
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-form">
        <h2 className="form-title">Update Doctor Profile</h2>
        {message ? <h4 className="appointment-message">{message}</h4> : <h4 className="form-error">{error}</h4>}
        <form onSubmit={handleSubmit} className="appointment-form-container">
          <div className="form-group">
            <label className="form-label">ID</label>
            <input type="text" id="id" value={doctorData.id} readOnly className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" id="name" value={doctorData.name} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <input type="text" id="gender" value={doctorData.gender} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input type="date" id="dateofbirth" value={doctorData.dateofbirth} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input type="text" id="department" value={doctorData.department} readOnly className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Salary</label>
            <input type="number" id="salary" value={doctorData.salary} readOnly className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" id="email" value={doctorData.email} readOnly className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" id="password" value={doctorData.password} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input type="text" id="location" value={doctorData.location} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Contact</label>
            <input type="number" id="contact" value={doctorData.contact} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
