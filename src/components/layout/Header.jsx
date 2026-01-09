import logo from '../../assets/logo.png';
import './header.css';
import { useEffect, useState } from 'react';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`site-header bg-BG-02 ${isScrolled ? 'scrolled' : ''}`} >
            <div className="container px-5">

                {/* 第 1 行：主選單（靠上） */}
                <nav className="d-flex justify-content-center gap-8">
                    <a className="text-decoration-none text-secondary" href="#">
                        語音陪伴
                    </a>
                    <a className="text-decoration-none text-secondary" href="#">
                        心情日記
                    </a>
                    <a className="text-decoration-none text-secondary" href="#">
                        常見問題
                    </a>
                    <a className="text-decoration-none text-secondary" href="#">
                        訂閱方案
                    </a>
                </nav>

                {/* 第 2 行：LOGO + 登入註冊 */}
                <div className="header-bottom">
                        
                    <img
                        src={logo}
                        alt="Inner Soul"
                        className="site-logo"
                    />

                    <div className="d-flex gap-2 auth-buttons">
                        <button className="btn btn-outline">登入</button>
                        <button className="btn btn-outline">註冊</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;