import HomeMoodText from "../../components/features/homeMoodText/HomeMoodText.jsx";
import HomeHero from "../../components/features/homeHero/HomeHero.jsx";
import HomeDiary from "../../components/features/homeDiary/HomeDiary.jsx";
import AudioPreviewSection from "../../components/features/previewSection/";

import Button from "../../components/common/Button/Button.jsx";
import FAQList from "../../components/features/faq/FAQList.jsx";
import Contact from "../../components/features/contact/Contact.jsx";
import { faqData } from "../../components/features/faq/faqData";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import AnimatedNumber from "../../components/common/AnimatedNumber";
import {
  IconHeadphones,
  IconPencil,
  IconTag,
  IconSearch,
  IconPlayerPlayFilled,
  IconNotebook,
  IconMoodHeart,
  IconArrowNarrowRight,
} from "@tabler/icons-react";

function Home({ selectPlaylist }) {
  return (
    <main className="bg-BG-01">
      {/* Hero 區塊 */}
      <HomeHero />
      <HomeMoodText />
      {/* 試聽區塊 */}
      <AudioPreviewSection selectPlaylist={selectPlaylist} />
      {/* 從撰寫日記開始陪伴自己 */}
      <HomeDiary />
      {/* 關於心途 */}
      <section className="">
        <div className="container pt-0 pb-lg-11 pb-7">
          <div className="row justify-content-center mb-lg-9">
            <div className="text-center py-lg-0 pt-12 pb-8">
              <h2 className="fw-bold text-primary-05 fs-lg-2 fs-md-4 mb-lg-6 mb-5">關於心途</h2>
              <p className="text-black-800 fs-5 lh-lg mb-0 d-none d-lg-block">
                心途是一個陪你梳理情緒、重新與自己連結的溫柔空間。
                <br />
                在忙碌的生活裡，我們常常忘記停下腳步，聽聽自己內心真正的聲音。
                <br />
                心途透過語音陪伴、心情日記、情緒標籤與個人觀察，
                <br />
                提供你一個不需要完美，只需要誠實的地方。
              </p>
              <p className="text-start text-black-800 lh-lg mb-0 d-md-block d-lg-none">
                心途是一個陪你梳理情緒、重新與自己連結的溫柔空間。
                在忙碌的生活裡，我們常常忘記停下腳步，聽聽自己內心真正的聲音。
                <br />
                心途透過語音陪伴、心情日記、情緒標籤與個人觀察，
                提供你一個不需要完美，只需要誠實的地方。
              </p>
            </div>
          </div>
          <h5 className="text-primary-04 fw-bold mb-lg-6 mb-5 fs-lg-5 fs-6 ">在這裡，你可以</h5>
          <div className="row row-cols-2 row-cols-md-4 g-lg-6 g-3 text-center">
            <div className="col">
              <div className="tag h-100 py-lg-9 px-lg-7 py-6 fw-bold text-primary-05 d-flex align-items-center justify-content-center gap-3">
                <IconHeadphones size={36} className="d-none d-lg-block" />
                <IconHeadphones size={20} className="d-md-block d-lg-none" />
                <h5 className="mb-0 fs-lg-5 fs-6">語音陪伴身邊</h5>
              </div>
            </div>
            <div className="col">
              <div className="tag h-100 py-lg-9 px-lg-7 py-6 fw-bold text-primary-05 d-flex align-items-center justify-content-center gap-3">
                <IconPencil size={36} className="d-none d-lg-block" />
                <IconPencil size={20} className="d-md-block d-lg-none" />
                <h5 className="mb-0 fs-lg-5 fs-6">用文字整理自己</h5>
              </div>
            </div>
            <div className="col">
              <div className="tag h-100 py-lg-9 px-lg-7 py-6 fw-bold text-primary-05 d-flex align-items-center justify-content-center gap-3">
                <IconTag size={36} className="d-none d-lg-block" />
                <IconTag size={20} className="d-md-block d-lg-none" />
                <h5 className="mb-0 fs-lg-5 fs-6">標籤理解情緒</h5>
              </div>
            </div>
            <div className="col">
              <div className="tag h-100 py-lg-9 px-lg-7 py-6 fw-bold text-primary-05 d-flex align-items-center justify-content-center gap-3">
                <IconSearch size={36} className="d-none d-lg-block" />
                <IconSearch size={20} className="d-md-block d-lg-none" />
                <h5 className="mb-0 fs-lg-5 fs-6">用洞察陪伴前進</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 加入心途 */}
      <section>
        <div className="container py-lg-11 py-7 text-center">
          <h2 className="fw-bold text-primary-05 fs-lg-2 fs-md-4 mb-lg-6 mb-3">
            已經有 <AnimatedNumber end={99999} /> 人加入心途
          </h2>

          <h5 className="text-black-700 fs-lg-5 fs-6 fw-bold mb-lg-9 mb-6">
            一起在這裡練習理解自己、照顧自己
          </h5>

          <div className="row row-cols-1 row-cols-md-3 g-6 mb-lg-12 mb-9">
            <div className="col">
              <div className="card card-linerBG py-lg-9 py-6 border-0 h-100">
                <span className="d-flex justify-content-center">
                  <IconPlayerPlayFilled
                    className="text-primary-05 mb-3 fs-1 d-none d-lg-block"
                    size={36}
                  />
                  <IconPlayerPlayFilled
                    className="text-primary-05 mb-2 fs-1 d-md-block d-lg-none"
                    size={24}
                  />
                </span>
                <p className="text-black-700 fs-lg-5 mb-lg-7 mb-5 fw-bold">音頻播放次數</p>
                <p className="text-primary-05 fs-lg-2 fs-4 mb-0 fw-bold">
                  <AnimatedNumber end={12483} /> 次
                </p>
              </div>
            </div>

            <div className="col">
              <div className="card card-linerBG py-lg-9 py-6 border-0 h-100">
                <span className="d-flex justify-content-center">
                  <IconNotebook className="text-primary-05 mb-3 fs-1 d-none d-lg-block" size={36} />
                  <IconNotebook
                    className="text-primary-05 mb-2 fs-1 d-md-block d-lg-none"
                    size={24}
                  />
                </span>
                <p className="text-black-700 fs-lg-5 mb-lg-7 mb-5 fw-bold">心情日記數量</p>
                <p className="text-primary-05 fs-lg-2 fs-4 mb-0 fw-bold">
                  <AnimatedNumber end={8294} /> 則
                </p>
              </div>
            </div>

            <div className="col">
              <div className="card card-linerBG py-lg-9 py-6 border-0 h-100">
                <span className="d-flex justify-content-center">
                  <IconMoodHeart
                    className="text-primary-05 mb-3 fs-1 d-none d-lg-block"
                    size={36}
                  />
                  <IconMoodHeart
                    className="text-primary-05 mb-2 fs-1 d-md-block d-lg-none"
                    size={24}
                  />
                </span>
                <p className="text-black-700 fs-lg-5 mb-lg-7 mb-5 fw-bold">累計情緒蓋章</p>
                <p className="text-primary-05 fs-lg-2 fs-4 mb-0 fw-bold">
                  <AnimatedNumber end={32112} /> 枚
                </p>
              </div>
            </div>
          </div>

          <h4 className="fw-bold text-primary-04 mb-lg-7 mb-4 fs-lg-4 fs-6">
            準備好開始練習與自己好好相處了嗎？
          </h4>
          <section>
            <div className="">
              <Link
                to="/subscription"
                className="btn btn-white btn-outline-primary-04 fw-bold fs-lg-4 py-lg-5 py-3 px-lg-7 px-4 heroBtn border-3"
              >
                開始訂閱你的心途
              </Link>
            </div>
          </section>
        </div>
      </section>
      {/* 常見問題 */}
      <section className="home-faq bg-liner">
        <div className="container py-lg-11 py-7">
          <h2 className="fw-bold text-center text-primary-05 fs-lg-2 fs-md-4 mb-lg-9 mb-6">
            常見問題
          </h2>
          <FAQList data={faqData.slice(0, 3)} />
          <div className="d-flex justify-content-end">
            <Link
              to={ROUTES.faq}
              className="btn custom-btn-filled d-flex fw-bold align-items-center fs-lg-5 px-lg-5"
            >
              更多問題
              <IconArrowNarrowRight className="ps-1 d-none d-lg-block" size={24} />
              <IconArrowNarrowRight className="ps-1 d-md-block d-lg-none" size={20} />
            </Link>
          </div>
        </div>
      </section>
      {/* 聯絡我們 */}
      <Contact />
    </main>
  );
}

export default Home;
