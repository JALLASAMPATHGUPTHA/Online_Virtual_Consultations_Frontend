export default function Home() {
  // Inline Styles
  const styles = {
    heroContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start', // Align text to the left
      height: '100vh',
      textAlign: 'left', // Align text to the left
      fontFamily: 'Arial, sans-serif',
      paddingLeft: '50px', // Add padding to left side
      paddingTop: '20px',
      color: 'black', // Text color for visibility
    },
    heroText: {
      fontSize: '4rem', // Larger font size for the header
      color: '#333', // Dark color for better readability
      marginBottom: '10px',
      fontWeight: 'bold',
      textTransform: 'uppercase', // Uppercase for more impact
    },
    subText: {
      fontSize: '2rem', // Slightly larger font size for the subheading
      color: '#666', // Gray text for contrast
      marginBottom: '20px',
    },
    highlightedText: {
      fontWeight: 'bold',
      color: '#007bff', // Blue color for emphasis
      fontSize: '2.5rem', // Larger size for emphasis
    },
    additionalText: {
      fontSize: '1.5rem', // Slightly smaller size for additional information
      color: '#444', // Matching text color
      marginBottom: '15px',
    },
    chatbotContainer: {
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      width: '300px',
      height: '400px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      overflow: 'hidden',
    },
    iframe: {
      width: '100%',
      height: '100%',
      border: 'none',
    },
  };

  return (
    <div style={styles.heroContainer}>
      <h1 style={styles.heroText}>From young to old</h1>
      <p style={styles.subText}>Good Health is the Primary Goal</p>
      <p style={styles.additionalText}>
        Your health and comfort are our top priorities, ensuring you receive the best possible care.
      </p>

      <div className="botpenguin-chatbot-container">
       <iframe src="https://page.botpenguin.com/66faec05bc955a0b8b99f31c/66faebca344f1b7f66656496"></iframe>
</div>
    </div>
  );
}
