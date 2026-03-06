import cloudRight from "../../../assets/cloud-right.svg";
import "./contact.scss";
import {
  IconMapPin,
  IconMail,
  IconPhone,
  IconClockHour3,
  IconExternalLink,
} from "@tabler/icons-react";

export default function ContactSection() {
  return (
    <section className="contact-section bg-BG-02">
      <img src={cloudRight} className="contact-cloud-right" alt="cloud" />

      <div className="container py-lg-11 py-7">
        <div className="contact-layout">
          {/* 左側 */}
          <div className="contact-info">
            <h2 className="contact-title fs-lg-2 fs-lg-2 fs-md-4 mb-lg-9 mb-6">聯絡我們</h2>

            <ul className="contact-list fs-lg-5 mb-0 pb-lg-7">
              <li className="contact-item mb-lg-4 mb-3">
                <IconMapPin size={24} />
                <a className="d-flex" href="https://maps.app.goo.gl/W4MSJDahrJ9UNJpm9">
                  台北市大安區復興南路一段 128 號
                  <span className="ps-3 d-flex align-items-center">
                    <IconExternalLink size={24} />
                  </span>
                </a>
              </li>

              <li className="contact-item mb-lg-4 mb-3">
                <IconPhone size={24} />
                <span>02-7788-3366</span>
              </li>

              <li className="contact-item mb-lg-4 mb-3">
                <IconMail size={24} />
                <a className="d-flex" href="mailto:contact@innersoulcare.com">
                  contact@innersoulcare.com
                  <span className="ps-3 d-flex align-items-center">
                    <IconExternalLink size={24} />
                  </span>
                </a>
              </li>

              <li className="contact-item mb-lg-4 mb-3">
                <IconClockHour3 size={24} />
                <span>Mon - Sun 09:30 - 20:00</span>
              </li>
            </ul>

            {/* 社群 icon */}
            <div className="contact-social">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="前往 Facebook（另開新視窗）"
              >
                <i className="bi bi-facebook" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="前往 Instagram（另開新視窗）"
              >
                <i className="bi bi-instagram" />
              </a>
              <a
                href="https://line.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="前往 Line（另開新視窗）"
              >
                <i className="bi bi-line" />
              </a>
            </div>
          </div>

          {/* 地圖 */}
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
