import "./dashboard.scss";
import { useEffect, useMemo, useState } from "react";
import { getUsers, getDiaries } from "../../services/adminApi";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, diaryRes] = await Promise.all([getUsers(), getDiaries()]);
        setUsers(userRes.data);
        setDiaries(diaryRes.data);
      } catch (err) {
        console.error("資料載入失敗", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ---------- KPI 計算 ---------- */
  const totalUsers = users.length;
  const totalDiaries = diaries.length;
  const proUsers = users.filter((u) => u.plan === "pro").length;

  const today = new Date().toISOString().slice(0, 10);
  const todayUsers = users.filter((u) => u.createdAt && u.createdAt.slice(0, 10) === today).length;

  /* ---------- 最近活動 ---------- */
  const recentActivities = useMemo(() => {
    const userActivities = users.map((u) => ({
      text: `新使用者註冊 @${u.userName}`,
      time: u.createdAt || "",
    }));

    const diaryActivities = diaries.map((d) => ({
      text: `新增日記「${d.diaryTitle}」`,
      time: d.createdAt || "",
    }));

    return [...userActivities, ...diaryActivities]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5);
  }, [users, diaries]);

  if (loading) return <p>載入中...</p>;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">後台數據總覽</p>

      {/* KPI */}
      <section className="dashboard-cards">
        <KpiCard title="使用者總數" value={totalUsers} />
        <KpiCard title="今日新增" value={todayUsers} />
        <KpiCard title="日記總數" value={totalDiaries} />
        <KpiCard title="訂閱用戶" value={proUsers} />
      </section>

      {/* 播放量總覽 */}
      <section className="dashboard-section">
        <div className="dashboard-panel">
          <h2>播放量總覽</h2>

          <div className="play-stats">
            <div className="play-item">
              <p className="label">今日播放</p>
              <p className="value">128</p>
            </div>

            <div className="play-item">
              <p className="label">近 7 天播放</p>
              <p className="value">1,024</p>
            </div>

            <div className="play-item">
              <p className="label">總播放次數</p>
              <p className="value highlight">5,842</p>
            </div>
          </div>
        </div>
      </section>

      {/* 訂閱比例 */}
      <section className="dashboard-section">
        <div className="chart-card">
          <h3>訂閱用戶比例</h3>

          <div className="donut-chart">
            <div
              className="donut"
              style={{
                background: `conic-gradient(
                  #5b8def ${(proUsers / totalUsers) * 100}%,
                  #e5e7eb 0
                )`,
              }}
            >
              <span>{Math.round((proUsers / totalUsers) * 100)}%</span>
            </div>
            <p>訂閱中用戶</p>
          </div>
        </div>
      </section>

      {/* 最近活動 */}
      <section className="dashboard-section">
        <h2>最近系統活動</h2>
        <div className="dashboard-panel">
          <ul className="activity-list">
            {recentActivities.map((a, i) => (
              <li key={i}>{a.text}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ---------- 小元件 ---------- */
function KpiCard({ title, value }) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p className="value">{value}</p>
    </div>
  );
}
