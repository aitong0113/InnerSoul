import { authStore } from "../../services/auth/authStore";
import { getUserAvatar } from "../../helpers/userAvatar";
import "./UserProfile.scss";

/**
 * 可重用的使用者資訊元件
 * @param {object} props
 * @param {string} props.variant - 顯示變體 ("header" | "card")
 * @param {string} props.className - 額外的 CSS 類別
 */
function UserProfile({ variant = "header", className = "" }) {
    const userName = authStore.getUserName();
    const userImgKey = authStore.getUserImg();
    const userPlan = authStore.getUserPlan();

    const avatarSrc = getUserAvatar(userImgKey);

    // 根據方案類型顯示方案名稱
    const getPlanDisplayName = () => {
        if (userPlan === "pro") {
            return "深度方案";
        }
        return "免費";
    };

    return (
        <div className={`user-profile user-profile--${variant} ${className}`}>
            <img
                className="user-profile__avatar"
                src={avatarSrc}
                alt={`${userName || "會員"} 的頭像`}
            />
            <div className="user-profile__info">
                <span className="user-profile__name">{userName || "會員"}</span>
                {variant === "header" && (
                    <span className={`user-profile__plan user-profile__plan--${userPlan || "free"}`}>
                        {getPlanDisplayName()}
                    </span>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
