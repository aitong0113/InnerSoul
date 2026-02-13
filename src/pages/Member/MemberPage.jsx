import "./MemberPage.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconRotateClockwise,
  IconPencil,
  IconPlayerPlay,
  IconHeart,
  IconChevronRight,
} from "@tabler/icons-react";
import { getMoodText } from "../../components/features/homeMoodText/getMoodText";
import { authStore } from "../../services/auth/authStore";
import { getUserDiaries, getUserPlaylists } from "../../services/member.service";
import { getUserAvatar } from "../../helpers/userAvatar";
import FavoritesPage from "./FavoritesPage";
import PlaylistsPage from "./PlaylistsPage";

// 匯入心情圖片
import happyImg from "../../assets/moodStamp/happy.png";
import goodImg from "../../assets/moodStamp/good.png";
import notGoodImg from "../../assets/moodStamp/notGood.png";
import sadImg from "../../assets/moodStamp/sad.png";
import madImg from "../../assets/moodStamp/mad.png";

import messyImg from "../../assets/moodStamp/messy.png";


const moodConfig = {
  happy: { emoji: "😊", name: "喜悅", img: happyImg },
  good: { emoji: "🙂", name: "平靜", img: goodImg },
  notgood: { emoji: "😔", name: "混亂", img: notGoodImg },
  sad: { emoji: "😢", name: "低落", img: sadImg },
  mad: { emoji: "😠", name: "憤怒", img: madImg },
  messy: { emoji: "😵‍💫", name: "混亂", img: messyImg },
};

