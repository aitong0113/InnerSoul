import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import "./admin-layout.scss";

export default function AdminLayout() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div>
          <h2 className="admin-logo">Inner Soul</h2>

          <nav className="admin-nav">
            <NavLink to="/admin" end className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
              Dashboard
            </NavLink>

            <NavLink to="/admin/users" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
              Users
            </NavLink>
          </nav>
        </div>

        <div className="admin-logout">
          <button onClick={handleLogout}>登出</button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
