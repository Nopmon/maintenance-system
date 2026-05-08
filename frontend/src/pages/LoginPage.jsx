import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@maintenance.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(email, password);
      
      // บันทึก token และ user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      console.log('✅ Login สำเร็จ!', response.data);
      
      // ไปที่ Dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      console.error('Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🔧 ระบบซ่อมบำรุง</h1>
        <p className="subtitle">Maintenance Management System</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>อีเมล:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@maintenance.com"
              required
            />
          </div>

          <div className="form-group">
            <label>รหัสผ่าน:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="login-btn"
          >
            {loading ? '⏳ กำลังเข้าสู่ระบบ...' : '🔐 เข้าสู่ระบบ'}
          </button>
        </form>

        <p className="hint">
          ✓ ทดลอง: admin@maintenance.com / password123
        </p>
      </div>
    </div>
  );
}