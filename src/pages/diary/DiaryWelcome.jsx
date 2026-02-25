import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import style from "./diaryWelcome.module.scss";
import mainPhoto from "../../assets/diary/diaryWelcome_main.avif";
import diaryCalendar from "../../assets/diary/diaryCalendar_Demo3.png";
import diaryContent from "../../assets/diary/diaryContent_Demo2.png";

const DiaryWelcome = () => {
  return (
    <div className="container">
      {/* 1 */}
      <div className="text-center d-flex flex-column gap-5">
        <div className="fw-bold">
          <h2 className="text-center fw-bold fs-1 text-primary-05 mb-0">從撰寫日記開始陪伴自己</h2>
          <p className="text-black-fs-5 text-center text-black-700 my-5">
            心情的每一天，都值得被看見與理解
          </p>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 gx-lg-5 align-items-stretch mb-5">
          <div className="col">
            <div className="h-100 d-flex">
              <img src={mainPhoto} alt="首圖" className={style.mainPhoto} />
            </div>
          </div>
          <div className="col">
            <div className="h-100 d-flex flex-column">
              <div className={`d-grid flex-grow-1 ${style.text}`}>
                <div className="p-2 mb-2 text-primary-05 fw-bold">今天，不需要想太多</div>
                <div className="my-3 d-flex flex-column justify-content-center text-black-700">
                  <span className="py-1">沒有規定字數</span>
                  <span className="py-1">沒有一定要想清楚才開始</span>
                  <span className="py-1">幾句話、一張照片、一個代表心情的小標記</span>
                </div>
                <div className="mt-2 p-3 fw-bold text-black-700">
                  讓我們陪你把今天，輕輕留下來。
                </div>
              </div>
              <div className="mt-3">
                <Link to={`/login`}>
                  <button type="button" className={`${style.btnOutline} px-4 py-2`}>
                    <span>開始寫日記</span>
                    <IconArrowNarrowRight size={24} className={style.calendarArrow} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className={`text-center my-5 ${style.section2}`}>
        <h2 className="text-primary-05 my-5 fw-bold py-5">寫下日記，就是給自己的每日簽到</h2>
        <svg className={style.lineSvg2} viewBox="0 0 1300 500">
          <defs>
            <marker
              id="open-arrow"
              viewBox="0 0 24 24"
              refX="8"
              refY="6"
              markerWidth="20"
              markerHeight="20"
              orient="auto"
            >
              <polyline
                points="2,2 10,6 2,10"
                fill="none"
                stroke="#505050"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          <line
            x1="500"
            y1="295"
            x2="830"
            y2="295"
            stroke="#505050"
            marker-end="url(#open-arrow)"
          />

          <polyline
            points="190,365 40,365 40,50 80,50"
            stroke="#505050"
            fill="none"
            marker-end="url(#open-arrow)"
          />
          <text x="95" y="50" fontSize={20} fill="#505050" dominantBaseline="middle">
            點擊可查看心情記事
          </text>
        </svg>

        <div className={` row row-cols-1 row-cols-lg-2 gx-lg-5 align-items-stretch py-5`}>
          <div className="col">
            <div
              className={`${style.leftCard} h-100 d-flex justify-content-center align-items-center`}
            >
              <img src={diaryCalendar} alt="diaryCalendar_Demo" className={style.calPhoto} />
            </div>
          </div>
          <div className="col">
            <div className={`h-100 d-flex flex-column ${style.calBg} ${style.rightText}`}>
              <div className={`d-grid flex-grow-1 ${style.text}`}>
                <div className="my-2 d-flex flex-column justify-content-center text-black-700">
                  <span className="py-1">日記本左側為簽到區</span>
                  <span className="py-1">寫下一篇日記，完成今日簽到</span>
                  <span className="py-1 fw-bold">讓每一天，都有屬於它的顏色</span>
                </div>
                <div className="my-2 d-flex flex-column justify-content-center text-black-700">
                  <span className="py-1">尚未留下紀錄的日子</span>
                  <span className="py-1">將靜靜地以灰色保留。</span>
                </div>

                <div className="my-2 d-flex flex-column justify-content-center text-black-700  fw-bold">
                  <span className="py-1">回頭看的時候，</span>
                  <span className="py-1">也能慢慢發現，</span>
                  <span className="py-1 ">自己走過的情緒軌跡。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className={`text-center ${style.section3}`}>
        <svg className={style.lineSvg3} viewBox="0 0 1300 500">
          <defs>
            <marker
              id="open-arrow"
              viewBox="0 0 24 24"
              refX="8"
              refY="6"
              markerWidth="20"
              markerHeight="20"
              orient="auto"
            >
              <polyline
                points="2,2 10,6 2,10"
                fill="none"
                stroke="#505050"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          <text
            x="55"
            y="5"
            fontSize={20}
            fontWeight={700}
            fill="#505050"
            dominantBaseline="middle"
          >
            為今天的自己做個總結
          </text>
          <line x1="420" y1="3" x2="275" y2="3" stroke="#505050" marker-end="url(#open-arrow)" />

          <text
            x="45"
            y="320"
            fontSize={20}
            fontWeight={700}
            fill="#505050"
            dominantBaseline="middle"
          >
            自由放上一張代表今天的照片
          </text>
          <line
            x1="420"
            y1="318"
            x2="320"
            y2="318"
            stroke="#505050"
            marker-end="url(#open-arrow)"
          />

          <text
            x="1050"
            y="-59"
            fontSize={20}
            fontWeight={700}
            fill="#505050"
            dominantBaseline="middle"
          >
            記錄當日心情
          </text>
          <line
            x1="610"
            y1="-60"
            x2="1020"
            y2="-60"
            stroke="#505050"
            marker-end="url(#open-arrow)"
          />

          <text
            x="1050"
            y="140"
            fontSize={20}
            fontWeight={700}
            fill="#505050"
            dominantBaseline="middle"
          >
            寫下回憶小碎片
          </text>
          <line
            x1="830"
            y1="140"
            x2="1020"
            y2="140"
            stroke="#505050"
            marker-end="url(#open-arrow)"
          />
        </svg>
        <div className="d-flex flex-column gap-3 pb-5 mb-5">
          <h2 className="text-primary-05 my-5 fw-bold">把今天的心情，溫柔的留下來</h2>
          <div className="d-flex my-3 justify-content-center align-items-center">
            <img src={diaryContent} alt="diaryContent_Demo" className={`${style.diaryDemoPhoto}`} />
          </div>
          <div className="my-5 pb-5">
            <Link to={`/login`}>
              <button type="button" className={`${style.btnFilled}`}>
                <span className="px-3 py-1">開始自己的心途旅行</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryWelcome;
