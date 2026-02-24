import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import style from "./diaryWelcome.module.scss";
import mainPhoto from "../../assets/diary/diaryWelcome_main.avif";
import diaryCalendar from "../../assets/diary/diaryCalendar_Demo4.png";
import diaryContent from "../../assets/diary/diaryContent_Demo3.png";
import cloud from "../../assets/cloud-right.svg";

const DiaryWelcome = () => {
  return (
    <div className={`${style.marginY}`}>
      {/* 1 */}
      <section>
        <div className={`${style.section1} container d-flex flex-column `}>
          <div className="fw-bold text-center">
            <span className="fs-md-2 fs-4 text-primary-04">從撰寫日記開始陪伴自己</span>
            <p className="text-black-700 py-2 fs-md-5 fs-md-6">心情的每一天，都值得被看見與理解</p>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 gx-lg-5 align-items-stretch mb-5">
            <div className="col">
              <div className="h-100 d-flex">
                <img src={mainPhoto} alt="首圖" className={style.mainPhoto} />
              </div>
            </div>
            <div className="col">
              <div className="h-100 d-flex flex-column text-lg-start text-center">
                <div className={`d-grid flex-grow-1 mt-md-0 mt-5 ${style.text}`}>
                  <div className="p-md-4 p-2 mb-2 text-primary-05 fw-bold fs-md-4 fs-6">
                    今天，不需要想太多
                  </div>
                  <div className="ps-4 my-md-3 my-1 d-flex flex-column justify-content-center text-black-700 fs-6">
                    <span className="py-1">沒有規定字數</span>
                    <span className="py-1">沒有一定要想清楚才開始</span>
                    <span className="py-1">幾句話、一張照片、一個代表心情的小標記</span>
                  </div>
                  <div className="my-2 p-4 fw-bold text-black-700 fs-md-5 fs-6">
                    讓我們陪你把今天，輕輕留下來。
                  </div>
                </div>
                <div className="ps-4 mt-3">
                  <Link to={`/login`}>
                    <button type="button" className={`${style.btnOutline} px-2 py-1`}>
                      <div className="ps-1 fs-6 fs-md-5">開始寫日記</div>
                      <IconArrowNarrowRight className={style.arrowIcon} />
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
          <div className="text-primary-05 text-center my-5 fw-bold py-5 fs-md-3 fs-5">
            寫下日記，就是給自己的每日簽到
          </div>
          <svg className={`${style.lineSvg2} ${style.onlyDesktop}`} viewBox="0 0 1300 500">
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
              markerEnd="url(#open-arrow)"
            />

            <polyline
              points="210,300 0,300 0,-80 80,-80"
              stroke="#505050"
              fill="none"
              markerEnd="url(#open-arrow)"
            />
            <text x="90" y="-80" fontSize={20} fill="#505050" dominantBaseline="middle">
              點擊可查看心情記事
            </text>
          </svg>
          <svg className={`${style.lineSvg2} ${style.onlyMobile}`} viewBox="0 0 375 500">
            <defs>
              <marker
                id="open-arrow-mobile"
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
              x1="188"
              y1="230"
              x2="188"
              y2="350"
              stroke="#505050"
              markerEnd="url(#open-arrow-mobile)"
            />

            <polyline
              points="120,100 30,100 30,-115 80,-115"
              stroke="#505050"
              fill="none"
              markerEnd="url(#open-arrow-mobile)"
            />
            <text
              x="90"
              y="-115"
              fontSize={14}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
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
                <div className={`d-grid flex-grow-1 ${style.text} fs-6 fs-md-5`}>
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
          <svg className={`${style.lineSvg3} ${style.onlyDesktop}`} viewBox="0 0 1300 500">
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
              x="75"
              y="-50"
              fontSize={20}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              為今天的自己做個總結
            </text>
            <line
              x1="380"
              y1="-50"
              x2="285"
              y2="-50"
              stroke="#505050"
              markerEnd="url(#open-arrow)"
            />

            <text
              x="10"
              y="425"
              fontSize={20}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              自由放上一張代表今天的照片
            </text>
            <line
              x1="390"
              y1="422"
              x2="285"
              y2="422"
              stroke="#505050"
              markerEnd="url(#open-arrow)"
            />

            <text
              x="1050"
              y="-50"
              fontSize={20}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              記錄當日心情
            </text>
            <line
              x1="590"
              y1="-50"
              x2="1020"
              y2="-50"
              stroke="#505050"
              markerEnd="url(#open-arrow)"
            />

            <text
              x="1050"
              y="185"
              fontSize={20}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              寫下回憶小碎片
            </text>
            <line
              x1="870"
              y1="185"
              x2="1020"
              y2="185"
              stroke="#505050"
              markerEnd="url(#open-arrow)"
            />
          </svg>
          <svg className={`${style.lineSvg3} ${style.onlyMobile}`} viewBox="0 0 375 500">
            <defs>
              <marker
                id="open-arrow-mobile"
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
              x="25"
              y="5"
              fontSize={14}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              為今天的自己做個總結
            </text>
            <line
              x1="78"
              y1="85"
              x2="78"
              y2="20"
              stroke="#505050"
              markerEnd="url(#open-arrow-mobile)"
            />

            <text
              x="30"
              y="440"
              fontSize={14}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              自由放上一張代表今天的照片
            </text>
            <line
              x1="110"
              y1="390"
              x2="110"
              y2="425"
              stroke="#505050"
              markerEnd="url(#open-arrow-mobile)"
            />

            <text
              x="200"
              y="5"
              fontSize={14}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              記錄當日心情
            </text>
            <polyline
              points="155,55 240,55 240,20"
              stroke="#505050"
              fill="none"
              markerEnd="url(#open-arrow-mobile)"
            />

            <text
              x="250"
              y="440"
              fontSize={14}
              fontWeight={700}
              fill="#505050"
              dominantBaseline="middle"
            >
              寫下回憶小碎片
            </text>
            <line
              x1="300"
              y1="240"
              x2="300"
              y2="425"
              stroke="#505050"
              markerEnd="url(#open-arrow-mobile)"
            />
          </svg>
          <div className="d-flex flex-column gap-3 pb-5 ">
            <div className="text-primary-05 mt-4 pb-5 fw-bold fs-md-2 fs-5">
              把今天的心情，溫柔的留下來
            </div>
            <div className="d-flex my-3 py-lg-0 py-5 justify-content-center align-items-center">
              <img
                src={diaryContent}
                alt="diaryContent_Demo"
                className={`${style.diaryDemoPhoto}`}
              />
            </div>
            <div className="my-5 pt-lg-0 pt-5">
              <Link to={`/login`}>
                <button type="button" className={`${style.btnFilled}`}>
                  <span className="px-3 py-1 fs-md-5 fs-6">開始自己的心途旅行</span>
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
