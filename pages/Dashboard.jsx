import { useState, useEffect } from 'react';
import { dashboardAPI, workOrdersAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await dashboardAPI.getStats();
      setStats(statsRes.data);

      const ordersRes = await workOrdersAPI.getAll();
      setOrders(ordersRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">⏳ กำลังโหลด...</div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>📊 แดชบอร์ด</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>ทั้งหมด</h3>
            <p className="stat-value">{stats?.totalWorkOrders || 0}</p>
          </div>
          <div className="stat-card active">
            <h3>กำลังดำเนินการ</h3>
            <p className="stat-value">{stats?.inProgress || 0}</p>
          </div>
          <div className="stat-card success">
            <h3>เสร็จแล้ว</h3>
            <p className="stat-value">{stats?.completed || 0}</p>
          </div>
          <div className="stat-card danger">
            <h3>เกินกำหนด</h3>
            <p className="stat-value">{stats?.overdue || 0}</p>
          </div>
        </div>

        <div className="table-container">
          <h2>ใบสั่งซ่อมล่าสุด</h2>
          <table>
            <thead>
              <tr>
                <th>เลขที่</th>
                <th>ชื่อ</th>
                <th>สถานะ</th>
                <th>ความสำคัญ</th>
                <th>มอบหมายให้</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.number}</strong></td>
                  <td>{order.title}</td>
                  <td><span className={`status ${order.status}`}>{order.status}</span></td>
                  <td><span className={`priority ${order.priority}`}>{order.priority}</span></td>
                  <td>{order.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}