import { useState } from 'react';
import { dashboardAPI, workOrdersAPI, assetsAPI, teamsAPI } from '../services/api';

export default function TestAPI() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  // ทดสอบ Dashboard Stats
  const testDashboardStats = async () => {
    setLoading(true);
    try {
      console.log('🔄 เรียก /dashboard/stats...');
      const response = await dashboardAPI.getStats();
      console.log('✅ สำเร็จ:', response.data);
      setResults(prev => ({ ...prev, dashboardStats: response.data }));
    } catch (error) {
      console.error('❌ Error:', error.message);
      setResults(prev => ({ ...prev, dashboardStats: 'Error: ' + error.message }));
    }
    setLoading(false);
  };

  // ทดสอบ Work Orders
  const testWorkOrders = async () => {
    setLoading(true);
    try {
      console.log('🔄 เรียก /work-orders...');
      const response = await workOrdersAPI.getAll();
      console.log('✅ สำเร็จ:', response.data);
      setResults(prev => ({ ...prev, workOrders: response.data }));
    } catch (error) {
      console.error('❌ Error:', error.message);
      setResults(prev => ({ ...prev, workOrders: 'Error: ' + error.message }));
    }
    setLoading(false);
  };

  // ทดสอบ Assets
  const testAssets = async () => {
    setLoading(true);
    try {
      console.log('🔄 เรียก /assets...');
      const response = await assetsAPI.getAll();
      console.log('✅ สำเร็จ:', response.data);
      setResults(prev => ({ ...prev, assets: response.data }));
    } catch (error) {
      console.error('❌ Error:', error.message);
      setResults(prev => ({ ...prev, assets: 'Error: ' + error.message }));
    }
    setLoading(false);
  };

  // ทดสอบ Teams
  const testTeams = async () => {
    setLoading(true);
    try {
      console.log('🔄 เรียก /teams...');
      const response = await teamsAPI.getAll();
      console.log('✅ สำเร็จ:', response.data);
      setResults(prev => ({ ...prev, teams: response.data }));
    } catch (error) {
      console.error('❌ Error:', error.message);
      setResults(prev => ({ ...prev, teams: 'Error: ' + error.message }));
    }
    setLoading(false);
  };

  // ทดสอบ Login
  const testLogin = async () => {
    setLoading(true);
    try {
      console.log('🔄 เรียก /auth/login...');
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@maintenance.com',
          password: 'password123'
        })
      });
      const data = await response.json();
      console.log('✅ สำเร็จ:', data);
      setResults(prev => ({ ...prev, login: data }));
      
      // บันทึก token
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('💾 Token บันทึกแล้ว');
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      setResults(prev => ({ ...prev, login: 'Error: ' + error.message }));
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🧪 ทดสอบ API</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testLogin} disabled={loading} style={{ marginRight: '10px', padding: '10px 20px' }}>
          {loading ? '⏳ กำลังโหลด...' : '🔐 ทดสอบ Login'}
        </button>
        <button onClick={testDashboardStats} disabled={loading} style={{ marginRight: '10px', padding: '10px 20px' }}>
          📊 ทดสอบ Dashboard
        </button>
        <button onClick={testWorkOrders} disabled={loading} style={{ marginRight: '10px', padding: '10px 20px' }}>
          📝 ทดสอบ Work Orders
        </button>
        <button onClick={testAssets} disabled={loading} style={{ marginRight: '10px', padding: '10px 20px' }}>
          🏭 ทดสอบ Assets
        </button>
        <button onClick={testTeams} disabled={loading} style={{ padding: '10px 20px' }}>
          👥 ทดสอบ Teams
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>📋 ผลลัพธ์:</h2>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '5px',
          overflow: 'auto',
          maxHeight: '400px'
        }}>
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  );
}