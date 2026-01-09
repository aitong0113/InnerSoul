import './footer.css';
import logo from '../../assets/logo.png';
import cloudLeft from '../../assets/cloud-left.svg';
import cloudRight from '../../assets/cloud-right.svg';
/**
 * Footer 组件
 * 网站底部组件，包含联系信息、地图、社交媒体链接和导航菜单
 */
export default function Footer() {
    return (
        <footer className="bg-BG-02 pt-5 site-footer">
            {/* 右上雲（裝飾） */}
            <img
                src={cloudRight}
                className="footer-cloud-right"
                alt=""
            />

            {/* 左下雲（裝飾） */}
            <img
                src={cloudLeft}
                className="footer-cloud-left"
                alt=""
            />

            {/* ===== 區塊 A：聯絡我們 + 地圖 ===== */}
            <div className="container pb-8">
                <div className="row gy-4 align-items-start">
                    {/* 左：聯絡資訊 */}
                    <div className="col-md-5">
                        <h5 className="fw-bold mb-3" style={{ color: '#104754' }} >聯絡我們</h5>

                        <ul className="list-unstyled small" style={{ color: '#505050' }}>
                            <li className="mb-2 d-flex align-items-start gap-2">
                                <i className="bi bi-geo-alt-fill"></i>
                                <span>台北市大安區復興南路一段 128 號</span>
                            </li>

                            <li className="mb-2 d-flex align-items-start gap-2">
                                <i className="bi bi-telephone-fill"></i>
                                <span>02-7788-3366</span>
                            </li>

                            <li className="mb-2 d-flex align-items-start gap-2">
                                <i className="bi bi-envelope-fill"></i>
                                <a
                                    href="mailto:contact@innersoulcare.com"
                                    style={{ color: '#505050', textDecoration: 'underline' }}
                                >
                                    contact@innersoulcare.com
                                </a>
                            </li>

                            <li className="mb-3 d-flex align-items-start gap-2">
                                <i className="bi bi-clock-fill"></i>
                                <span>Mon - Sun 09:30 - 20:00</span>
                            </li>
                        </ul>
                        <div className="d-flex gap-8 mt-2">
                            <a href="#" className="text-dark fs-5">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="text-dark fs-5">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="text-dark fs-5">
                                <i className="bi bi-line"></i>
                            </a>
                        </div>
                    </div>

                    {/* 右側地圖 */}
                    <div className="col-md-7 d-flex justify-content-center">
                        <div
                            className="map-card"
                            style={{
                                width: '760px',
                                height: '350px',
                                borderRadius: '20px',
                                border: '3px solid #fff',
                                overflow: 'hidden', // 🔥 關鍵：裁切 iframe 圓角
                            }}
                        >
                            <iframe
                                title="Inner Soul 地圖"
                                src="https://www.google.com/maps?q=台北市大安區復興南路一段128號&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>


                </div>
            </div>


            {/* ===== 區塊 B：Logo + 導覽 ===== */}
            <div className="container pb-8">
                <div className="text-center">
                    <img
                        src={logo}
                        alt="Inner Soul"
                        style={{ height: '70px' }}
                        className="mb-3"
                    />

                    <ul className="d-flex justify-content-center gap-8 pt-3">
                        <li className="list-inline-item mx-2">
                            <a href="#" style={{ color: '#6a6a6a' }}>語音陪伴</a>
                        </li>
                        <li className="list-inline-item mx-2">
                            <a href="#" style={{ color: '#6a6a6a' }}>心情日記</a>
                        </li>
                        <li className="list-inline-item mx-2">
                            <a href="#" style={{ color: '#6a6a6a' }}>常見問題</a>
                        </li>
                        <li className="list-inline-item mx-2">
                            <a href="#" style={{ color: '#6a6a6a' }}>訂閱方案</a>
                        </li>
                    </ul>

                    <small style={{ color: '#104754' }}>
                        © 2026 Inner soul 心途 | 溫柔陪你走一段路
                    </small>
                </div>
            </div>
        </footer>
    );
}