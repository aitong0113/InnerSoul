import "./playlist.scss";

function PlaylistRecommend() {
  return (
    <>
      <section className="bg-liner">
        <div className="container py-11">
          <div className="fs-2 text-primary-05 fw-bold mb-9">
            <p>這裡</p>
            <p>收錄著相似的共鳴</p>
          </div>

          <p className="fs-5 text-black-700 mb-6">大家都在聽</p>

          <div className="row row-cols-2 row-cols-md-4 g-6 text-center">
            <div className="col">
              <div className="tag-playlist h-100 py-9 px-7 fw-bold text-primary-05 gap-3 rounded-4">
                <h5 className="mb-0">早晨精選</h5>
                <i className="bi bi-play-fill fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlaylistRecommend;
