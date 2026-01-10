import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop/BackToTop";

function App() {
  return (
    <>
      <Header />

      <main className="site-main">
        <main className="bg-bg-02 py-10">
          <div className="container">{/* 中間內容 */}</div>
        </main>
      </main>
      <div>
        <div className="container text-center">
          <div className="row row-cols-3">
            <div className="col card card-linerBG py-9">
              <i className="bi bi-play-fill"></i>
              <p className="text-black-700 h5">音頻播放次數</p>
              <p className="text-primary-05 h2">12,483 次</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="site-footer">
        <Footer />
      </footer>
      <BackToTop />
    </>
  );
}

export default App;
