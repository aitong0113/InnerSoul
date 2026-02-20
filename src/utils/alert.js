import Swal from "sweetalert2";

/**
 * 成功提示
 */
export const showSuccess = (title, text = "") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "確定",
    confirmButtonColor: "#104754",
    background: "#f8fcff",
    color: "#104754",
  });
};

/**
 * 錯誤提示
 */
export const showError = (title, text = "") => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "知道了",
    confirmButtonColor: "#104754",
    background: "#f8fcff",
    color: "#104754",
  });
};

/**
 * 提示訊息
 */
export const showInfo = (title, text = "") => {
  return Swal.fire({
    icon: "info",
    title,
    text,
    confirmButtonText: "確定",
    confirmButtonColor: "#104754",
    background: "#f8fcff",
    color: "#104754",
  });
};
