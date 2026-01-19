import { useState } from "react";
import { Link } from "react-router-dom";
import DiaryLayout from "../../components/features/diary/DiaryLayout.jsx";

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
    return weeks;
  };
  const moodMap = {
    3: "happy",
    6: "sad",
    12: "angry",
  };

  const today = new Date();
  const pad2 = (n) => String(n).padStart(2, "0");
  const ymdKey = (year, month, day) => {
    return `${year}/${pad2(month + 1)}/${pad2(day)}`;
  };
  const todayKey = `${today.getFullYear()}/${pad2(
    today.getMonth() + 1,
  )}/${pad2(today.getDate())}`;

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedKey, setSelectedKey] = useState(todayKey);
  const weeks = calendar(year, month, moodMap);
  const yearMonth = `${year} ${MONTH_SHORT[month]}`;

  const onSelectDate = (cell) => {
    if (!cell?.date) return;
    const key = ymdKey(year, month, cell.date);
    setSelectedKey(key);
  };

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

  return (
    <main className="bg-BG-01 pt-8 pb-12">
      <DiaryLayout
        year_month={yearMonth}
        weeks={weeks}
        // renderMood={renderMood}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onSelectDate={onSelectDate}
        diaryDate={selectedKey || todayKey}
        diaryTitle="今天的步伐有點慢，但沒關係"
        diaryContent={`最近好像有點累，連呼吸都慢了半拍。
    不是討厭現在的生活，而是有些事情還沒想清楚，情緒在心裡輕輕敲了一整天。
       我知道自己已經努力了，但偶爾還是會覺得「不夠好」。
           今天沒有逼自己想通，也沒有逼自己堅強。
           我只是靜靜坐，把那些還沒整理好的心情放下來。`}
        diaryImg="https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        footer={
          <Link to="/diary/edit" className="btn btn-primary-05">
            編輯
          </Link>
        }
      />
    </main>
  );
};

export default DiaryHome;
