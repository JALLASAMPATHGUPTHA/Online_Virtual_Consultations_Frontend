import { useState } from 'react';
import './patient.css';  // Import the external CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from './../config';

export default function PatientLogin({ onPatientLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.url}checkpatlogin`, 
        formData, 
        {
          headers: {
            'Content-Type': 'application/json', // Sending JSON data
          },
        }
      );

      console.log('Patient Login Response:', response.data);

      if (response.data != null && response.data.id) {
        onPatientLogin();
        localStorage.setItem('patient', JSON.stringify(response.data)); 
        navigate('/patienthome'); 
      } else {
        setMessage('Login Failed');
        setError('');
      }
    } catch (error) {
      console.error('Patient Login Error:', error); 
      setMessage('');
      setError(error.message);
    }
  };

  // Navigate to patient registration page
  const goToRegistration = () => {
    navigate('/patientreg');
  };

  return (
    <div className="body">
      <div className="login-container">
        <h3 className="login-heading">
          <u>Patient Login</u>
        </h3>
        {message ? (
          <h4>{message}</h4>
        ) : (
          <h4 style={{ color: 'red' }}>{error}</h4>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <a onClick={goToRegistration} style={{ display: 'block', textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#007bff', cursor: 'pointer' }}>
          Dont have an account? Register Here
        </a>
      </div>
    </div>
  );
}

PatientLogin.propTypes = {
  onPatientLogin: PropTypes.func, // Expecting a function to be passed as a prop
};