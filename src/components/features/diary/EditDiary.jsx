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
    id: "2025-02-16",
    day: "02/16",
    weekday: "週一",
    title: "",
    content: "",
    mood: "",
    imageUrl: "",
  };
  const mood = [
    { id: "peaceful", chName: "平靜", emoji: "☺️" },
    { id: "happy", chName: "喜悅", emoji: "😆" },
    { id: "angry", chName: "憤怒", emoji: "😡" },
    { id: "confused", chName: "混亂", emoji: "🤯" },
    { id: "depressed", chName: "低落", emoji: "😔" },
    { id: "collapse", chName: "崩潰", emoji: "😭" },
  ];
  const moodMap = {
    peaceful: "☺️",
    happy: "😆",
    angry: "😡",
    confused: "🤯",
    depressed: "😔",
    collapse: "😭",
  };

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
    const previewURL = URL.createObjectURL(file);
    setDiary({
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

  const saveDiary = (e) => {
    alert("save!!");
  };

  return (
    <main className="bg-BG-01 pt-8 pb-12">
      <div className="container">
        <hr />
        <div className="row mt-5">
          <div className="col-md-6">
            {/* 左側日記 */}
            <div className="border rounded bg-light p-2">
              <h2 className="p-2 fw-bold">
                <span className="text-decoration-underline">{diary.day}</span>
                <span className="fs-6 ms-2">{diary.weekday}</span>
              </h2>
              <form>
                <div className="container my-3">
                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="今天過得如何？"
                        value={diary.title}
                        onChange={(e) =>
                          setDiary({ ...diary, title: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <textarea
                        type="text-area"
                        className="form-control"
                        id="content"
                        rows={5}
                        maxLength={300}
                        placeholder="心情紀錄區"
                        value={diary.content}
                        onChange={(e) =>
                          setDiary({ ...diary, content: e.target.value })
                        }
                      />
                      <div className="text-end small text-secondary mt-2">
                        {diary.content.length} / 300
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-5 form-label border rounded-pill text-center  d-flex align-items-center justify-content-center p-2">
                      選擇代表今天的情緒夥伴
                    </label>
                    <div className="col-sm-7 d-flex flex-wrap">
                      {mood.map((m) => (
                        <div className="form-check" key={m.id}>
                          <input
                            className="btn-check"
                            type="radio"
                            name="mood"
                            id={m.id}
                            value={m.id}
                            checked={diary.mood === m.id}
                            onChange={(e) =>
                              setDiary({ ...diary, mood: e.target.value })
                            }
                          />
                          <label
                            className="btn btn-sm btn-outline-secondary d-flex flex-column align-items-center"
                            htmlFor={m.id}
                          >
                            <span className="fs-5">{m.emoji}</span>
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
                        className="btn btn-secondary btn-outline-light me-2 rounded-pill"
                        onClick={() => setPreviewD(diary)}
                      >
                        預覽
                      </button>
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
            <div className="border rounded bg-light p-2">
              <h2>日記預覽區</h2>
              {previewD ? (
                <div className="m-3 p-3 border">
                  <div className="fw-bold">
                    <span className="text-decoration-underline fs-3">16</span>
                    <span className="fs-6 ms-2">週一</span>
                    <span className="border rounded-pill p-2 ms-3 small fs-6">
                      心情
                    </span>
                    <span className="ms-2">
                      {moodMap[previewD.mood] || "未填"}
                    </span>
                  </div>
                  <div className="fs-3 mb-3">{previewD.title || "未填"}</div>
                  <div className="mb-3">{previewD.content || "未填"}</div>
                  <div className="mb-3">
                    {previewD.imageUrl ? (
                      <img
                        src={previewD.imageUrl}
                        alt="preview"
                        className="img-fluid rounded"
                      ></img>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-secondary text-center py-5">
                  請先填寫日記
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditDiary;
