// pages/Home.jsx

// 引入功能模組（整個功能）
import HomeMoodText from "../../components/features/homeMoodText/HomeMoodText.jsx";
import HomeHero from "../../components/features/homehero/HomeHero.jsx";

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
      {/* 關於心途 */}
      <section>
        <div className="container py-11">
          <div className="row row-cols-4 text-center">
            <div className="col py-9 px-10 fs-5 tag text-primary-05 fw-bold">
              <i className="bi bi-headphones me-6"></i>語音陪伴身邊
            </div>
          </div>
        </div>
      </section>
      {/* 加入心途 */}
      <section>
        <div className="container py-11 text-center">
          <div className="row row-cols-3">
            <div className="col card card-linerBG py-9 border-0">
              <i className="bi bi-play-fill d-block mb-3"></i>
              <p className="text-black-700 h5 mb-7">音頻播放次數</p>
              <p className="text-primary-05 h2">12,483 次</p>
            </div>
          </div>
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
