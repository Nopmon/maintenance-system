const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files จาก frontend/build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Mock Database
const users = [
  {
    id: '1',
    email: 'admin@maintenance.com',
    password: 'password123',
    role: 'admin'
  }
];

const workOrders = [
  { id: '1', number: 'WO-001', title: 'ซ่อมปั๊มน้ำ', status: 'in_progress', priority: 'critical', assignedTo: 'จอห์น', dueDate: '2024-04-24' },
  { id: '2', number: 'WO-002', title: 'ซ่อมคอมเพรสเซอร์', status: 'pending', priority: 'medium', assignedTo: 'ซาร่า', dueDate: '2024-04-26' },
  { id: '3', number: 'WO-003', title: 'อพยพมอเตอร์', status: 'in_progress', priority: 'high', assignedTo: 'ไมค์', dueDate: '2024-04-25' },
  { id: '4', number: 'WO-004', title: 'เปลี่ยนวาล์ว', status: 'completed', priority: 'low', assignedTo: 'เอมม่า', dueDate: '2024-04-22' },
  { id: '5', number: 'WO-005', title: 'ตรวจสอบประจำ', status: 'completed', priority: 'low', assignedTo: 'เอลเล็กซ์', dueDate: '2024-04-23' },
];

const assets = [
  { id: '1', name: 'ปั๊มน้ำ A1', code: 'ASSET-001', type: 'เครื่องจักร', status: 'active', location: 'ชั้น 1', lastMaintenance: '2024-04-01' },
  { id: '2', name: 'คอมเพรสเซอร์ B', code: 'ASSET-002', type: 'เครื่องจักร', status: 'active', location: 'ชั้น 2', lastMaintenance: '2024-03-15' },
  { id: '3', name: 'มอเตอร์ C2', code: 'ASSET-003', type: 'อุปกรณ์', status: 'maintenance', location: 'ชั้น 1', lastMaintenance: '2024-02-28' },
];

const teams = [
  { id: '1', name: 'ทีม ก - ผลิตภัณฑ์', description: 'ทีมซ่อมหลัก', leader: 'เอมม่า', memberCount: 3, completedTasks: 28 },
  { id: '2', name: 'ทีม ข - สาธารณูปโภค', description: 'ทีมซ่อมระบบ', leader: 'เอมม่า', memberCount: 2, completedTasks: 15 },
];

// ============ AUTH API ============
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({
      token: 'fake-jwt-token-' + Date.now(),
      user: { id: user.id, email: user.email, role: user.role }
    });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// ============ DASHBOARD API ============
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalWorkOrders: workOrders.length,
    inProgress: workOrders.filter(o => o.status === 'in_progress').length,
    completed: workOrders.filter(o => o.status === 'completed').length,
    overdue: 3,
    pendingOrders: workOrders.filter(o => o.status === 'pending')
  });
});

// ============ WORK ORDERS API ============
app.get('/api/work-orders', (req, res) => {
  res.json(workOrders);
});

app.post('/api/work-orders', (req, res) => {
  const newOrder = {
    id: String(workOrders.length + 1),
    number: `WO-${String(workOrders.length + 1).padStart(3, '0')}`,
    ...req.body,
    status: 'pending'
  };
  workOrders.push(newOrder);
  res.json(newOrder);
});

app.patch('/api/work-orders/:id/status', (req, res) => {
  const order = workOrders.find(o => o.id === req.params.id);
  if (order) {
    order.status = req.body.status;
    res.json(order);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// ============ ASSETS API ============
app.get('/api/assets', (req, res) => {
  res.json(assets);
});

app.post('/api/assets', (req, res) => {
  const newAsset = { id: String(assets.length + 1), ...req.body };
  assets.push(newAsset);
  res.json(newAsset);
});

// ============ TEAMS API ============
app.get('/api/teams', (req, res) => {
  res.json(teams);
});

app.post('/api/teams', (req, res) => {
  const newTeam = { id: String(teams.length + 1), ...req.body };
  teams.push(newTeam);
  res.json(newTeam);
});

// ============ REPORTS API ============
app.get('/api/reports/maintenance-history', (req, res) => {
  res.json({ total: workOrders.length, critical: 2, high: 5, medium: 12, low: 9 });
});

app.get('/api/reports/cost-analysis', (req, res) => {
  res.json({ totalCost: 45230, labor: 18500, parts: 15230, materials: 11500 });
});

app.get('/api/reports/equipment-status', (req, res) => {
  res.json(assets);
});

app.get('/api/reports/team-performance', (req, res) => {
  res.json(teams);
});

// Test Route
app.get('/api', (req, res) => {
  res.json({ message: '✅ API ระบบซ่อมบำรุงทำงานได้แล้ว!' });
});

// Serve index.html สำหรับทุก route ที่ไม่ใช่ API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});