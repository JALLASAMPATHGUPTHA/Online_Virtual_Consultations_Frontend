import { useEffect, useState } from 'react';
import axios from 'axios';
import './patient.css';
import config from './../config';
export default function ViewPrescription() {
  const [patient, setPatient] = useState(null); // Start with null instead of an empty object
  const [prescriptiondata, setPrescription] = useState([]);
  const [error, setError] = useState(null);

  // Load patient data only once on component mount
  useEffect(() => {
    const storedPatientData = localStorage.getItem('patient');
    if (storedPatientData) {
      const parsedPatientData = JSON.parse(storedPatientData);
      setPatient(parsedPatientData);
    } else {
      console.log("No Patient data found in localStorage.");
    }
  }, []);

  // Fetch prescriptions once patient data is loaded
  useEffect(() => {
    if (patient) {
      const fetchPrescriptions = async () => {
        try {
          const response = await axios.get(`${config.url}viewallmyprescription?email=${patient.email}`);
          console.log(response.data); // Debugging log
          setPrescription(response.data);
        } catch (error) {
          console.error('Error fetching prescriptions:', error);
          setError('Failed to load prescription data.');
        }
      };

      fetchPrescriptions();
    }
  }, [patient]);

  // Place an order for a prescription
  const placeOrder = async (prescription) => {
    try {
      const { email, medicine, department } = prescription;
      const response = await axios.post(
        `${config.url}placeorder`,
        {
          email,
          medicine,
          department,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Order placed successfully:', response.data);
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order.');
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {prescriptiondata.length > 0 ? (
        prescriptiondata.map((prescription, index) => (
          <div key={index} className="patient-card">
            <p><strong>Date:</strong> {prescription.date}</p>
            <p><strong>ID:</strong> {prescription.id}</p>
            <p><strong>Email:</strong> {prescription.email}</p>
            <p><strong>Gender:</strong> {prescription.gender}</p>
            <p><strong>Doctor Name:</strong> {prescription.doctorname}</p>
            <p><strong>Department:</strong> {prescription.department}</p>
            <p><strong>Medicine:</strong> {prescription.medicine}</p>
            <p><strong>Additional Information:</strong> {prescription.additionalinformation}</p>
            <button onClick={() => placeOrder(prescription)}>Place Order</button>
          </div>
        ))
      ) : (
        <p>No Patient Data Found</p>
      )}
    </div>
  );
}