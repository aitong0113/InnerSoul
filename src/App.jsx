import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import BackToTop from './components/common/BackToTop/BackToTop';



function App() {
  return (
    <>
      <Header />

      <main className="site-main">
        <main className="bg-BG-02 py-10">
          <div className="container">
            {/* 中間內容 */}
          </div>
        </main>
      </main>

      <footer className="site-footer">
        <Footer />
      </footer>
      <BackToTop />
    </>
  )
}

export default App