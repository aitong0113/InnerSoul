import "./users.scss";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/adminApi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <p>載入中...</p>;
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Users</h1>
        <p className="subtitle">使用者管理</p>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>使用者</th>
              <th>Email</th>
              <th>方案</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div className="user-cell">
                    <img src={user.userImg} alt={user.userName} />
                    <span className="name">{user.userName}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`plan-badge ${user.plan}`}>{user.plan.toUpperCase()}</span>
                </td>
                <td>
                  <button className="action-btn">查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
