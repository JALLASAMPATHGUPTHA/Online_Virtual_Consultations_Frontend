
import './main.css';

export default function Service() {
  const services = [
    'Nephrology', 
    'Cardiology', 
    'Endocrinology', 
    'General Medicine', 
    'Orthopedic', 
    'Neuro Surgery', 
    'Gastroenterology', 
    'Radiology',
    'Dermatology',
    'Ophthalmology',
    'Psychiatry',
    'Hematology',
    
  ];

  return (
    <div className="service-page">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h4>{service}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
