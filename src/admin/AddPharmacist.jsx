import { useState } from 'react';
import axios from 'axios';
import '../patient/patient.css';
import config from './../config';

export default function AddPharmacist() {
  const [pharmacist, setPharmacist] = useState({
    name: '',
    gender: '',
    dateofbirth: '',
    salary: '',
    email: '',
    password: '',
    location: '',
    contact: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPharmacist({ ...pharmacist, [name]: value });

    // Validation logic
    if (name === 'name') {
      const regex = /^[A-Za-z\s]+$/;
      if (!regex.test(value)) {
        setMessage('Name can only contain alphabetic characters and spaces.');
      } else {
        setMessage('');
      }
    }

    if (name === 'contact') {
      const regex = /^[6-9]\d{0,9}$/;
      if (!regex.test(value)) {
        setMessage('Contact number must start with 6-9 and contain up to 10 digits.');
      } else if (value.length > 10) {
        setMessage('Contact number cannot exceed 10 digits.');
      } else {
        setMessage('');
      }
    }

    if (name === 'email') {
      const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!regex.test(value)) {
        setMessage('Email must contain @gmail.com.');
      } else {
        setMessage('');
      }
    }

    if (name === 'password') {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(value)) {
        setMessage(
          'Password must have at least 8 characters, including uppercase, lowercase, a number, and a special character.'
        );
      } else {
        setMessage('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    if (!/^[A-Za-z\s]+$/.test(pharmacist.name)) {
      setMessage('Name can only contain alphabetic characters and spaces.');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(pharmacist.email)) {
      setMessage('Email must contain @gmail.com.');
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pharmacist.password)) {
      setMessage(
        'Password must have at least 8 characters, including uppercase, lowercase, a number, and a special character.'
      );
      return;
    }
    if (!/^[6-9]\d{9}$/.test(pharmacist.contact)) {
      setMessage('Contact number must start with a digit between 6-9 and be exactly 10 digits long.');
      return;
    }

    try {
      const response = await axios.post(
        `${config.url}addpharmacist`,
        pharmacist,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setMessage(response.data);
        setPharmacist({
          name: '',
          gender: '',
          dateofbirth: '',
          salary: '',
          email: '',
          password: '',
          location: '',
          contact: '',
        });
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="appointment-container">
      <div className="appointment-form">
        {message && <h4 className="form-error">{message}</h4>}
        <h2 className="form-title">Add New Pharmacist</h2>
        <form onSubmit={handleSubmit} className="appointment-form-container">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={pharmacist.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              value={pharmacist.gender}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">---Select Gender---</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dateofbirth"
              value={pharmacist.dateofbirth}
              onChange={handleChange}
              required
              className="form-input"
              max={today}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Salary</label>
            <input
              type="number"
              name="salary"
              value={pharmacist.salary}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={pharmacist.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={pharmacist.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={pharmacist.location}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact</label>
            <input
              type="text"
              name="contact"
              value={pharmacist.contact}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">Add</button>
            <button
              type="reset"
              className="btn-clear"
              onClick={() =>
                setPharmacist({
                  name: '',
                  gender: '',
                  dateofbirth: '',
                  salary: '',
                  email: '',
                  password: '',
                  location: '',
                  contact: '',
                })
              }
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
