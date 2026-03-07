import { useState } from "react";
import "./homeHero.scss";
import flowerIcon from "../../../assets/flower.png";
import { IconRotateClockwise } from "@tabler/icons-react";
import HomeMoodText from "../homeMoodText/HomeMoodText";
import { getMoodText } from "../homeMoodText/getMoodText";
import { Link } from "react-router-dom";

const HomeHero = () => {
  const [text, setText] = useState(getMoodText());
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const handleChange = () => {
    if (isDisabled) return;

    setIsDisabled(true);
    setIsRotating(true);
    setText(getMoodText());

    setTimeout(() => {
      setIsRotating(false); // 移除 class，讓下次能再轉
      setIsDisabled(false);
    }, 600);
  };

  return (
    <div className="bg-BG-01">
      <section className="container hero-container px-lg-6">
        <div className="hero-content">
          {/* 左側：slogan 文字區 */}
          <div className="hero-left text-primary-04">
            <h1 className="hero-title">
              用一段語音、一篇日記
              <br />
              整理內在的自己
            </h1>

            {/* 內文 */}
            <div className="hero-subtitle hero-text text-black-700">
              <p className="mb-2">在混亂與忙碌之間，留一段時間給自己</p>
              <p>讓語音與文字陪你聽見內在的聲音</p>
            </div>
            {/* CTA 按鈕 */}
            <Link
              to="/subscription"
              className="btn btn-white btn-outline-primary-04 fw-bold py-lg-5 px-lg-7 py-3 heroBtn border-3"
            >
              開始訂閱你的心途
            </Link>
          </div>
          {/* 右側：心途小語區 */}
          <div className="hero-right my-lg-0 my-md-11">
            <div className="quote-card">
              <div className="quote-header">
                <span className="quote-title text-primary-05 fade-in-up">
                  <img src={flowerIcon} alt="flower" className="title-icon" />
                  今日心途小語
                </span>

                <button
                  type="button"
                  className="btn refresh-btn text-black-700"
                  onClick={handleChange}
                >
                  <IconRotateClockwise size={24} className={isRotating ? "rotate-once" : ""} />
                  <span className="fw-bold ms-1 fade-in-up">換一換</span>
                </button>
              </div>

              <div className="quote-body fade-in-up">
                <HomeMoodText text={text} />
              </div>

              <div className="quote-footer mb-0">
                <p className="text-black-700">- 心途 Inner Soul</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
