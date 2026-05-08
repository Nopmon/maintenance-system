import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>🔧 ระบบซ่อมบำรุง</h2>
      </div>

      <ul className="navbar-menu">
        <li><a onClick={() => navigate('/dashboard')}>📊 แดชบอร์ด</a></li>
        <li><a onClick={() => navigate('/work-orders')}>📝 ใบสั่งซ่อม</a></li>
        <li><a onClick={() => navigate('/assets')}>🏭 อุปกรณ์</a></li>
        <li><a onClick={() => navigate('/teams')}>👥 ทีม</a></li>
        <li><a onClick={() => navigate('/reports')}>📈 รายงาน</a></li>
      </ul>

      <div className="navbar-user">
        <span>👤 {user.email}</span>
        <button onClick={handleLogout} className="logout-btn">ออกจากระบบ</button>
      </div>
    </nav>
  );
}