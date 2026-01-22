import cloudRight from "../../../assets/cloud-right.svg";
import "./contact.scss";

export default function ContactSection() {
  return (
    <section className="contact-section bg-BG-02 pt-5">
      <img src={cloudRight} className="contact-cloud-right" alt="" />

      <div className="container pb-8">
        <div className="contact-layout">
          {/* 左側 */}
          <div className="contact-info">
            <h2 className="contact-title">聯絡我們</h2>

            <ul className="contact-list pt-6">
              <li className="contact-item">
                <i className="bi bi-geo-alt-fill" />
                <span>台北市大安區復興南路一段 128 號</span>
              </li>
              <li className="contact-item">
                <i className="bi bi-telephone-fill" />
                <span>02-7788-3366</span>
              </li>
              <li className="contact-item">
                <i className="bi bi-envelope-fill" />
                <a href="mailto:contact@innersoulcare.com">
                  contact@innersoulcare.com
                </a>
              </li>
              <li className="contact-item">
                <i className="bi bi-clock-fill" />
                <span>Mon - Sun 09:30 - 20:00</span>
              </li>
            </ul>

            {/* 🔥 社群 icon 一定在這裡 */}
            <div className="contact-social">
              <a href="#"><i className="bi bi-facebook" /></a>
              <a href="#"><i className="bi bi-instagram" /></a>
              <a href="#"><i className="bi bi-line" /></a>
            </div>
          </div>

          {/* 右側 */}
          <div className="contact-map">
            <div className="map-card">
              <iframe
                title="Inner Soul 地圖"
                src="https://www.google.com/maps?q=台北市大安區復興南路一段128號&output=embed"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}