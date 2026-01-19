import happyStamp from "../../../assets/moodStamp/happy.png";
import goodStamp from "../../../assets/moodStamp/good.png";
import madStamp from "../../../assets/moodStamp/mad.png";
import notGoodStamp from "../../../assets/moodStamp/notGood.png";
import sadStamp from "../../../assets/moodStamp/sad.png";
import { ROUTES } from "../../../constants/routes";
import { Link } from "react-router-dom";
import DiaryLayout from "../diary/DiaryLayout";

const HomeDiary = () => {
  const weeks = [
    [
      { date: 1, mood: null },
      { date: 2, mood: null },
      { date: 3, mood: null },
      { date: 4, mood: null },
      { date: 5, mood: null },
      { date: 6, mood: "notGood" },
      { date: 7, mood: null },
    ],
    [
      { date: 8, mood: null },
      { date: 9, mood: null },
      { date: 10, mood: "good" },
      { date: 11, mood: null },
      { date: 12, mood: null },
      { date: 13, mood: null },
      { date: 14, mood: null },
    ],
    [
      { date: 15, mood: null },
      { date: 16, mood: "happy" },
      { date: 17, mood: null },
      { date: 18, mood: null },
      { date: 19, mood: null },
      { date: 20, mood: "mad" },
      { date: 21, mood: null },
    ],
    [
      { date: 22, mood: null },
      { date: 23, mood: null },
      { date: 24, mood: null },
      { date: 25, mood: null },
      { date: 26, mood: "sad" },
      { date: 27, mood: null },
      { date: 28, mood: null },
    ],
  ];
  const renderMood = (mood) => {
    if (!mood) return null;

    const moodMap = {
      happy: happyStamp,
      good: goodStamp,
      mad: madStamp,
      notGood: notGoodStamp,
      sad: sadStamp,
    };

    const src = moodMap[mood];
    if (!src) return null;

    return <img src={src} alt={mood} className="mood-stamp" />;
  };

  return (
    <div className="container">
      <div className="text-center fw-bold">
        <h2 className="text-primary-05 mb-5">從撰寫日記開始陪伴自己</h2>
        <p className="text-black-700">心情的每一天，都值得被看見與理解</p>
      </div>
      <DiaryLayout
        year_month="2026 Feb"
        weeks={weeks}
        renderMood={renderMood}
        diaryDate="2026/02/10"
        diaryTitle="今天的步伐有點慢，但沒關係"
        diaryContent={`最近好像有點累，連呼吸都慢了半拍。
  不是討厭現在的生活，而是有些事情還沒想清楚，情緒在心裡輕輕敲了一整天。
     我知道自己已經努力了，但偶爾還是會覺得「不夠好」。
         今天沒有逼自己想通，也沒有逼自己堅強。
         我只是靜靜坐，把那些還沒整理好的心情放下來。`}
        diaryImg="https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        footer={
          <Link to={ROUTES.diaryBase} className="btn btn-primary-05">
            查看更多
          </Link>
        }
      />
    </div>
  );
};
export default HomeDiary;
