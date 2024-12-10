import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientHome() {
  const [patientData, setPatientData] = useState("");
  const [healthStats, setHealthStats] = useState({});
  const [showHealthTips, setShowHealthTips] = useState(false);
  const [showHealthDetails, setShowHealthDetails] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState({ rating: "", comments: "" });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const navigate = useNavigate();

  const healthTips = [
    "Drink plenty of water to stay hydrated.",
    "Exercise regularly to keep your body fit.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Get enough sleep to help your body recover.",
    "Manage stress through mindfulness or relaxation techniques.",
  ];

  useEffect(() => {
    const storedPatientData = localStorage.getItem("patient");
    if (storedPatientData) {
      const parsedPatientData = JSON.parse(storedPatientData);
      setPatientData(parsedPatientData);
    }

    const stats = {
      lastBloodPressure: "120/80 mmHg",
      recentBloodSugar: "95 mg/dL",
      bmiScore: "22.3 (Normal)",
    };
    setHealthStats(stats);
  }, []);

  const toggleHealthTips = () => setShowHealthTips(!showHealthTips);
  const toggleHealthDetails = () => setShowHealthDetails(!showHealthDetails);
  const toggleFeedbackForm = () => setShowFeedbackForm(!showFeedbackForm);

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const submitFeedback = () => {
    console.log("Feedback submitted:", feedback);
    localStorage.setItem("patientFeedback", JSON.stringify(feedback));
    setFeedbackSubmitted(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      {patientData && (
        <div style={{ textAlign: "left", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "35px" }}>Welcome, {patientData.name}!</h1>
          
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1 1 200px",
            padding: "20px",
            backgroundColor: "#f0f8ff",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => navigate("/AddAppointment")}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
            Book Appointment
          </h3>
        </div>


        <div
          style={{
            flex: "1 1 200px",
            padding: "20px",
            backgroundColor: "#f0f8ff",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onClick={toggleHealthTips}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
            {showHealthTips ? "Hide Health Tips" : "Show Health Tips"}
          </h3>
        </div>

        <div
          style={{
            flex: "1 1 200px",
            padding: "20px",
            backgroundColor: "#f0f8ff",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onClick={toggleHealthDetails}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
            {showHealthDetails ? "Hide Dashboard" : "Show Health Dashboard"}
          </h3>
        </div>

        <div
          style={{
            flex: "1 1 200px",
            padding: "20px",
            backgroundColor: "#f0f8ff",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onClick={toggleFeedbackForm}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
            {showFeedbackForm ? "Hide Feedback Form" : "Give Feedback"}
          </h3>
        </div>
      </div>

      {showHealthTips && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            width: "90%",
            margin: "0 auto",
          }}
        >
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Health Tips</h2>
          <ul style={{ lineHeight: "1.5", fontSize: "14px", marginTop: "10px" }}>
            {healthTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {showHealthDetails && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            width: "90%",
            margin: "0 auto",
          }}
        >
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Health Dashboard</h2>
          <ul style={{ lineHeight: "1.5", fontSize: "14px", marginTop: "10px" }}>
            <li>Last Blood Pressure Reading: {healthStats.lastBloodPressure}</li>
            <li>Recent Blood Sugar Levels: {healthStats.recentBloodSugar}</li>
            <li>BMI Score: {healthStats.bmiScore}</li>
          </ul>
        </div>
      )}

      {showFeedbackForm && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
            Share Your Feedback
          </h2>
          {feedbackSubmitted ? (
            <p style={{ fontSize: "16px", color: "green" }}>
              Thank you for your feedback!
            </p>
          ) : (
            <>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "14px" }}>
                  Rating:
                </label>
                <select
                  name="rating"
                  value={feedback.rating}
                  onChange={handleFeedbackChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">Select Rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "14px" }}>
                  Comments:
                </label>
                <textarea
                  name="comments"
                  value={feedback.comments}
                  onChange={handleFeedbackChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    borderRadius: "4px",
                  }}
                  rows="3"
                  placeholder="Write your comments here..."
                ></textarea>
              </div>
              <button
                onClick={submitFeedback}
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Submit Feedback
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
