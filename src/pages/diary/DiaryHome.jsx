import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DiaryLayout from "../../components/features/diary/DiaryLayout.jsx";
import api from "../../services/api.js";
import { MOODS } from "../../constants/moods.js";
import { authStore } from "../../services/auth/authStore.js";
import EmptyDiaryState from "../../components/features/diary/state/EmptyDiaryState.jsx";
import SubscribeNotice from "../../components/features/diary/state/SubscribeNotice.jsx";
import DiaryWriteBlocked from "../../components/features/diary/state/DiaryWriteBlocked.jsx";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const DiaryHome = () => {
  const MONTH_SHORT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const WEEKDAYS = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
  const moodDict = MOODS.reduce((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {});

  const calendar = (year, month, moodMap) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    const startWeekday = firstDay.getDay();
    const weeks = [];
    let week = [];
    for (let i = 0; i < startWeekday; i++) {
      week.push({ date: null });
    }
    for (let day = 1; day <= lastDay; day++) {
      week.push({
        date: day,
        mood: moodMap[day] ?? null,
      });

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ date: null });
      }
      weeks.push(week);
    }
    while (weeks.length < 6) {
      weeks.push(Array.from({ length: 7 }, () => ({ date: null })));
    }
    return weeks;
  };

  const pad2 = (n) => String(n).padStart(2, "0");
  const ymdKey = (year, month, day) => {
    return `${year}-${pad2(month + 1)}-${pad2(day)}`;
  };
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(today.getDate())}`;

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [moodByDay, setMoodByDay] = useState({});
  const [selectedKey, setSelectedKey] = useState(todayKey);
  const weeks = calendar(year, month, moodByDay);
  const yearMonth = `${year} ${MONTH_SHORT[month]}`;

  const onSelectDate = (cell) => {
    if (!cell?.date) return;
    const key = ymdKey(year, month, cell.date);
    setSelectedKey(key);
  };
  const dateObj = new Date(selectedKey);
  const displayDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
  const weekday = WEEKDAYS[dateObj.getDay()];
  const selectedDay =
    dateObj.getFullYear() === year && dateObj.getMonth() === month ? dateObj.getDate() : null;
  const isFutureSelected = selectedKey > todayKey;

  const onPrevMonth = () => {
    const d = new Date(year, month - 1, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  const onNextMonth = () => {
    const d = new Date(year, month + 1, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasDiary = !!diary;
  const userId = authStore.getUserId();
  const [diaryCount, setDiaryCount] = useState(0);
  const plan = authStore.getUserPlan();
  const isFree = plan === "free";
  const isLimited = diaryCount >= 3;
  const showSubscribe = isFree && isLimited && !hasDiary && !isFutureSelected;

  useEffect(() => {
    const fetchMonthMood = async () => {
      if (!userId) return;

      const start = `${year}-${pad2(month + 1)}-01`;
      const lastDay = new Date(year, month + 1, 0).getDate();
      const end = `${year}-${pad2(month + 1)}-${pad2(lastDay)}`;
      try {
        const res = await api.get(
          `/diaries?userId=${userId}&diaryDate_gte=${start}&diaryDate_lte=${end}`
        );

        const map = {};
        for (const d of res.data || []) {
          const dayNum = Number(String(d.diaryDate).slice(8, 10));
          map[dayNum] = d.mood;
        }
        setMoodByDay(map);
      } catch (err) {
        console.error("讀取當月心情失敗", err);
        setMoodByDay({});
      }
    };

    fetchMonthMood();
  }, [userId, year, month]);

  useEffect(() => {
    const fetchDiary = async () => {
      if (!userId || !selectedKey) return;

      if (selectedDay > todayKey) {
        setDiary(null);
        return;
      }

      setLoading(true);

      try {
        const res = await api.get(`/diaries?userId=${userId}&diaryDate=${selectedKey}`);
        setDiary(res.data[0] || null);
      } catch (err) {
        console.error("讀取日記失敗", err);
        setDiary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [userId, selectedKey, selectedDay, todayKey]);

  useEffect(() => {
    const fetchDiaryCount = async () => {
      if (!userId) return;
      try {
        const res = await api.get(`/diaries?userId=${userId}`);
        setDiaryCount(Array.isArray(res.data) ? res.data.length : 0);
      } catch (err) {
        console.error("讀取日記數量失敗", err);
        setDiaryCount(0);
      }
    };
    fetchDiaryCount();
  }, [userId]);

  const renderMood = (moodId) => {
    const key = String(moodId).toLowerCase();
    const mood = moodDict[key];
    if (!mood) return null;
    return <img src={mood.icon} alt={mood.chName} />;
  };
  const deleteDiary = async () => {
    if (!userId) {
      alert("請先登入");
      return;
    }

    const confirm = () => {
      confirm("確定要刪除這篇日記嗎？");
    };
    if (!confirm) return;

    try {
      await api.delete(`/diaries/${diary.id}`);
      setDiary(null);

      const dayNum = new Date(selectedKey).getDate();
      setMoodByDay((prev) => {
        const next = { ...prev };
        delete next[dayNum];
        return next;
      });

      setDiaryCount((c) => Math.max(0, c - 1));

      alert("已刪除");
    } catch (err) {
      console.error("刪除失敗", err);
      alert("刪除失敗");
    }
  };

  return (
    <main className="bg-liner pt-8 pb-12">
      <DiaryLayout
        year_month={yearMonth}
        weeks={weeks}
        renderMood={renderMood}
        diaryMood={diary?.mood ?? null}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onSelectDate={onSelectDate}
        selectedDay={selectedDay}
        diaryDate={displayDate}
        weekday={weekday}
        diaryTitle={hasDiary ? diary?.diaryTitle || "" : ""}
        diaryContent={
          hasDiary ? (
            diary?.diaryContent || ""
          ) : isFutureSelected ? (
            <DiaryWriteBlocked />
          ) : showSubscribe ? (
            <SubscribeNotice to={`/subscription`} />
          ) : (
            <EmptyDiaryState to={`/diary/edit/${selectedKey}`} />
          )
        }
        diaryImg={diary?.diaryImg}
        loading={loading}
        footer={
          hasDiary ? (
            <div className="d-flex justify-content-between">
              <div>
                <button
                  type="button"
                  className="btn btn-outline fs-md-5 fs-6"
                  onClick={deleteDiary}
                >
                  刪除
                </button>
              </div>
              <div>
                <Link to={`/diary/edit/${selectedKey}`} className="btn btn-filled fs-md-5 fs-6">
                  編輯
                </Link>
              </div>
            </div>
          ) : (
            ""
          )
        }
      />
    </main>
  );
};

export default DiaryHome;
