import { useState } from 'react';
import axios from 'axios';
import '../patient/patient.css';

import config from './../config';

export default function AddDoctor() {
  const [doctor, setDoctor] = useState({
    name: '',
    gender: '',
    dateofbirth: '',
    department: '',
    salary: '',
    email: '',
    password: '',
    location: '',
    contact: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctor({ ...doctor, [name]: value });

    // Validation logic
    if (name === 'name') {
      const regex = /^[A-Za-z\s]+$/; // Allows alphabets and spaces
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
    if (!/^[A-Za-z\s]+$/.test(doctor.name)) {
      setMessage('Name can only contain alphabetic characters and spaces.');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(doctor.email)) {
      setMessage('Email must contain @gmail.com.');
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(doctor.password)) {
      setMessage(
        'Password must have at least 8 characters, including uppercase, lowercase, a number, and a special character.'
      );
      return;
    }
    if (!/^[6-9]\d{9}$/.test(doctor.contact)) {
      setMessage('Contact number must start with a digit between 6-9 and be exactly 10 digits long.');
      return;
    }

    try {
      const response = await axios.post(
        `${config.url}adddoctor`,
        doctor,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setMessage(response.data);
        setDoctor({
          name: '',
          gender: '',
          dateofbirth: '',
          department: '',
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
        <h2 className="form-title">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="appointment-form-container">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              value={doctor.gender}
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
              value={doctor.dateofbirth}
              onChange={handleChange}
              required
              className="form-input"
              max={today}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              name="department"
              value={doctor.department}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">---Select Department---</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Nephrology">Nephrology</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Salary</label>
            <input
              type="number"
              name="salary"
              value={doctor.salary}
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
              value={doctor.email}
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
              value={doctor.password}
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
              value={doctor.location}
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
              value={doctor.contact}
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
                setDoctor({
                  name: '',
                  gender: '',
                  dateofbirth: '',
                  department: '',
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
