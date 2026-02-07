import { IconArrowNarrowRight } from "@tabler/icons-react";
import style from "./diaryWelcome.module.scss";

const DiaryWelcome = () => {
  return (
    <div className={`container ${style.marginY}`}>
      <div className="text-center d-flex flex-column gap-5">
        <div className="fw-bold my-3">
          <h2 className="text-primary-04 mb-5">從撰寫日記開始陪伴自己</h2>
          <p className="text-black-700">心情的每一天，都值得被看見與理解</p>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 gx-lg-5 align-items-stretch mb-5">
          <div className="col">
            <div className="h-100 d-flex">
              <img src="src/assets/diaryWelcome_main.avif" alt="首圖" className={style.mainPhoto} />
            </div>
          </div>
          <div className="col">
            <div className="h-100 d-flex flex-column">
              <div className={`d-grid ${style.text}`}>
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
                <button type="button" className={`${style.btnOutline}`}>
                  <span>開始寫日記</span>
                  <IconArrowNarrowRight size={24} className={style.calendarArrow} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center border border-danger my-5">
        <h2 className="text-primary-05 my-5 fw-bold ">寫下日記，就是給自己的每日簽到</h2>
        <div className="row row-cols-1 row-cols-lg-2 gx-lg-5 align-items-stretch mb-5">
          <div className="col">
            <div className="h-100 d-flex">
              <img src="src/assets/diaryWelcome_main.avif" alt="首圖" className={style.mainPhoto} />
            </div>
          </div>
          <div className="col">
            <div className={`h-100 d-flex flex-column ${style.calBg}`}>
              <div className={`d-grid ${style.text}`}>
                <div className="my-3 d-flex flex-column justify-content-center text-black-700">
                  <span className="py-1">日記本左側為簽到區</span>
                  <span className="py-1">寫下一篇日記，完成今日簽到</span>
                  <span className="py-1 fw-bold">讓每一天，都有屬於它的顏色</span>
                </div>
                <div className="my-3 d-flex flex-column justify-content-center text-black-700">
                  <span className="py-1">尚未留下紀錄的日子</span>
                  <span className="py-1">將靜靜地以灰色保留。</span>
                </div>

                <div className="my-3 d-flex flex-column justify-content-center text-black-700  fw-bold">
                  <span className="py-1">回頭看的時候，</span>
                  <span className="py-1">也能慢慢發現，</span>
                  <span className="py-1 mb-5">自己走過的情緒軌跡。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center border border-danger">
        <div className="d-flex flex-column gap-3">
          <h2 className="text-primary-05 my-5 fw-bold">把今天的心情，溫柔的留下來</h2>
          <div className="d-flex my-3">
            <img
              src="src/assets/diaryWelcome_main.avif"
              alt="首圖"
              className={`${style.mainPhoto}`}
            />
          </div>
          <div className="my-5">
            <button type="button" className={`${style.btnFilled}`}>
              <span>開始自己的心途旅行</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryWelcome;
