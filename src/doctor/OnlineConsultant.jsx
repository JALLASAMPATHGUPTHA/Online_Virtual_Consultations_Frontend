import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AddPrescription from './AddPrescription';
import '../patient/patient.css'
import config from './../config';

export default function OnlineConsultant() {
  const location = useLocation();
  const { patientmail, doctorname, patientid, patientgender, doctordepartment, appointmentdate } = location.state || {};
  const [meetingLink, setMeetingLink] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [showAddPrescription, setShowAddPrescription] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${config.url}sendemail`, null, {
        params: {
          patientmail,
          meetingLink,
          doctorname,
        },
      });
      setMsg(response.data || 'Email sent successfully!');
      setError('');
    } catch (error) {
      setError('Failed to send Email: ' + (error.response?.data || error.message));
      setMsg('');
    }
  };

  if (showAddPrescription) {
    return (
      <AddPrescription
        patientmail={patientmail}
        doctorname={doctorname}
        patientid={patientid}
        patientgender={patientgender}
        doctordepartment={doctordepartment}
        appointmentdate={appointmentdate}
      />
    );
  }

  return (
    <div className="appointment-container">
      <div className="appointment-form">
        <h2 className="form-title">Send Online Consultation Link</h2>
        {msg && <h4 className="appointment-message">{msg}</h4>}
        {error && <h4 className="form-error">{error}</h4>}
        <form onSubmit={handleSubmit} className="appointment-form-container">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" value={patientmail} readOnly required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Doctor Name</label>
            <input type="text" value={doctorname} readOnly required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Meeting Link</label>
            <input
              type="text"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">Send Email</button>
          </div>
        </form>
        {/* <button onClick={() => setShowAddPrescription(true)} className="btn-action">Add Prescription</button> */}
        <button
    onClick={() =>  setShowAddPrescription(true)}
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
    Add Prescription
</button>
      </div>
    </div>
  );
}

OnlineConsultant.propTypes = {
  patientmail: PropTypes.string,
  doctorname: PropTypes.string,
  patientid: PropTypes.string,
  appointmentdate: PropTypes.string,
  doctordepartment: PropTypes.string,
  patientgender: PropTypes.string,
};