function MemberPage({ selectPlaylist }) {
  const navigate = useNavigate();

  // 原有狀態
  const [text, setText] = useState(getMoodText());
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [activeTab, setActiveTab] = useState("member");
  const [isFading, setIsFading] = useState(false);

  // 新增狀態
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [diaries, setDiaries] = useState([]);
  const [diaryStats, setDiaryStats] = useState({
    checkInRate: 0,
    moodStats: [],
    topMood: null,
    totalDiaries: 0,
  });
  const [userStats, setUserStats] = useState({
    playlistCount: 0,
    totalHours: 9420, // 暫時保持靜態
  });

  const userName = authStore.getUserName();
  const userId = authStore.getUserId();
  const userImgKey = authStore.getUserImg();
  const userPlan = authStore.getUserPlan();

  const avatarSrc = getUserAvatar(userImgKey);

  // Audio Ref
  const audioRef = useRef(null);

  // 檢查登入狀態
  useEffect(() => {
    if (!authStore.isLoggedIn()) {
      navigate("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [navigate]);

  // 獲取數據
  useEffect(() => {
    if (!isCheckingAuth && userId) {
      fetchUserData();
    }
  }, [isCheckingAuth, userId]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // 獲取日記和播放清單
      const [diariesData, playlistsData] = await Promise.all([
        getUserDiaries(userId),
        getUserPlaylists(userId),
      ]);

      setDiaries(diariesData);
      setUserStats((prev) => ({
        ...prev,
        playlistCount: playlistsData.length,
      }));

      // 計算日記統計
      const stats = calculateMonthlyStats(diariesData);
      setDiaryStats(stats);
    } catch (err) {
      console.error("獲取用戶數據失敗", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 計算本月統計
  const calculateMonthlyStats = (diariesData) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();

    // 篩選本月日記
    const monthlyDiaries = diariesData.filter((diary) => {
      const diaryDate = new Date(diary.diaryDate);
      return diaryDate.getFullYear() === year && diaryDate.getMonth() + 1 === month;
    });

    // 計算打卡率
    const checkInRate =
      monthlyDiaries.length > 0 ? Math.round((monthlyDiaries.length / daysInMonth) * 100) : 0;

    // 統計表情符號
    const moodCounts = {};
    monthlyDiaries.forEach((diary) => {
      const mood = diary.mood;
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    // 計算百分比
    const total = monthlyDiaries.length || 1;
    const moodStats = Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      percentage: Math.round((count / total) * 100),
    }));

    // 找出最常用的表情
    const topMood = moodStats.reduce(
      (max, current) => (current.count > (max?.count || 0) ? current : max),
      null
    );

    return {
      checkInRate,
      moodStats,
      topMood,
      totalDiaries: diariesData.length,
    };
  };

  const handleChangeMood = () => {
    if (isDisabled) return;

    setIsDisabled(true);
    setIsRotating(true);
    setIsFading(true);

    setTimeout(() => {
      setText(getMoodText());
      setIsFading(false);
    }, 300);

    setTimeout(() => {
      setIsRotating(false);
      setIsDisabled(false);
    }, 600);
  };

  // 播放音訊
  const playAudio = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  // 檢查登入中
  if (isCheckingAuth) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">檢查登入狀態...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="member-page ">
      {/* 頂部頁籤 */}
      <nav className="member-tabs">
        <button
          className={activeTab === "member" ? "active" : ""}
          onClick={() => setActiveTab("member")}
        >
          心途會員
        </button>
        <button
          className={activeTab === "favorite" ? "active" : ""}
          onClick={() => setActiveTab("favorite")}
        >
          語音收藏
        </button>
        <button
          className={activeTab === "playlist" ? "active" : ""}
          onClick={() => setActiveTab("playlist")}
        >
          播放清單
        </button>
      </nav>

      {activeTab === "member" && (
        <>
          {/* 會員卡片 */}
          <section className="member-card">
            <img className="avatar" src={avatarSrc} alt={`${userName || "會員"} 的頭像`} />
            <div className="info">
              <h5>
                你好,{userName || "會員"}
                <button
                  className="edit-btn"
                  onClick={() => navigate("/member-account-edit")}
                  style={{ border: "none", outline: "none" }}
                >
                  <IconPencil size={16} />
                </button>
              </h5>
              <div className="quote-row">
                <p className={`quote ${isFading ? "fade-out" : "fade-in"}`}>{text}</p>
                <button className="refresh-btn" onClick={handleChangeMood} disabled={isDisabled}>
                  <IconRotateClockwise size={18} className={isRotating ? "rotate-once" : ""} />
                </button>
              </div>
            </div>
            <div className="plan-actions">
              <div className="plan-container">
                <div className="plan-labels">
                  <span className="current-plan-label">目前方案</span>
                  <span className="plan-name">{userPlan === "pro" ? "深度方案" : userPlan === "free" ? "輕量體驗" : "未訂閱"}</span>
                </div>
                <button
                  className="upgrade-plan-btn"
                  onClick={() => navigate("/subscription")}
                  aria-label="升級方案"
                >
                  <IconChevronRight size={22} />
                </button>
              </div>
            </div>
          </section>

          {isLoading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">載入中...</span>
              </div>
            </div>
          ) : (
            <>
              {/* 本月回顧 */}
              <section className="month-review">
                <h3>讓我們一起回顧本月心情點滴吧</h3>
                <div className="review-grid">
                  <div className="review-card">
                    <div className="month-title">{new Date().getMonth() + 1} 月</div>
                    <div className="check-in-rate">心情打卡率 {diaryStats.checkInRate}%</div>

                    {/* 心情統計列表 */}
                    <div className="mood-stats-grid">
                      {Object.entries(moodConfig).map(([moodKey, moodData]) => {
                        const stat = diaryStats.moodStats.find((s) => s.mood === moodKey);
                        const percentage = stat ? stat.percentage : 0;
                        return (
                          <div key={moodKey} className="mood-stat-item">
                            <img
                              src={moodData.img}
                              alt={moodData.name}
                              className="mood-icon fixed"
                              
                            />
                            <div className="mood-info">
                              <div className="mood-percentage">{percentage}%</div>
                              <div className="mood-name">{moodData.name}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="review-card right">
                    <div className="mood-visual-panel layered">
                      {Object.entries(moodConfig)
                        .map(([moodKey, moodData]) => {
                          const stat = diaryStats.moodStats.find((s) => s.mood === moodKey);
                          const percentage = stat ? stat.percentage : 0;
                          return {
                            moodKey,
                            moodData,
                            percentage
                          };
                        })
                        .filter(item => item.percentage > 0) // 0% 不顯示
                        .sort((a, b) => b.percentage - a.percentage) // 權重排序
                        .map((item, index) => {
                          const { moodKey, moodData, percentage } = item;

                          // 主 / 次 / 邊緣層級
                          let layer = "minor";
                          if (index === 0) layer = "main";
                          else if (index <= 2) layer = "secondary";
                          else layer = "minor";

                          return (
                            <img
                              key={moodKey}
                              src={moodData.img}
                              alt={moodData.name}
                              className={`mood-icon dynamic ${layer}`}
                              style={{
                                "--scale": `${1 + (percentage * 0.4) / 100}`
                              }}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
              </section>

              {/* 情緒推薦 */}
              {diaryStats.topMood && (
                <section className="emotion-block">
                  <p className="emotion-title">
                    這個月你按下了 {diaryStats.topMood.percentage}% 的{" "}
                    <img
                      src={moodConfig[diaryStats.topMood.mood]?.img}
                      alt=""
                      className="inline-mood-icon"
                    />{" "}
                    {moodConfig[diaryStats.topMood.mood]?.name}
                  </p>
                  <p className="emotion-subtitle">要不要聽些放鬆的聲音陪伴你呢？</p>

                  <div className="emotion-content">
                    <div className="emotion-cloud-wrapper">
                      <div className="emotion-cloud">
                        <img src={`${import.meta.env.BASE_URL}Union.png`} alt="雲朵" className="cloud-bg" />
                        <div className="cloud-text">
                          {moodConfig[diaryStats.topMood.mood]?.name}
                        </div>
                      </div>
                      <div className="cloud-footer">
                        <span className="audio-count">17 則語音</span>
                        <button className="play-all-btn">
                          <IconPlayerPlay size={20} fill="currentColor" />
                        </button>
                      </div>
                    </div>

                    <div className="playlist-section">
                      <ul className="playlist-items">
                        <li className="playlist-item">
                          <div className="song-info">
                            <span className="music-icon">🎵</span>
                            <span className="mood-tag">喜悅</span>
                            <span className="song-title">歌頌時光</span>
                          </div>
                          <div className="song-actions">
                            <button className="heart-btn">
                              <IconHeart size={18} />
                            </button>
                            <button className="play-btn" onClick={() => playAudio(item.audioUrl)}>
                              {/* 請替換 undefined 為正確的 audioUrl */}
                              <IconPlayerPlay size={18} fill="currentColor" />
                            </button>
                          </div>
                        </li>
                        <li className="playlist-item highlighted">
                          <div className="song-info">
                            <span className="music-icon">🎵</span>
                            <span className="mood-tag">喜悅</span>
                            <span className="song-title">歡欣鼓舞</span>
                          </div>
                          <div className="song-actions">
                            <button className="edit-btn">
                              <IconPencil size={18} />
                            </button>
                            <button className="heart-btn filled">
                              <IconHeart size={18} fill="currentColor" />
                            </button>
                            <button className="pause-btn">⏸</button>
                          </div>
                        </li>
                        <li className="playlist-item">
                          <div className="song-info">
                            <span className="music-icon">🎵</span>
                            <span className="mood-tag">喜悅</span>
                            <span className="song-title">早晨的第一一縷陽光</span>
                          </div>
                          <div className="song-actions">
                            <button className="heart-btn">
                              <IconHeart size={18} />
                            </button>
                            <button className="play-btn" onClick={() => playAudio(item.audioUrl)}>
                              <IconPlayerPlay size={18} fill="currentColor" />
                            </button>
                          </div>
                        </li>
                        <li className="playlist-item">
                          <div className="song-info">
                            <span className="music-icon">🎵</span>
                            <span className="mood-tag">喜悅</span>
                            <span className="song-title">省道的步伐</span>
                          </div>
                          <div className="song-actions">
                            <button className="heart-btn">
                              <IconHeart size={18} />
                            </button>
                            <button className="play-btn" onClick={() => playAudio(item.audioUrl)}>
                              <IconPlayerPlay size={18} fill="currentColor" />
                            </button>
                          </div>
                        </li>
                        <li className="playlist-item">
                          <div className="song-info">
                            <span className="music-icon">🎵</span>
                            <span className="mood-tag">喜悅</span>
                            <span className="song-title">靜謐的咖啡</span>
                          </div>
                          <div className="song-actions">
                            <button className="heart-btn">
                              <IconHeart size={18} />
                            </button>
                            <button className="play-btn" onClick={() => playAudio(item.audioUrl)}>
                              <IconPlayerPlay size={18} fill="currentColor" />
                            </button>
                          </div>
                        </li>
                        <li className="playlist-item">
                          <div className="song-info">
                            <span className="music-icon">🎵</span>
                            <span className="mood-tag">喜悅</span>
                            <span className="song-title">陽關的午後</span>
                          </div>
                          <div className="song-actions">
                            <button className="heart-btn">
                              <IconHeart size={18} />
                            </button>
                            <button className="play-btn" onClick={() => playAudio(item.audioUrl)}>
                              <IconPlayerPlay size={18} fill="currentColor" />
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* 底部統計 */}
              <section className="member-stats">
                <div className="stat-card">
                  <div className="stat-header">心途陪伴你你多久了？</div>
                  <div className="stat-number">{userStats.totalHours.toLocaleString()}</div>
                  <div className="stat-unit">小時</div>
                  <div className="stat-description">辛苦你這麼用心在守護身邊</div>
                  <button className="stat-button" onClick={()=>setActiveTab("favorite")}>語音收藏 →</button>
                </div>
                <div className="stat-card">
                  <div className="stat-header">不同情境你陪伴了？</div>
                  <div className="stat-number">{userStats.playlistCount}</div>
                  <div className="stat-unit">首播放清單</div>
                  <div className="stat-description">播放清單將會與音檔互相連結</div>
                  <button className="stat-button" onClick={()=>setActiveTab("playlist")}>播放清單 →</button>
                </div>
                <div className="stat-card">
                  <div className="stat-header">你在心途日記寫了？</div>
                  <div className="stat-number">{diaryStats.totalDiaries}</div>
                  <div className="stat-unit">篇日記</div>
                  <div className="stat-description">今天的心情也寫了嗎？</div>
                  <button className="stat-button" onClick={()=>navigate("/diary")}>我的日記 →</button>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {activeTab === "favorite" && <FavoritesPage selectPlaylist={selectPlaylist} />}
      {activeTab === "playlist" && <PlaylistsPage selectPlaylist={selectPlaylist} />}
      <audio ref={audioRef} />
    </main>
  );
}
export default MemberPage;
