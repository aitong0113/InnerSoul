// src/components/layout/FrontLayout.jsx
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function FrontLayout() {
  return (
    <>
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
