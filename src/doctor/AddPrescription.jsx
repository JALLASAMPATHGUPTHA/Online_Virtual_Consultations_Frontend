import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../patient/patient.css'
import config from './../config';

export default function AddPrescription() {
  const [error, setError] = useState('');
  const [prescription, setPrescription] = useState({
    id: '',
    email: '',
    gender: '',
    doctorname: '',
    department: '',
    medicine: '',
    additionalinformation: '',
    date: '',
  });

  const location = useLocation();
  const { patientmail, doctorname, patientid, patientgender, doctordepartment, appointmentdate } = location.state || {};

  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('Appointment Date:', appointmentdate); // Debugging line
    console.log('doctordepartment:', doctordepartment); // Debugging line
  
    if (patientid && patientmail && patientgender && doctorname && doctordepartment && appointmentdate) {
      const formattedDate = Array.isArray(appointmentdate)
        ? `${appointmentdate[0]}-${String(appointmentdate[1]).padStart(2, '0')}-${String(appointmentdate[2]).padStart(2, '0')}`
        : appointmentdate;
  
      console.log('Formatted Date:', formattedDate); // Debugging line
  
      setPrescription({
        id: patientid,
        email: patientmail,
        gender: patientgender,
        doctorname: doctorname,
        department: doctordepartment,
        medicine: '',
        additionalinformation: '',
        date: formattedDate,
      });
    }
  }, [patientid, patientmail, patientgender, doctorname, doctordepartment, appointmentdate]);

  const handleChange = (e) => {
    setPrescription({ ...prescription, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.url}addprescription`,
        prescription,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Prescription added successfully!');
        setPrescription({
          id: '',
          email: '',
          gender: '',
          doctorname: '',
          department: '',
          medicine: '',
          additionalinformation: '',
          date: '',
        });
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data || error.message));
    }
  };

  const handleStatusChange = async (patientid, status) => {
    try {
      const response = await axios.post(`${config.url}changepatientstatus?id=${patientid}&status=${status}`);
      if (response.status === 200) {
        alert('Patient consulted successfully');
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-form">
        {error && <p className="form-error">{error}</p>}
        {message && <p className="appointment-message">{message}</p>}
        <h2 className="form-title">Add Prescription</h2>
        <form onSubmit={handleSubmit} className="appointment-form-container">
          <div className="form-group">
            <label className="form-label">Patient Id</label>
            <input type="number" name="id" value={prescription.id} readOnly required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Patient Email</label>
            <input type="email" name="email" value={prescription.email} readOnly required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Patient Gender</label>
            <input type="text" name="gender" value={prescription.gender} readOnly required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Doctor Name</label>
            <input type="text" name="doctorname" value={prescription.doctorname} readOnly required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <select name="department" value={prescription.department} readOnly required className="form-input">
              <option value="">---Select Department---</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Nephrology">Nephrology</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Appointment Date</label>
            <input type="date" name="date" value={prescription.date} readOnly required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Medicine</label>
            <textarea
              name="medicine"
              value={prescription.medicine}
              onChange={handleChange}
              required
              rows="4"
              cols="50"
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Additional Information</label>
            <textarea
              name="additionalinformation"
              value={prescription.additionalinformation}
              onChange={handleChange}
              required
              rows="4"
              cols="50"
              className="form-textarea"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">Add Prescription</button>
            <button type="reset" className="btn-clear">Clear</button>
          </div>
        </form>
      </div>
      <button
    onClick={() => handleStatusChange(patientid, "COMPLETED")}
    style={{
        position: "absolute",
        top: "170px", // Adjust this value based on the height of your navbar

        right: "400px", // Distance from the right edge
        backgroundColor: "#4CAF50", // Green button color
        color: "white", // White text
        border: "none", // No border
        padding: "10px 20px", // Padding for better button size
        cursor: "pointer", // Pointer cursor on hover
        borderRadius: "5px", // Rounded corners
        fontWeight: "bold", // Bold text
        zIndex: "1000", // Ensure it stays above other elements
    }}
>
    Mark as Completed
</button>



    </div>
  );
}

AddPrescription.propTypes = {
  patientmail: PropTypes.string,
  doctorname: PropTypes.string,
  patientid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  patientgender: PropTypes.string,
  doctordepartment: PropTypes.string,
  appointmentdate: PropTypes.string,
};
