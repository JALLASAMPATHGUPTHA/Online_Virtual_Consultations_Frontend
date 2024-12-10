import { useState } from 'react';
import './doctor.css';  // Import the external CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './doctor.css'
import config from './../config';

export default function DoctorLogin({ onDoctorLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.url}checkdoctorlogin`, formData, 
        {
          headers: {
            'Content-Type': 'application/json', // Sending JSON data
          },
        }
      );

      if (response.data != null && response.data.id) {
        onDoctorLogin();
        localStorage.setItem('doctor', JSON.stringify(response.data));
        navigate('/doctorhome');
      } else {
        setMessage('Login Failed');
        setError('');
      }
    } catch (error) {
      console.error('Doctor Login Error:', error); 
      setMessage('');
      setError(error.message);
    }
  };

  return (
    <div className="body">
      <div className="login-container">
        <h3 className="login-heading">
          <u>Doctor Login</u>
        </h3>
        {message ? (
          <h4>{message}</h4>
        ) : (
          <h4 style={{ color: 'red' }}>{error}</h4>
        )}
        <form onSubmit={handleSubmit} className="login-form">
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
      </div>
    </div>
  );
}

DoctorLogin.propTypes = {
  onDoctorLogin: PropTypes.func,
};