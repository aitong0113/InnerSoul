import logo from '../../assets/logo.png';
import './header.scss';
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
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">

        {/* LOGO */}
        <img src={logo} alt="Inner Soul" className="site-logo" />

        {/* 主選單 */}
        <nav className="main-nav">
          <a href="#">語音陪伴</a>
          <a href="#">心情日記</a>
          <a href="#">常見問題</a>
          <a href="#">訂閱方案</a>
        </nav>

        {/* 登入註冊 */}
        <div className="auth-buttons">
          <button className="btn btn-outline">登入</button>
          <button className="btn btn-outline">註冊</button>
        </div>

      </div>
    </header>
  );
}

export default Header;