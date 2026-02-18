import { useDispatch } from "react-redux";
import { pause } from "../slices/playerSlice";
import { useNavigate } from "react-router-dom";
import { authStore } from "../services/auth/authStore";

export default function usePlayRule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (index) => {
    const plan = authStore.getUserPlan() || "free";
    const FREE_PLAY_LIMIT = 3;

    if (plan !== "pro" && index >= FREE_PLAY_LIMIT) {
      dispatch(pause());
      const confirmed = window.confirm("這份陪伴暫僅開放前三首試聽，升級訂閱即可完整聆聽。");
      if (confirmed) {
        navigate("/subscription");
      }
      return false;
    }
    return true;
  };
}
