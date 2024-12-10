import { useState } from 'react';
import axios from 'axios';
import './patient.css';
import config from './../config';
export default function PatientReg() {
    const [patient, setPatient] = useState({
        name: '',
        gender: '',
        dateofbirth: '',
        location: '',
        email: '',
        password: '',
        contact: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPatient({ ...patient, [name]: value });

        if (name === 'name') {
            const regex = /^[A-Za-z]+$/;
            if (!regex.test(value)) {
                setMessage('Name can only contain alphabetic characters (no spaces or special characters).');
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
            if (value.length < 5) {
                setMessage('Password must contain at least 5 characters.');
            } else {
                setMessage('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[A-Za-z]+$/.test(patient.name)) {
            setMessage('Name can only contain alphabetic characters (no spaces or special characters).');
            return;
        }
        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(patient.email)) {
            setMessage('Email must contain @gmail.com.');
            return;
        }
        if (patient.password.length < 5) {
            setMessage('Password must contain at least 5 characters.');
            return;
        }
        if (!/^[6-9]\d{9}$/.test(patient.contact)) {
            setMessage('Contact number must start with a digit between 6-9 and be exactly 10 digits long.');
            return;
        }

        try {
            const response = await axios.post(`${config.url}patreg`, patient);
            if (response.status === 200) {
                setMessage(response.data);
                setPatient({
                    name: '',
                    gender: '',
                    dateofbirth: '',
                    location: '',
                    email: '',
                    password: '',
                    contact: ''
                });
            }
        } catch (error) {
            console.log(error.message);
            setMessage(error.message);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="appointment-container">
            <div className="appointment-form">
                <h2 className="form-title">Patient Registration</h2>
                {message && <h4 className="form-error">{message}</h4>}
                <form onSubmit={handleSubmit} className="appointment-form-container">
                    <div className="form-group">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={patient.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Gender:</label>
                        <select
                            name="gender"
                            value={patient.gender}
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
                        <label className="form-label">Date of Birth:</label>
                        <input
                            type="date"
                            name="dateofbirth"
                            value={patient.dateofbirth}
                            onChange={handleChange}
                            required
                            className="form-input"
                            max={today}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={patient.location}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={patient.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={patient.password}
                            onChange={handleChange}
                            required
                            className="form-input"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$"
                            title="Password must have at least 8 characters, including uppercase, lowercase, a number, and a special character."
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Contact:</label>
                        <input
                            type="text"
                            name="contact"
                            value={patient.contact}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Register</button>
                        <button
                            type="reset"
                            className="btn-reset"
                            onClick={() =>
                                setPatient({
                                    name: '',
                                    gender: '',
                                    dateofbirth: '',
                                    location: '',
                                    email: '',
                                    password: '',
                                    contact: ''
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
