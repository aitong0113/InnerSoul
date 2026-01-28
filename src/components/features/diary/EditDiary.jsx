import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MOODS } from "../../../constants/moods";
import api from "../../../services/api";
import { authStore } from "../../../services/auth/authStore";
import "./editDiary.scss";

function EditDiary() {
  const { date } = useParams();
  const navigate = useNavigate();
  const dateObj = new Date(date);
  const userId = authStore.getUserId();

  const emptyDiary = {
    id: null,
    userId,
    diaryDate: date,
    diaryTitle: "",
    diaryContent: "",
    mood: "",
    diaryImg: "",
    createdAt: "",
    updatedAt: "",
  };

  const getMood = (id) => MOODS.find((m) => m.id === id);

  const [diary, setDiary] = useState(emptyDiary);
  const previewD = diary;
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const dayText = `${month}/${day}`;
  const weekday = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"][dateObj.getDay()];
  const hasContent = diary.diaryTitle || diary.diaryContent || diary.mood || diary.diaryImg;
  useEffect(() => {
    if (!date || !userId) return;

    const loadDiary = async () => {
      try {
        const res = await api.get(`/diaries?userId=${userId}&diaryDate=${date}`);
        const found = res.data?.[0];
        if (found) {
          setDiary(found);
        } else {
          setDiary((prev) => ({
            ...prev,
            userId,
            diaryDate: date,
          }));
        }
      } catch (err) {
        console.log("讀取日記失敗", err);
      }
    };

    loadDiary();
  }, [date, userId]);

  const imgUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (diary.diaryImg?.startsWith("blob:")) {
      URL.revokeObjectURL(diary.diaryImg);
    }

    const previewURL = URL.createObjectURL(file);
    setDiary((prev) => ({ ...prev, diaryImg: previewURL }));
  };

  const saveDiary = async () => {
    if (!userId) {
      alert("請先登入");
      return;
    }

    const now = new Date().toISOString();

    const payload = {
      ...diary,
      userId,
      updatedAt: now,
      createdAt: diary.createdAt || now,
    };

    try {
      let res;

      if (diary.id) {
        res = await api.patch(`/diaries/${diary.id}`, payload);
      } else {
        res = await api.post(`/diaries`, payload);
      }

      setDiary(res.data);

      console.log("存檔成功", res.data);
      alert("已存檔");
      navigate(`/diary`);
    } catch (err) {
      console.error("存檔失敗", err);
      alert("存檔失敗");
    }
  };

  return (
    <main className="pt-8 pb-12">
      <div className="container">
        <hr />
        <div className="row mt-5">
          <div className="col-md-6">
            {/* 左側日記 */}
            <div className="border rounded bg-white p-2">
              <h2 className="p-2 fw-bold">
                <span className="text-decoration-underline">{dayText}</span>
                <span className="fs-6 ms-2">{weekday}</span>
              </h2>
              <form>
                <div className="container my-3 ">
                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control  bg-white"
                        id="title"
                        placeholder="這天過得如何？"
                        value={diary.diaryTitle}
                        onChange={(e) => setDiary({ ...diary, diaryTitle: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <textarea
                        className="form-control  bg-white"
                        id="content"
                        rows={5}
                        maxLength={300}
                        placeholder="心情紀錄區"
                        value={diary.diaryContent}
                        onChange={(e) => setDiary({ ...diary, diaryContent: e.target.value })}
                      />
                      <div className="text-end small text-secondary mt-2">
                        {diary.diaryContent.length} / 300
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-5 form-label border rounded-pill text-center  d-flex align-items-center justify-content-center p-2">
                      選擇代表今天的情緒夥伴
                    </label>
                    <div className="col-sm-7 d-flex flex-wrap">
                      {MOODS.map((m) => (
                        <div className="form-check p-2" key={m.id}>
                          <input
                            className="btn-check"
                            type="radio"
                            name="mood"
                            id={m.id}
                            value={m.id}
                            checked={diary.mood === m.id}
                            onChange={(e) => setDiary({ ...diary, mood: e.target.value })}
                          />
                          <label
                            className="btn btn-sm btn-outline-secondary d-flex flex-column align-items-center"
                            htmlFor={m.id}
                          >
                            <img src={m.icon} alt={m.chName} className="mood-stamp" />
                            <span className="small lh-sm">{m.chName}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-5 form-label border rounded-pill text-center  d-flex align-items-center justify-content-center p-2">
                      選擇代表今天的一張圖片
                    </label>
                    <div className="col-sm-7 d-flex ps-3 ">
                      <input
                        type="file"
                        accept="image/*, text/*"
                        name="file"
                        onChange={imgUpload}
                      />
                    </div>
                  </div>

                  <div className="d-flex">
                    <Link
                      to="/diary"
                      className="btn btn-secondary btn-outline-light mx-3 rounded-pill"
                    >
                      回到日記本
                    </Link>
                    <div className="ms-auto">
                      <button
                        type="button"
                        className="btn btn-primary btn-outline-light ms-2 rounded-pill"
                        onClick={saveDiary}
                      >
                        儲存心情日記
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* 右側 */}
          <div className="col-md-6">
            <div className="border rounded bg-white p-2">
              <h2>日記預覽區</h2>
              {hasContent ? (
                <div className="m-3 p-3 border">
                  <div className="fw-bold">
                    <span className="text-decoration-underline fs-3">{dayText}</span>
                    <span className="fs-6 ms-2">{weekday}</span>
                    <span className="border rounded-pill p-2 ms-3 small fs-6">心情</span>
                    <span className="ms-2">
                      {previewD.mood ? (
                        <img
                          src={getMood(previewD.mood)?.icon}
                          alt={getMood(previewD.mood)?.chName}
                          className="mood-stamp"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="fs-3 mb-3">{previewD.diaryTitle || ""}</div>
                  <div className="mb-3 diary-preview-content">{previewD.diaryContent || ""}</div>
                  <div className="mb-3">
                    {previewD.diaryImg ? (
                      <img
                        src={previewD.diaryImg}
                        alt="preview"
                        className="img-fluid rounded"
                      ></img>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-secondary text-center py-5">請先填寫日記</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditDiary;
