import { useState, useEffect } from 'react';
import { assetsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Assets.css';

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await assetsAPI.getAll();
      setAssets(res.data);
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
      <div className="assets-container">
        <h1>🏭 จัดการอุปกรณ์</h1>

        <div className="assets-grid">
          {assets.map(asset => (
            <div key={asset.id} className="asset-card">
              <h3>📦 {asset.name}</h3>
              <p><strong>รหัส:</strong> {asset.code}</p>
              <p><strong>ประเภท:</strong> {asset.type}</p>
              <p><strong>สถานะ:</strong> <span className={`status-badge ${asset.status}`}>{asset.status}</span></p>
              <p><strong>สถานที่:</strong> {asset.location}</p>
              <p><strong>ซ่อมครั้งสุดท้าย:</strong> {asset.lastMaintenance}</p>
              <button className="btn-small">ดูประวัติ</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}