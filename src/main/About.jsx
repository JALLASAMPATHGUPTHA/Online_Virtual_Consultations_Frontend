export default function About() {
  // Inline Styles
  const styles = {
    aboutPage: {
      padding: '50px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '30px',
      marginBottom: '40px',
      textAlign: 'center',
    },
    cardTitle: {
      color: '#007bff',
      fontSize: '1.8rem',
      marginBottom: '15px',
      borderBottom: '3px solid #007bff',
      display: 'inline-block',
      paddingBottom: '8px',
    },
    cardDescription: {
      color: '#333333',
      fontSize: '1rem',
      lineHeight: '1.6',
    },
    infoCards: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    smallCard: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      flex: '1 1 calc(33.333% - 20px)',
      minWidth: '280px',
      maxWidth: '350px',
      textAlign: 'center',
    },
    smallCardTitle: {
      color: '#007bff',
      fontSize: '1.6rem',
      marginBottom: '10px',
      borderBottom: '2px solid #007bff',
      display: 'inline-block',
      paddingBottom: '5px',
    },
    smallCardDescription: {
      color: '#555555',
      fontSize: '0.95rem',
      lineHeight: '1.5',
    },
  };

  return (
    <div style={styles.aboutPage}>
      {/* About Card */}
      <div style={styles.card}>
        <h4 style={styles.cardTitle}>About</h4>
        <p style={styles.cardDescription}>
          We are excited to offer our Virtual Hospital Management System, providing
          comprehensive healthcare services across specialties like Nephrology, Urology,
          Radiology, Neurology & Neurosurgery, and more. The system supports virtual consultations,
          online appointments, e-prescriptions, lab reports, and 24/7 emergency care, all accessible from home.
          With secure management of medical records and real-time communication between patients
          and healthcare professionals, our platform ensures seamless, efficient healthcare
          delivery, offering world-class medical services at your fingertips.
        </p>
      </div>

      {/* Vision, Mission, and Values Cards */}
      <div style={styles.infoCards}>
        <div style={styles.smallCard}>
          <h4 style={styles.smallCardTitle}>Our Vision</h4>
          <p style={styles.smallCardDescription}>
            To revolutionize healthcare delivery by making specialized, world-class medical services accessible to everyone through innovative virtual solutions.
          </p>
        </div>
        <div style={styles.smallCard}>
          <h4 style={styles.smallCardTitle}>Our Mission</h4>
          <p style={styles.smallCardDescription}>
            To provide comprehensive, patient-centered care, leveraging technology to enhance healthcare efficiency and improve patient outcomes.
          </p>
        </div>
        <div style={styles.smallCard}>
          <h4 style={styles.smallCardTitle}>Our Values</h4>
          <p style={styles.smallCardDescription}>
            We are committed to excellence, integrity, compassion, innovation, and collaboration, ensuring the highest standards of healthcare.
          </p>
        </div>
      </div>
    </div>
  );
}
