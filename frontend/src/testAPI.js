import { dashboardAPI } from './services/api';

// ทดสอบเรียก API
const testAPI = async () => {
  try {
    console.log('🔄 กำลังเรียก API...');
    const response = await dashboardAPI.getStats();
    console.log('✅ ได้ข้อมูล:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testAPI();