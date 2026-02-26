import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import style from "./diaryWelcome.module.scss";
import mainPhoto from "../../assets/diary/diaryWelcome_main.avif";
import diaryCalendar from "../../assets/diary/calendar_Demo3.png";
import diaryContent from "../../assets/diary/content_Demo2.png";
import cloud from "../../assets/cloud-right.svg";

const DiaryWelcome = () => {
  return (
    <div>
      {/* 1 */}
      <section className={style.cloudR}>
        <div className={` container d-flex flex-column gap-md-11 gap-7 my-md-12 my-7`}>
          <div className="fw-bold text-center d-flex flex-column gap-md-6 gap-3">
            <h1 className="fs-md-1 fs-4 text-primary-04">從撰寫日記開始陪伴自己</h1>
            <p className="text-black-700 fs-md-4 fs-6">心情的每一天，都值得被看見與理解</p>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 gx-lg-5 align-items-stretch mb-5">
            <div className="col">
              <div className="h-100 d-flex">
                <img src={mainPhoto} alt="首圖" className={style.mainPhoto} />
              </div>
            </div>
            <div className="col">
              <div className="h-100 d-flex flex-column text-lg-start text-center ps-md-9 pt-md-0 pt-6 gap-md-9 gap-6">
                <div
                  className={`flex-grow-1 mt-md-0 mt-5 ${style.text} d-flex flex-column gap-md-11 gap-6`}
                >
                  <div className="text-primary-05 fw-bold fs-md-4 fs-6">今天，不需要想太多</div>
                  <div className="d-flex flex-column gap-md-10 gap-6">
                    <div className="d-flex flex-column text-black-700 fs-md-5 fs-6 gap-md-4 gap-2">
                      <span>沒有規定字數</span>
                      <span>沒有一定要想清楚才開始</span>
                      <span>幾句話、一張照片、一個代表心情的小標記</span>
                    </div>
                    <div className="fw-bold text-black-700 fs-md-5 fs-6">
                      讓我們陪你把今天，輕輕留下來。
                    </div>
                  </div>
                </div>
                <div className="">
                  <Link to={`/login`}>
                    <button type="button" className={`${style.btnOutline}`}>
                      <div className="fs-6 fw-bold fs-md-5">開始寫日記</div>
                      <IconArrowNarrowRight className={style.arrowIcon} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={cloud} className={style.cloud1} alt="bg-cloud" />
      </section>

      {/* 2 */}
      <section className={style.cloudR}>
        <div className={`${style.labelS2} ${style.text} ${style.onlyMobile} text-black-700`}>
          點擊可查看心情記事
        </div>
        <div className={`container ${style.section} d-flex flex-column gap-11 py-md-11 py-7`}>
          <div
            className={`${style.labelS2} ${style.text} ${style.onlyDesktop} fw-bold text-black-700`}
          >
            點擊可查看心情記事
          </div>
          <div className="text-primary-05 text-center fw-bold fs-md-3 fs-5">
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
              x1="600"
              y1="280"
              x2="690"
              y2="280"
              stroke="#505050"
              markerEnd="url(#open-arrow)"
            />

            <path
              d="
 M55 210
    H10
    A10 10 0 0 1 0 200
    V-25
    A10 10 0 0 1 10 -35
    H30
    "
              fill="none"
              stroke="#505050"
              strokeWidth="1"
              strokeLinecap="round"
              markerEnd="url(#open-arrow)"
            />
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
              y2="330"
              stroke="#505050"
              markerEnd="url(#open-arrow-mobile)"
            />

            <path
              d="
 M25 70
    H20
    A5 5 0 0 1 15 65
    V-63
    A5 5 0 0 1 20 -68
    H30
    "
              fill="none"
              stroke="#505050"
              strokeWidth="1"
              strokeLinecap="round"
              markerEnd="url(#open-arrow-mobile)"
            />
          </svg>

          <div className={`row row-cols-1 row-cols-lg-2 gx-lg-5 align-items-stretch`}>
            <div className="col">
              <div className={`w-100 h-100`}>
                <img src={diaryCalendar} alt="diaryCalendar_Demo" className={style.calPhoto} />
              </div>
            </div>

            <div className="col">
              <div
                className={`h-100 d-flex flex-column text-lg-start text-center ps-md-9 py-md-0 pt-10 pb-6 gap-9`}
              >
                <div
                  className={`d-flex flex-column justify-content-center flex-grow-1 ${style.text} fs-6 fs-md-5 gap-md-11 gap-9 text-black-700`}
                >
                  <div className="d-flex flex-column gap-md-11 gap-8">
                    <div className="d-flex flex-column gap-md-6 gap-5">
                      <div className="d-flex flex-column gap-md-3 gap-2">
                        <span>日記本左側為簽到區</span>
                        <span>寫下一篇日記，完成今日簽到</span>
                      </div>
                      <span className="fw-bold">讓每一天，都有屬於它的顏色</span>
                    </div>
                    <div className="d-flex flex-column gap-md-3 gap-2">
                      <span>尚未留下紀錄的日子</span>
                      <span>將靜靜地以灰色保留。</span>
                    </div>
                  </div>

                  <div className="d-flex flex-column fw-bold gap-5">
                    <span>回頭看的時候，</span>
                    <span>也能慢慢發現，</span>
                    <span>自己走過的情緒軌跡。</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={cloud} className={style.cloud2} alt="bg-cloud" />
      </section>
      {/* 3 */}
      <section className="bg-liner">
        <div className={`container text-center ${style.section} py-md-11 py-7`}>
          <div className="d-flex flex-column gap-md-11 gap-12 ">
            <div className="text-primary-05 fw-bold fs-md-2 fs-5">把今天的心情，溫柔的留下來</div>
            <div className="d-flex flex-column gap-md-9 gap-12 ">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={diaryContent}
                  alt="diaryContent_Demo"
                  className={`${style.diaryDemoPhoto}`}
                />
              </div>
              <div>
                <Link to={`/login`}>
                  <button type="button" className={`${style.btnFilled}`}>
                    <span className="fs-md-5 fs-6">開始自己的心途旅行</span>
                  </button>
                </Link>
              </div>
            </div>
            {/* text-desktop */}
            <div
              className={`${style.labelS301} ${style.text} ${style.onlyDesktop} fw-bold text-black-700`}
            >
              為今天的自己做個總結
            </div>
            <div
              className={`${style.labelS302} ${style.text} ${style.onlyDesktop} fw-bold text-black-700`}
            >
              記錄當日心情
            </div>
            <div
              className={`${style.labelS303} ${style.text} ${style.onlyDesktop} fw-bold text-black-700`}
            >
              自由放上一張代表今天的照片
            </div>
            <div
              className={`${style.labelS304} ${style.text} ${style.onlyDesktop} fw-bold text-black-700`}
            >
              寫下回憶小碎片
            </div>
          </div>
          {/* line */}
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

            {/* 為今天的自己做個總結 */}
            <line x1="370" y1="85" x2="285" y2="85" stroke="#505050" markerEnd="url(#open-arrow)" />

            {/* 記錄當日心情 */}
            <line
              x1="620"
              y1="40"
              x2="1020"
              y2="40"
              stroke="#505050"
              markerEnd="url(#open-arrow)"
            />

            {/* 自由放上一張代表今天的照片 */}
            <line
              x1="380"
              y1="416"
              x2="285"
              y2="416"
              stroke="#505050"
              markerEnd="url(#open-arrow)"
            />

            {/* 寫下回憶小碎片 */}
            <line
              x1="870"
              y1="220"
              x2="1020"
              y2="220"
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

            {/* 為今天的自己做個總結 */}
            <line
              x1="78"
              y1="105"
              x2="78"
              y2="72"
              stroke="#505050"
              markerEnd="url(#open-arrow-mobile)"
            />

            {/* 記錄當日心情 */}
            <line
              x1="163"
              y1="105"
              x2="163"
              y2="78"
              stroke="#505050"
              markerEnd="url(#open-arrow-mobile)"
            />

            {/* 自由放上一張代表今天的照片 */}
            <line
              x1="110"
              y1="390"
              x2="110"
              y2="418"
              stroke="#505050"
              markerEnd="url(#open-arrow-mobile)"
            />

            {/* 寫下回憶小碎片 */}
            <line
              x1="300"
              y1="270"
              x2="300"
              y2="414"
              stroke="#505050"
              markerEnd="url(#open-arrow-mobile)"
            />
          </svg>
          {/* text-mobile */}
          <div className={`${style.labelS301} ${style.text} ${style.onlyMobile} text-black-700`}>
            為今天的自己做個總結
          </div>
          <div className={`${style.labelS302} ${style.text} ${style.onlyMobile} text-black-700`}>
            記錄當日心情
          </div>
          <div className={`${style.labelS303} ${style.text} ${style.onlyMobile} text-black-700`}>
            自由放上一張代表今天的照片
          </div>
          <div className={`${style.labelS304} ${style.text} ${style.onlyMobile} text-black-700`}>
            寫下回憶小碎片
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiaryWelcome;
