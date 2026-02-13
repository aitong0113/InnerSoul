// src/pages/Member/MemberAccountEdit.jsx
import "./MemberAccountEdit.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAvatar } from "../../helpers/userAvatar";
import { authStore } from "../../services/auth/authStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MemberAccountEdit() {
  const navigate = useNavigate();
  /* ========= 基本狀態 ========= */
  const [isEdit, setIsEdit] = useState(false);
  const [isPhoneBound, setIsPhoneBound] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const userName = authStore.getUserName();
  const userPlan = authStore.getUserPlan();
  const avatarSrc = getUserAvatar(authStore.getUserImg());
  /* ========= 模擬 API 原始資料 ========= */
  const [originData, setOriginData] = useState({
    gender: "女",
    birthday: "2026-02-19",
    email: "mail@example.com",
    phone: "0900-000-000",
    password: "12345678",
  });
  /* ========= 編輯中的草稿 ========= */
  const [editData, setEditData] = useState(originData);

  /* ========= handlers ========= */

  const updateField = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const handleEdit = () => {
    setEditData(originData); // 進入編輯時同步
    setIsEdit(true);
  };

  const handleCancel = () => {
    setEditData(originData); // 還原
    setIsEdit(false);
  };

  const handleConfirm = () => {
    // TODO: 之後在這裡送 API
    setOriginData(editData); // 真正儲存
    setIsEdit(false);
  };

  /* ========= render ========= */
  return (
    <section className="member-edit bg-sky-gradient">
      <div className="container">
        <div className="row align-items-start">
          {/* 左側：使用者資訊 */}
          <div className="col-md-4 d-flex justify-content-center">
            <div className="member-profile text-center">
              <img className="avatar" src={avatarSrc} alt="avatar" />

              <div className="username">{userName || "心途旅人"}</div>

              <div className="plan">
                目前方案｜
                {userPlan === "pro" ? "深度方案" : userPlan === "free" ? "輕量體驗" : "未訂閱"}
              </div>

              <button className="btn-manage" onClick={() => navigate("/subscription")}>
                管理方案 →
              </button>
            </div>
          </div>

          {/* 右側：表單 */}
          <div className="col-md-8">
            <div className="member-form-card">
              <form className="member-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>性別</label>
                  <select
                    className="member-input"
                    disabled={!isEdit}
                    value={editData.gender}
                    onChange={(e) => updateField("gender", e.target.value)}
                  >
                    <option>女</option>
                    <option>男</option>
                    <option>不提供</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>生日</label>

                  <DatePicker
                    selected={editData.birthday ? new Date(editData.birthday) : null}
                    onChange={(date) => {
                      updateField("birthday", date ? date.toISOString().slice(0, 10) : "");
                    }}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="年 / 月 / 日"
                    disabled={!isEdit}
                    calendarClassName="inner-datepicker"
                    wrapperClassName="datepicker-wrapper"
                    popperPlacement="bottom-start"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="member-input"
                    value={editData.email}
                    readOnly
                    disabled={!isEdit}
                  />
                </div>

                {/* 手機 + 解除綁定 */}
                <div className="form-group phone-field">
                  <label>手機</label>
                  <div className="phone-row">
                    <input
                      type="text"
                      className="member-input"
                      value="0900-000-000"
                      disabled={!isEdit}
                    />
                    {isEdit && (
                      <button
                        type="button"
                        className={`btn-unbind ${isPhoneBound ? "bound" : "unbound"}`}
                        onClick={() => setIsPhoneBound(!isPhoneBound)}
                      >
                        {isPhoneBound ? "解除綁定" : "綁定"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="form-group password-field">
                  <label>密碼</label>

                  <div className="password-row">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="member-input"
                      value="12345678"
                      disabled={!isEdit}
                      readOnly={!isEdit}
                    />

                    <button
                      type="button"
                      className="password-eye"
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={!isEdit}
                      aria-label="切換密碼顯示"
                    >
                      {showPassword ? (
                        /* eye */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icon-tabler-eye"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                      ) : (
                        /* eye-off */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icon-tabler-eye-off"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                          <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                          <path d="M3 3l18 18" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* 按鈕列 */}
                {isEdit ? (
                  <div className="action-row">
                    {/* 取消：只離開編輯狀態 */}
                    <button type="button" className="btn-cancel" onClick={handleCancel}>
                      取消
                    </button>

                    {/* 確定：之後這裡再接 API */}
                    <button type="button" className="btn-confirm" onClick={handleConfirm}>
                      確定
                    </button>
                  </div>
                ) : (
                  <div className="action-row single">
                    <button type="button" className="btn-confirm" onClick={handleEdit}>
                      編輯
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
