import { useState } from 'react';
import { reportsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Reports.css';

export default function Reports() {
  const [reportType, setReportType] = useState('maintenance');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async (type) => {
    setLoading(true);
    try {
      let res;
      if (type === 'maintenance') {
        res = await reportsAPI.getMaintenanceHistory();
      } else if (type === 'cost') {
        res = await reportsAPI.getCostAnalysis();
      } else if (type === 'equipment') {
        res = await reportsAPI.getEquipmentStatus();
      } else {
        res = await reportsAPI.getTeamPerformance();
      }
      setReportData(res.data);
      setReportType(type);
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="reports-container">
        <h1>📈 รายงาน</h1>

        <div className="report-buttons">
          <button onClick={() => generateReport('maintenance')} className={reportType === 'maintenance' ? 'active' : ''}>
            📝 ประวัติการซ่อม
          </button>
          <button onClick={() => generateReport('cost')} className={reportType === 'cost' ? 'active' : ''}>
            💰 วิเคราะห์ค่าใช้จ่าย
          </button>
          <button onClick={() => generateReport('equipment')} className={reportType === 'equipment' ? 'active' : ''}>
            🏭 สถานะอุปกรณ์
          </button>
          <button onClick={() => generateReport('team')} className={reportType === 'team' ? 'active' : ''}>
            👥 ประสิทธิภาพทีม
          </button>
        </div>

        {loading && <div className="loading">⏳ กำลังสร้างรายงาน...</div>}

        {reportData && (
          <div className="report-content">
            <pre>{JSON.stringify(reportData, null, 2)}</pre>
            <button className="btn-export">📥 ส่งออก PDF</button>
            <button className="btn-export">📊 ส่งออก Excel</button>
          </div>
        )}
      </div>
    </>
  );
}