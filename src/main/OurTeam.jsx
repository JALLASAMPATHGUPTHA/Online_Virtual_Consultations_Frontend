const doctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    specialty: 'Cardiologist',
    experience: 10,
    photo: 'https://static.vecteezy.com/system/resources/thumbnails/028/287/384/small_2x/a-mature-indian-male-doctor-on-a-white-background-ai-generated-photo.jpg', // Dr. John Smith image
  },
  {
    id: 2,
    name: 'Dr. Emily Johnson',
    specialty: 'Neurologist',
    experience: 8,
    photo: 'https://static.vecteezy.com/system/resources/thumbnails/041/409/059/small_2x/ai-generated-a-female-doctor-with-a-stethoscope-isolated-on-transparent-background-free-png.png', // Dr. Emily Johnson image
  },
  {
    id: 3,
    name: 'Dr. Sarah Davis',
    specialty: 'Pediatrician',
    experience: 6,
    photo: 'https://www.citizenshospitals.com/static/uploads/130789a4-764e-4ee3-88fe-68f9278452d6-1692966652977.png', // Dr. Sarah Davis image
  },
  {
    id: 4,
    name: 'Dr. Michael Brown',
    specialty: 'Orthopedic Surgeon',
    experience: 12,
    photo: 'https://symbiosisuniversityhospital.com/images/doctors/abhishek.jpg', // Dr. Michael Brown image
  },
  {
    id: 5,
    name: 'Dr. Lisa White',
    specialty: 'Dermatologist',
    experience: 7,
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtSH2R4-SNSZHZ5etcwymA5UN8nwY8d4lwKQ&s', // Dr. Lisa White image
  },
];

export default function OurTeam() {
  return (
    <div style={styles.teamContainer}>
      <h1>Our Team</h1>
      <div style={styles.doctorGrid}>
        {doctors.map(doctor => (
          <div key={doctor.id} style={styles.doctorCard}>
            <img
              src={doctor.photo}
              alt={doctor.name}
              style={styles.doctorImage}
            />
            <div style={styles.doctorInfo}>
              <h4>{doctor.name}</h4>
              <p style={styles.doctorDetails}>Specialty: {doctor.specialty}</p>
              <p style={styles.doctorDetails}>Experience: {doctor.experience} years</p>
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
  doctorDetails: {
    color: '#000', // Black color for specialty and experience
  },
};
