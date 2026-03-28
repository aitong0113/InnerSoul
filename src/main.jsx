import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap";
import "./assets/style/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Swal from "sweetalert2";

window.alert = (message) => {
  let icon = "info";
  let timer = 2000; // 預設 2 秒

  if (message.includes("成功")) {
    icon = "success";
    timer = 2000;
  } else if (message.includes("失敗") || message.includes("錯誤")) {
    icon = "error";
    timer = null; // 錯誤不自動關
  }

  Swal.fire({
    icon,
    title: message,
    confirmButtonText: timer ? undefined : "確定",
    confirmButtonColor: "#104754",
    background: "#f8fcff",
    color: "#104754",
    timer,
    timerProgressBar: timer ? true : false,
    showConfirmButton: timer ? false : true,

    customClass: {
      popup: "custom-swal-radius",
      confirmButton: "custom-swal-btn",
    },
    buttonsStyling: false,
  });
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </StrictMode>
  </StrictMode>
);
