import './main.css'
import PropTypes from 'prop-types';
const PackageCard = ({ title, price, features }) => {
  const popalert = () => {
    alert("Please Login!!");
  };
  return (
    <div className="package-card">
      <h3>{title}</h3>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button onClick={popalert} className="price-button">Rs. {price}/- Only</button>    </div>
  );
};

function App() {
  const vijayaBasicHealthCheckup = {
    title: 'BASIC HEALTH CHECKUP',
    price: '1,950',
    features: [
      'Complete Blood Picture',
      'Serum Creatinine',
      'T3, T4, TSH',
      'Chest X-Ray',
      'ECG',
      'Lipid Profile',
      'Fasting Blood Sugar',
      'Blood Grouping & Rh Tying',
      'Complete Urine Examination',
      'General Medicine Consultation',
    ],
  };

  const basicKidneyCheckup = {
    title: 'BASIC KIDNEY CHECKUP',
    price: '1,500',
    features: [
      'Ultrasound KUB',
      'Urine Analysis',
      'Serum Creatinine',
      'RBS',
      'Serum Uric acid',
      'HB Percentage',
      'Total Cholesterol',
      'Nephrologist Consultation',
    ],
  };

  return (
    <div className="App">
      <div className="package-section">
        <h1>Packages</h1>
        <div className="package-container">
          <PackageCard {...vijayaBasicHealthCheckup} />
          <PackageCard {...basicKidneyCheckup} />
        </div>
      </div>
    </div>
  );
}

PackageCard.propTypes = {
    
  title: PropTypes.func,
  price: PropTypes.func,
  features: PropTypes.func
  
};


export default App;