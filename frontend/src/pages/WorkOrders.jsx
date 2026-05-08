import { useState, useEffect } from 'react';
import { workOrdersAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './WorkOrders.css';

export default function WorkOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assetId: '',
    priority: 'medium',
    dueDate: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await workOrdersAPI.getAll();
      setOrders(res.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await workOrdersAPI.create(formData);
      setFormData({ title: '', description: '', assetId: '', priority: 'medium', dueDate: '' });
      setShowForm(false);
      fetchOrders();
      alert('✅ สร้างใบสั่งซ่อมสำเร็จ!');
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await workOrdersAPI.updateStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  if (loading) return <div className="loading">⏳ กำลังโหลด...</div>;

  return (
    <>
      <Navbar />
      <div className="workorders-container">
        <h1>📝 ใบสั่งซ่อม</h1>

        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ ปิด' : '+ ใบสั่งใหม่'}
        </button>

        {showForm && (
          <form onSubmit={handleCreate} className="form-container">
            <input
              type="text"
              placeholder="ชื่อ"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <textarea
              placeholder="รายละเอียด"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <input
              type="text"
              placeholder="รหัสอุปกรณ์"
              value={formData.assetId}
              onChange={(e) => setFormData({...formData, assetId: e.target.value})}
            />
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
            >
              <option value="low">ต่ำ</option>
              <option value="medium">ปานกลาง</option>
              <option value="high">สูง</option>
              <option value="critical">วิกฤต</option>
            </select>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              required
            />
            <button type="submit" className="btn-primary">สร้าง</button>
          </form>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>เลขที่</th>
                <th>ชื่อ</th>
                <th>สถานะ</th>
                <th>ความสำคัญ</th>
                <th>วันครบกำหนด</th>
                <th>การกระทำ</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.number}</strong></td>
                  <td>{order.title}</td>
                  <td>
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">รอดำเนินการ</option>
                      <option value="assigned">มอบหมายแล้ว</option>
                      <option value="in_progress">กำลังดำเนินการ</option>
                      <option value="completed">เสร็จแล้ว</option>
                    </select>
                  </td>
                  <td><span className={`priority ${order.priority}`}>{order.priority}</span></td>
                  <td>{order.dueDate}</td>
                  <td><button className="btn-small">ดู</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}