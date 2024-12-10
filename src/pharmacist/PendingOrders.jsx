import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';

export default function PendingOrders() {
  const [pharmacist, setPharmacist] = useState(null); // Start with null instead of an empty object
  const [orders, setOrders] = useState([]); // Orders to be processed by the pharmacist
  const [error, setError] = useState('');

  // Load pharmacist data only once on component mount
  useEffect(() => {
    const storedPharmacistData = localStorage.getItem('pharmacist');
    if (storedPharmacistData) {
      const parsedPharmacistData = JSON.parse(storedPharmacistData);
      setPharmacist(parsedPharmacistData);
    } else {
      console.log("No pharmacist data found in localStorage.");
    }
  }, []); // Empty dependency array to run once on component mount

  // Fetch pending orders once pharmacist data is loaded
  useEffect(() => {
    if (pharmacist) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`${config.url}viewallpendingorders`);
          setOrders(response.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchOrders(); // Fetch orders only after pharmacist data is available
    }
  }, [pharmacist]); // Run this effect when pharmacist data is updated

  // Handle status change (Accept the order)
  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.post(`${config.url}changeorderstatus?id=${orderId}&status=${status}`);
      setError(''); // Reset error if successful
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <h3>View All Pending Orders</h3>
      {orders.length > 0 ? (
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.email}</td>
                <td>{order.department}</td>
                <td>{order.medicine}</td>
                <td>
                  <button onClick={() => handleStatusChange(order.id, "ACCEPTED")}>ACCEPT</button>
                  <button onClick={() => handleStatusChange(order.id, "REJECTED")}>REJECT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
}