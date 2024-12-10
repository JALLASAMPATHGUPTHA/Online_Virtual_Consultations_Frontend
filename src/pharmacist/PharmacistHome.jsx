import { useEffect, useState } from 'react';

export default function PharmacistHome() {
  const [pharmacistData, setPharmacistData] = useState("");

  useEffect(() => {
    const storedPharmacistData = localStorage.getItem("pharmacist");
    if (storedPharmacistData) {
      const parsedPharmacistData = JSON.parse(storedPharmacistData);
      setPharmacistData(parsedPharmacistData);
    }
  }, []);

  // Inline Styles
  const styles = {
    heroContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', // Center horizontally
      height: '40vh', // Reduced height
      width: '80%', // Reduced width
      margin: 'auto', // Center horizontally
      marginTop: '50px', // Add gap between navbar and container
      borderRadius: '15px', // Rounded corners for better visuals
      textAlign: 'center', // Align text to the center
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', // Background gradient
      color: 'white', // Text color for visibility
      padding: '20px', // Add some padding for content spacing
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Shadow effect for better contrast
    },
    heroText: {
      fontSize: '2.5rem', // Smaller font size for the header
      color: '#fff', // White text for readability
      marginBottom: '10px',
      fontWeight: 'bold',
      textTransform: 'uppercase', // Uppercase for more impact
    },
    subText: {
      fontSize: '1.8rem', // Slightly smaller font size for the subheading
      color: '#ddd', // Light gray text for contrast
      marginBottom: '15px',
    },
    additionalText: {
      fontSize: '1.2rem', // Slightly smaller size for additional information
      color: '#ccc', // Matching text color
    },
  };

  return (
    <div style={styles.heroContainer}>
      <h1 style={styles.heroText}>Welcome {pharmacistData.name || "Pharmacist"}!</h1>
      <p style={styles.subText}>Your Expertise is the Key to Good Health</p>
      <p style={styles.additionalText}>
        Thank you for ensuring patients receive their medications accurately and on time.
      </p>
    </div>
  );
}
