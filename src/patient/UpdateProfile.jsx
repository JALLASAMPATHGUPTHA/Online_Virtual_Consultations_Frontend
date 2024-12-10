import { useState, useEffect } from 'react';
import axios from 'axios';
import './patient.css';
import config from './../config';

export default function UpdatePatientProfile() {
  const [patientData, setPatientData] = useState({
    id: '',
    name: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialPatientData, setInitialPatientData] = useState({});

  useEffect(() => {
    const storedPatientData = localStorage.getItem('patient');
    if (storedPatientData) {
      const parsedPatientData = JSON.parse(storedPatientData);
      setPatientData(parsedPatientData);
      setInitialPatientData(parsedPatientData); // Store initial patient data
    }
  }, []);

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in patientData) {
        if (patientData[key] !== initialPatientData[key] && initialPatientData[key] !== '') {
          updatedData[key] = patientData[key];
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        updatedData.email = patientData.email;
        const response = await axios.put(`${config.url}updatepatientprofile`, updatedData);
        setMessage(response.data);
        console.log(response.data)
        setError('');

        const res = await axios.get(`${config.url}patientprofile/${patientData.email}`);
        localStorage.setItem("patient", JSON.stringify(res.data));
        console.log(patientData)
      } else {
        setMessage('No Changes in Patient Profile');
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
        <h2 className="form-title">Update Patient Profile</h2>
        {message ? <h4 className="appointment-message">{message}</h4> : <h4 className="form-error">{error}</h4>}
        <form onSubmit={handleSubmit} className="appointment-form-container">
          <div className="form-group">
            <label className="form-label">ID</label>
            <input type="text" id="id" value={patientData.id} readOnly className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" id="name" value={patientData.name} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <input type="text" id="gender" value={patientData.gender} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input type="date" id="dateofbirth" value={patientData.dateofbirth} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" id="email" value={patientData.email} readOnly className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" id="password" value={patientData.password} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input type="text" id="location" value={patientData.location} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Contact</label>
            <input type="text" id="contact" value={patientData.contact} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
