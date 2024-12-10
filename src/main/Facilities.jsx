

// Array of facilities with names and image URLs
const facilities = [
  {
    id: 1,
    name: 'Advanced Operation Theatres',
    photo: 'https://www.med-technews.com/downloads/8536/download/op%20theatre.jpg?cb=d6dc63b7faa517f6b9cf3762d32c5faf', 
  },
  {
    id: 2,
    name: '24/7 Pharmacy',
    photo: 'https://www.himagirihospitals.com/wp-content/uploads/2020/01/24_7_pharmacy.png', 
  },
  {
    id: 3,
    name: 'Intensive Care Units (ICU)',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQni74AEKtaa4J946h8itnBLukkZk3R3cT3wg&s', 
  },
  {
    id: 4,
    name: 'Emergency Services',
    photo: 'https://content.jdmagicbox.com/comp/vijayawada/o0/0866px866.x866.000101538789.t5o0/catalogue/amma-ambulance-service-and-contractors-arundalpet-vijayawada-ambulance-services-5aoeax8pjy.jpg', 
  },
  {
    id: 5,
    name: 'Diagnostic Imaging Center',
    photo: 'https://www.oncologysystems.com/wp-content/uploads/2023/11/Philips-MRI.jpg',
  },
  {
    id: 6,
    name: 'Maternity Ward',
    photo: 'https://consumerwatchdog.org/wp-content/uploads/2024/04/welcome-to-maternity.jpg',
  },
  {
    id: 7,
    name: 'Physical Therapy Center',
    photo: 'https://www.ptcwyo.com/uploads/5/5/4/4/55446501/new-new-east_orig.jpg',
  },
  {
    id: 8,
    name: 'Patient Rooms',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4sqxQz7lSDTfleNuvRHQcJzwsvayi2uBItg&s',
  },
  {
    id: 9,
    name: 'Nutrition and Dietetics',
    photo: 'https://www.pushpanjalihospital.in/wp-content/uploads/2020/10/diet.jpg',
  },
  {
    id: 10,
    name: 'Patient Support Services',
    photo: 'https://qtxasset.com/cdn-cgi/image/w=384,h=216,f=auto,fit=crop,g=0.5x0.5/https://qtxasset.com/quartz/qcloud5/media/image/Patient%20Fierce%20Pharma%20Article%20Primary%20Image.jpg?VersionId=VP8FgyvSfJ5nmn83g3TLMCXjka_tt7Gk',
  },
];

export default function Facilities() {
  return (
    <div style={styles.facilityContainer}>
      <h3 style={styles.heading}>Our Facilities</h3>
      <div style={styles.facilityGrid}>
        {facilities.map(facility => (
          <div key={facility.id} style={styles.facilityCard}>
            <img
              src={facility.photo}
              alt={facility.name}
              style={styles.facilityImage}
            />
            <h4 style={styles.facilityName}>{facility.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  facilityContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  facilityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
  },
  facilityCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  facilityImage: {
    width: '180px',
    height: '150px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  facilityName: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '5px 0',
  },
};