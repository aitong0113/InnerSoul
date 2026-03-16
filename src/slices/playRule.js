import { useDispatch } from "react-redux";
import { pause } from "../slices/playerSlice";
import { useNavigate } from "react-router-dom";
import { authStore } from "../services/auth/authStore";
import Swal from "sweetalert2";

export default function usePlayRule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async (index) => {
    const plan = authStore.getUserPlan() || "free";
    const FREE_PLAY_LIMIT = 3;

    if (plan !== "pro" && index >= FREE_PLAY_LIMIT) {
      dispatch(pause());

      const result = await Swal.fire({
        icon: "info",
        title: "試聽限制",
        text: "這份陪伴暫僅開放前三首試聽，升級訂閱即可完整聆聽。",
        confirmButtonText: "升級方案",
        showCancelButton: true,
        cancelButtonText: "稍後再說",
        confirmButtonColor: "#6C8E9E",
      });

      if (result.isConfirmed) {
        navigate("/subscription");
      }

      return false;
    }

    return true;
  };
}
