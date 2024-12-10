import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from "chart.js";
import config from './../config';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler); // Register Chart.js plugins

const Counts = () => {
  const [counts, setCounts] = useState({
    doctorCount: 0,
    prescriptionCount: 0,
    patientCount: 0,
    bookedappointCount: 0, // Total appointments count
  });

  const [monthlyBookings, setMonthlyBookings] = useState([]); // Stores appointments by month
  const [lineChartData, setLineChartData] = useState({
    labels: [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Booked Appointments",
        data: Array(12).fill(0), // Initialize an array of 12 months, filled with 0 initially
        borderColor: "#007BFF", // Set line color to blue (change this line)
        backgroundColor: "rgba(0, 123, 255, 0.1)", // Light blue background fill
        pointBackgroundColor: "#007BFF", // Blue points on the line
        pointBorderColor: "#fff",
        fill: true, // Fill under the line
        tension: 0.4, // Smooth curve for the line
        borderWidth: 2, // Line thickness
        pointRadius: 5, // Radius of points on the line
        pointHoverRadius: 7, // Hover radius for points
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${config.url}count`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch counts");
        }
        return response.json();
      })
      .then((data) => {
        setCounts({
          doctorCount: data.doctorCount || 0,
          prescriptionCount: data.prescriptionCount || 0,
          patientCount: data.patientCount || 0,
          bookedappointCount: data.bookedappointCount || 0,
        });

        // Update the monthly bookings
        setMonthlyBookings(data.monthlyBookings || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching counts:", error);
        setLoading(false);
      });
  }, []);

  // Update the chart data after monthlyBookings is fetched
  useEffect(() => {
    if (monthlyBookings.length > 0) {
      const updatedData = Array(12).fill(0); // Initialize with 0s
      monthlyBookings.forEach(([month, count]) => {
        updatedData[month - 1] = count; // Update the correct index
      });

      setLineChartData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: updatedData,
          },
        ],
      }));
    }
  }, [monthlyBookings]);

  // Pie Chart Data
  const pieChartData = {
    labels: ["Doctors", "Pharmacists", "Patients"],
    datasets: [
      {
        data: [
          counts.doctorCount,
          counts.prescriptionCount,
          counts.patientCount,
         
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", ],
        hoverBackgroundColor: ["#36A2EBCC", "#FF6384CC", "#FFCE56CC", ],
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ fontSize: "35px" }}>My Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={containerStyle}>
          {/* Pie Chart on the left */}
          <div style={pieChartStyle}>
            <h2>Category Distribution</h2>
            <Pie data={pieChartData} />
          </div>

          {/* Line Chart on the right */}
          <div style={lineChartStyle}>
            <h2 >Booked Appointments by Month</h2>
            <Line data={lineChartData} />
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the page layout and charts
const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "30px",
  gap: "40px", // Space between the two charts
};

const pieChartStyle = {
  flex: "0.4", // Pie chart takes 40% width
  maxWidth: "400px", // Set a max width for the pie chart
  margin: "0 auto",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const lineChartStyle = {
  flex: "0.6", // Line chart takes 60% width
  maxWidth: "800px", // Set a max width for the line chart
  margin: "0 auto",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

export default Counts;
