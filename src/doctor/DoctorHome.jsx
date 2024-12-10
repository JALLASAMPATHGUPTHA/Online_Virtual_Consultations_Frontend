import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';

export default function DoctorHome() {
  const [doctorData, setDoctorData] = useState("");
  const [pendingappoint, setpendingappoint] = useState(0);
  const [acceptedappoint, setacceptedappoint] = useState(0);

  useEffect(() => {
    const storedDoctorData = localStorage.getItem("doctor");
    if (storedDoctorData) {
      const parsedDoctorData = JSON.parse(storedDoctorData);
      setDoctorData(parsedDoctorData);
    }
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorData.name) return; // Exit early if doctorData.name is not set

      try {
        const pendingResponse = await axios.get(
          `${config.url}pendingappointcount?doctorname=${doctorData.name}`
        );
        setpendingappoint(pendingResponse.data);

        const acceptedResponse = await axios.get(
          `${config.url}acceptedappointscount?doctorname=${doctorData.name}`
        );
        setacceptedappoint(acceptedResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAppointments();
  }, [doctorData]);

  return (
    <div>       
    <div style={styles.container}>

      {doctorData && (
        <div style={styles.welcomeSection}>
         <h4 style={styles.welcomeMessage}>Welcome Dr. {doctorData.name}</h4>
          <div style={styles.card}>
            <p style={styles.cardText}>Pending Appointments: {pendingappoint}</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardText}>Accepted Appointments: {acceptedappoint}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f7f8fc",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  welcomeSection: {
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    textAlign: "center",
  },
  welcomeMessage: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#eef2f7",
    border: "1px solid #d1d9e6",
    borderRadius: "2px",
    padding: "10px",
    margin: "10px 0",
    textAlign: "left",
  },
  cardText: {
    fontSize: "40px",
    color: "#555",
    margin: 0,
  },
};
