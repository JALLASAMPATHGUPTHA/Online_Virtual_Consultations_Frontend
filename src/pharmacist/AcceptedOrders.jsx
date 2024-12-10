import { useState, useEffect } from 'react';
import axios from 'axios';
import config from './../config';


export default function AcceptedOrders() {
  const [pharmacist, setPharmacist] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    const storedPharmacistData = localStorage.getItem('pharmacist');
    if (storedPharmacistData) {
      const parsedPharmacistData = JSON.parse(storedPharmacistData);
      setPharmacist(parsedPharmacistData);
    } else {
      console.log('No pharmacist data found in localStorage.');
    }
  }, []);

  useEffect(() => {
    if (pharmacist) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `${config.url}viewallapprovedorders`
          );
          setOrders(response.data);
        } catch (error) {
          setError('Failed to fetch orders: ' + error.message);
        }
      };
      fetchOrders();
    }
  }, [pharmacist]);

  const acceptedOrders = orders.filter((order) => order.status === 'ACCEPTED');

  return (
    <div>
      <h3>View All Accepted Orders</h3>
      {error && <p className="error">{error}</p>}
      {acceptedOrders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Department</th>
              <th>Medicine</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {acceptedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.email}</td>
                <td>{order.department}</td>
                <td>{order.medicine}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{orders.length === 0 && !error ? 'No accepted orders found' : ''}</p>
      )}
    </div>
  );
}