import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import style from "./diaryWelcome.module.scss";
import mainPhoto from "../../assets/diary/diaryWelcome_main.avif";
import diaryCalendar from "../../assets/diary/diaryCalendar_Demo4.png";
import diaryContent from "../../assets/diary/diaryContent_Demo2.png";
import cloud from "../../assets/cloud-right.svg";

const DiaryWelcome = () => {
  return (
    <div className={`${style.marginY}`}>
      {/* 1 */}
      <section>
        <div className={`${style.section1} container d-flex flex-column gap-5`}>
          <div className="fw-bold my-3 text-center">
            <span className="fs-2 text-primary-04">從撰寫日記開始陪伴自己</span>
            <p className="text-black-700 py-2 fs-5">心情的每一天，都值得被看見與理解</p>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 gx-lg-5 align-items-stretch mb-5">
            <div className="col">
              <div className="h-100 d-flex">
                <img src={mainPhoto} alt="首圖" className={style.mainPhoto} />
              </div>
            </div>
            <div className="col">
              <div className="h-100 d-flex flex-column text-lg-start text-center">
                <div className={`d-grid flex-grow-1 ${style.text}`}>
                  <div className="p-4 mb-2 text-primary-05 fw-bold fs-4">今天，不需要想太多</div>
                  <div className="ps-4 my-3 d-flex flex-column justify-content-center text-black-700 fs-6">
                    <span className="py-1">沒有規定字數</span>
                    <span className="py-1">沒有一定要想清楚才開始</span>
                    <span className="py-1">幾句話、一張照片、一個代表心情的小標記</span>
                  </div>
                  <div className="mt-2 p-4 fw-bold text-black-700 fs-5">
                    讓我們陪你把今天，輕輕留下來。
                  </div>
                </div>
                <div className="ps-4 mt-3">
                  <Link to={`/login`}>
                    <button type="button" className={`${style.btnOutline} px-3 py-1`}>
                      <span>開始寫日記</span>
                      <IconArrowNarrowRight size={24} className={style.calendarArrow} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <img src={cloud} className={style.cloud1} alt="bg-cloud" />
        </div>
      </section>

      {/* 2 */}
      <section>
        <div className={`container my-5 ${style.section2}`}>
          <div className="text-primary-05 text-center my-5 fw-bold py-5 fs-3">
            寫下日記，就是給自己的每日簽到
          </div>
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
              x1="560"
              y1="303"
              x2="670"
              y2="303"
              stroke="#505050"
              marker-end="url(#open-arrow)"
            />

            <polyline
              points="210,300 0,300 0,-80 80,-80"
              stroke="#505050"
              fill="none"
              marker-end="url(#open-arrow)"
            />
            <text x="90" y="-80" fontSize={20} fill="#505050" dominantBaseline="middle">
              點擊可查看心情記事
            </text>
          </svg>

          <div className={` row row-cols-1 row-cols-lg-2 gx-lg-5 align-items-stretch py-5`}>
            <div className="col">
              <div className={` h-100 d-flex justify-content-center align-items-center`}>
                <img src={diaryCalendar} alt="diaryCalendar_Demo" className={style.calPhoto} />
              </div>
            </div>
            <div className="col">
              <div className={`h-100 d-flex flex-column text-lg-start text-center`}>
                <div className={`d-grid flex-grow-1 ${style.text} fs-6`}>
                  <div className="ps-4 mt-5 pt-5 pt-lg-0 my-lg-1 d-flex flex-column justify-content-end text-black-700">
                    <span className="py-2 py-lg-1">日記本左側為簽到區</span>
                    <span className="py-2 py-lg-1">寫下一篇日記，完成今日簽到</span>
                    <span className="py-2 py-lg-1 fw-bold">讓每一天，都有屬於它的顏色</span>
                  </div>
                  <div className="ps-4 my-1 d-flex flex-column justify-content-center text-black-700">
                    <span className="py-2 py-lg-1">尚未留下紀錄的日子</span>
                    <span className="py-2 py-lg-1">將靜靜地以灰色保留。</span>
                  </div>

                  <div className="ps-4 my-1 d-flex flex-column justify-content-start text-black-700  fw-bold">
                    <span className="py-2 py-lg-1">回頭看的時候，</span>
                    <span className="py-2 py-lg-1">也能慢慢發現，</span>
                    <span className="py-2 py-lg-1 ">自己走過的情緒軌跡。</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src={cloud} className={style.cloud2} alt="bg-cloud" />
        </div>
      </section>
      {/* 3 */}
      <section className="bg-liner">
        <div className={`container text-center ${style.section3}`}>
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
              x="45"
              y="-40"
              fontSize={20}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              為今天的自己做個總結
            </text>
            <line
              x1="380"
              y1="-40"
              x2="255"
              y2="-40"
              stroke="#505050"
              marker-end="url(#open-arrow)"
            />

            <text
              x="10"
              y="320"
              fontSize={20}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              自由放上一張代表今天的照片
            </text>
            <line
              x1="390"
              y1="318"
              x2="285"
              y2="318"
              stroke="#505050"
              marker-end="url(#open-arrow)"
            />

            <text
              x="1050"
              y="-110"
              fontSize={20}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              記錄當日心情
            </text>
            <line
              x1="610"
              y1="-110"
              x2="1020"
              y2="-110"
              stroke="#505050"
              marker-end="url(#open-arrow)"
            />

            <text
              x="1050"
              y="125"
              fontSize={20}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              寫下回憶小碎片
            </text>
            <line
              x1="870"
              y1="125"
              x2="1020"
              y2="125"
              stroke="#505050"
              marker-end="url(#open-arrow)"
            />
          </svg>
          <div className="d-flex flex-column gap-3 pb-5 ">
            <div className="text-primary-05 my-5 fw-bold fs-3">把今天的心情，溫柔的留下來</div>
            <div className="d-flex my-3 justify-content-center align-items-center">
              <img
                src={diaryContent}
                alt="diaryContent_Demo"
                className={`${style.diaryDemoPhoto}`}
              />
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
      </section>
    </div>
  );
};

export default DiaryWelcome;
