
import { Link } from 'react-router-dom';
import './main.css'; // Styling file for the cards


const doctors = [
    {
      id: 1,
      name:"Admin",
      type: <Link to="/adminlogin" >Admin</Link>,
      photo: 'https://i.pinimg.com/originals/6a/44/f0/6a44f0e35b10e6ed063eeebf7ed844f9.jpg', // Dr. John Smith image
    },
    {
      id: 2,
      name:"Doctor",
      type: <Link to="/doctorlogin" >Doctor</Link>,
      photo: 'https://static.vecteezy.com/system/resources/thumbnails/041/409/059/small_2x/ai-generated-a-female-doctor-with-a-stethoscope-isolated-on-transparent-background-free-png.png', // Dr. Emily Johnson image
      
    },
    {
      id: 3,
      name:"Patient",
      type: <Link to="/patientlogin" >Patient</Link>,
      photo: 'https://st2.depositphotos.com/5266903/8981/v/450/depositphotos_89819082-stock-illustration-patient-ok-rounded-vector-icon.jpg', // Dr. Sarah Davis image
    },
    {
      id: 4,
      name:"Pharmacist",
      type: <Link to="/pharmacistlogin" >Pharmacist</Link>,
      photo: 'https://img.freepik.com/premium-vector/man-pharmacist-cartoon-round-icon-vector-illustration-graphic-design-vector-illustration-graphic-design_1142-73813.jpg', // Dr. Sarah Davis image
    },
  ];


export default function Login() {
  return (
    <div style={styles.teamContainer}>
      <h1>Login As</h1>
    <div style={styles.doctorGrid}>
    {doctors.map(doctor => (
      <div key={doctor.id} style={styles.doctorCard}>
        <img
          src={doctor.photo}
          alt={doctor.name}
          style={styles.doctorImage}
        />
        <div style={styles.doctorInfo}>
          <h4>{doctor.type}</h4>
        </div>
      </div>      
    ))}
    </div>
  </div>
  );
}

const styles = {
    teamContainer: {
      textAlign: 'center',
      padding: '20px',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '24px',
    },
    doctorGrid: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    doctorCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '10px',
      width: '200px',
      padding: '10px',
      textAlign: 'center',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for aesthetics
    },
    doctorImage: {
      width: '120px',
      height: '120px',
      borderRadius: '50%', // Makes the image circular
      marginBottom: '10px',
      border: '3px solid #ccc', // Optional: Border around the photo
    },
    doctorInfo: {
      backgroundColor: '#f9f9f9', // Box background color
      padding: '10px',
      borderRadius: '10px',
      width: '100%',
      boxSizing: 'border-box',
    },
  };
