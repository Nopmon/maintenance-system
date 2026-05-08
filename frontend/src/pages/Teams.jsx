import { useState, useEffect } from 'react';
import { teamsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Teams.css';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await teamsAPI.getAll();
      setTeams(res.data);
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
      <div className="teams-container">
        <h1>👥 จัดการทีม</h1>

        <div className="teams-grid">
          {teams.map(team => (
            <div key={team.id} className="team-card">
              <h3>🏢 {team.name}</h3>
              <p>{team.description}</p>
              <p><strong>หัวหน้าทีม:</strong> {team.leader}</p>
              <p><strong>จำนวนสมาชิก:</strong> {team.memberCount}</p>
              <p><strong>งานที่เสร็จ:</strong> {team.completedTasks}</p>
              <button className="btn-small">จัดการทีม</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}