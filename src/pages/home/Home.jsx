// pages/Home.jsx

// 引入功能模組（整個功能）
import HomeMoodText from "../../components/features/homeMoodText/HomeMoodText.jsx";
import HomeHero from "../../components/features/homehero/HomeHero.jsx";
import HomeDiary from "../../components/features/homeDiary/HomeDiary.jsx";

// （如果你想包卡片，可用 component）
// import Card from '../components/Card';
import Button from "../../components/common/Button/Button.jsx";

function Home() {
  return (
    <main className="bg-BG-01">
      {/* Hero 區塊 */}
      <HomeHero />
      <div className="container py-11">
        {/* 心途小語換一換功能待處理 */}
        <HomeMoodText />
      </div>
      {/* 試聽區塊 */}
      <section>
        <div className="container py-11">
          <Button text="孤獨" imgUrl="/Union.png"></Button>
        </div>
      </section>
      {/* 功能區塊 */}
      <section>
        <div className="container py-11">
          <button
            type="button"
            className="btn btn-outline-primary-04 fs-4 py-5 px-7 heroBtn border-3 bg-white fw-bold"
          >
            開始訂閱你的心途
          </button>
        </div>
      </section>
      {/* 從撰寫日記開始陪伴自己 */}
      <HomeDiary />
      {/* 關於心途 */}
      <section className="">
        <div className="container py-11">
          <div className="row justify-content-center mb-9">
            <div className="col-8 text-center">
              <h2 className="fw-bold text-primary-05 mb-5">關於心途</h2>
              <p className="text-black-700 fs-5 lh-lg">
                心途是一個陪你梳理情緒、重新與自己連結的溫柔空間。
                <br />
                在忙碌的生活裡，我們常常忘記停下腳步，聽聽自己內心真正的聲音。
                <br />
                心途透過語音陪伴、心情日記、情緒標籤與個人觀察，
                <br />
                提供你一個不需要完美，只需要誠實的地方。
              </p>
            </div>
          </div>
          <h5 className="text-primary-04 mb-5">在這裡，你可以</h5>
          <div className="row row-cols-2 row-cols-md-4 g-6 text-center">
            <div className="col">
              <div className="tag h-100 py-9 px-7 fw-bold text-primary-05 d-flex align-items-center justify-content-center gap-3">
                <i className="bi bi-headphones fs-3"></i>
                <h5 className="mb-0">語音陪伴身邊</h5>
              </div>
            </div>
            <div className="col">
              <div className="tag h-100 py-9 px-7 fw-bold text-primary-05 d-flex align-items-center justify-content-center gap-3">
                <i className="bi bi-pencil fs-3"></i>
                <h5 className="mb-0">用文字整理自己</h5>
              </div>
            </div>
            <div className="col">
              <div className="tag h-100 py-9 px-7 fw-bold text-primary-05 d-flex align-items-center justify-content-center gap-3">
                <i className="bi bi-tag fs-3"></i>
                <h5 className="mb-0">標籤理解情緒</h5>
              </div>
            </div>
            <div className="col">
              <div className="tag h-100 py-9 px-7 fw-bold text-primary-05 d-flex align-items-center justify-content-center gap-3">
                <i className="bi bi-search fs-3"></i>
                <h5 className="mb-0">用洞察陪伴前進</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 加入心途 */}
      <section>
        <div className="container py-11 text-center">
          <h2 className="fw-bold text-primary-05 mb-5">
            已經有 99999 人加入心途
          </h2>

          <h5 className="text-black-700 mb-10">
            一起在這裡練習理解自己、照顧自己
          </h5>

          <div className="row row-cols-1 row-cols-md-3 g-6 mb-11">
            <div className="col">
              <div className="card card-linerBG py-9 border-0 h-100">
                <i className="bi bi-play-fill text-primary-05 mb-3 fs-1"></i>
                <p className="text-black-700 h5 mb-7">音頻播放次數</p>
                <p className="text-primary-05 h2">12,483 次</p>
              </div>
            </div>

            <div className="col">
              <div className="card card-linerBG py-9 border-0 h-100">
                <i className="bi bi-journal-bookmark text-primary-05 mb-3 fs-1"></i>
                <p className="text-black-700 h5 mb-7">心情日記數量</p>
                <p className="text-primary-05 h2">8,294 則</p>
              </div>
            </div>

            <div className="col">
              <div className="card card-linerBG py-9 border-0 h-100">
                <i className="bi bi-emoji-heart-eyes text-primary-05 mb-3 fs-1"></i>
                <p className="text-black-700 h5 mb-7">累計情緒蓋章</p>
                <p className="text-primary-05 h2">32,112 枚</p>
              </div>
            </div>
          </div>

          <h4 className="fw-bold text-primary-05 mb-7">
            準備好開始練習與自己好好相處了嗎？
          </h4>
          <section>
            <div className="container">
              <button
                type="button"
                className="btn btn-outline-primary-04 fs-4 py-5 px-7 heroBtn border-3 bg-white fw-bold"
              >
                開始訂閱你的心途
              </button>
            </div>
          </section>
        </div>
      </section>
      {/* 常見問題 */}
      <section className="bg-liner">
        <div className="container py-11">
          <div className="accordion" id="faqList">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fs-5 fw-bold text-primary-05"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  心途需要付費嗎？
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqList"
              >
                <div className="accordion-body text-black-700 fs-5">
                  心途的核心功能可部分免費使用；若你希望獲得更多深度陪伴（如完整語音陪伴聆聽、不限次數心情日記..等），歡迎查看我們的訂閱方案，選擇最適合你的方式繼續前進。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
