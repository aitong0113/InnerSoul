import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { easeInOut, motion } from "motion/react";
import { MOODS } from "../../constants/moods";
import api from "../../services/api";
import axios from "axios";
import { authStore } from "../../services/auth/authStore";
import style from "./editDiary.module.scss";
import cloud from "../../assets/cloud-right.svg";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

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
  const [uploadImg, setUploadImg] = useState(null);
  const [fileName, setFileName] = useState("");
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
        console.error("讀取日記失敗", err);
      }
    };

    loadDiary();
  }, [date, userId]);

  const imgUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file) {
      setFileName(file.name);
    }

    if (diary.diaryImg?.startsWith("blob:")) {
      URL.revokeObjectURL(diary.diaryImg);
    }
    if (!file.type.startsWith("image/")) {
      alert("只能上傳圖片檔案");
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("圖片不能超過 5MB");
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setDiary((prev) => ({ ...prev, diaryImg: previewURL }));
    setUploadImg(file);
  };

  const saveDiary = async () => {
    if (!userId) {
      alert("請先登入");
      return;
    }
    let imageUrl = diary.diaryImg;

    if (uploadImg) {
      const formData = new FormData();
      formData.append("file", uploadImg);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );

        imageUrl = res.data.secure_url;
      } catch (err) {
        console.error(err);
      }
    }

    const now = new Date().toISOString();

    const payload = {
      ...diary,
      diaryImg: imageUrl,
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
      alert("已保存");
      navigate(`/diary`);
    } catch (err) {
      console.error("存檔失敗", err);
      alert("存檔失敗");
    }
  };
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: easeInOut },
    },
  };

  return (
    <main className="bg-liner">
      <motion.section {...fadeIn}>
        <div className="container">
          <div className="h-100 gx-lg-5 mt-5">
            <div className={`${style.diaryBlur}`}>
              <img src={cloud} className={style.cloud} alt="bg-cloud" />
              <div className={`row row-cols-1 row-cols-lg-2 p-3 ${style.diaryCardBottom}`}>
                {/* 左側日記 */}
                <div className="col mb-5 mb-lg-0">
                  <div
                    className={`${style.diaryCard} ${style.diaryCardTop} bg-white px-3 h-100 d-flex flex-column`}
                  >
                    <div className="d-flex flex-column gap-2 flex-grow-1 p-5">
                      <div className="fw-bold d-flex flex-column">
                        <div className="d-flex pb-4 text-black-500 me-4">
                          <span className="fw-bold fs-md-4 fs-5 border-black-500 border-bottom px-1">
                            {dayText}
                          </span>
                          <small className="d-flex align-items-end fs-md-5 fs-6 ms-2 pb-1">
                            {weekday}
                          </small>
                        </div>
                      </div>
                      <form className="d-flex flex-column flex-grow-1">
                        <div className="d-flex flex-column gap-md-2">
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control bg-white fs-md-5 fs-6 mb-3 fw-bold text-primary-05 ${style.formControl}`}
                              id="title"
                              placeholder="這天過得如何？"
                              value={diary.diaryTitle}
                              onChange={(e) => setDiary({ ...diary, diaryTitle: e.target.value })}
                            />
                          </div>

                          <div className="row mb-2">
                            <div className="col-sm-12">
                              <textarea
                                className={`form-control bg-white fs-md-5 fs-6 text-black-700`}
                                id="content"
                                rows={5}
                                maxLength={300}
                                placeholder="心情紀錄區"
                                value={diary.diaryContent}
                                onChange={(e) =>
                                  setDiary({ ...diary, diaryContent: e.target.value })
                                }
                              />
                              <div className="text-end small text-secondary">
                                {diary.diaryContent.length} / 300
                              </div>
                            </div>
                          </div>
                          <div className="d-flex flex-column gap-md-5 gap-4 py-md-5 pb-7">
                            <label
                              className={`${style.onlyMobile} mt-3 form-label mb-lg-0 text-center me-3"`}
                            >
                              <div
                                className={`px-4 py-1 
                               text-primary-05 ${style.moodSpan} ${style.text}`}
                              >
                                <div className="fw-bold">本日情緒夥伴</div>
                              </div>
                            </label>
                            <div
                              className="
                    d-flex flex-column gap-md-3 gap-0 flex-lg-row align-items-center justify-content-between"
                            >
                              <label
                                className={`${style.onlyDesktop} form-label mb-lg-0 text-center me-3`}
                              >
                                <div
                                  className={`px-4 py-1 
                               text-primary-05 ${style.moodSpan} ${style.text}`}
                                >
                                  <div className="fw-bold">本日情緒夥伴</div>
                                </div>
                              </label>
                              <div className="row g-8">
                                {MOODS.map((m) => (
                                  <div
                                    className={`col-2 d-flex justify-content-center ${style.formCheck}`}
                                    key={m.id}
                                  >
                                    <input
                                      className={`btn-check ${style.checked}`}
                                      type="radio"
                                      name="mood"
                                      id={m.id}
                                      value={m.id}
                                      checked={diary.mood === m.id}
                                      onChange={(e) => setDiary({ ...diary, mood: e.target.value })}
                                    />
                                    <label
                                      type="button"
                                      className={`${style.moodBtn} d-flex flex-column justify-content-center align-items-center`}
                                      htmlFor={m.id}
                                    >
                                      <img
                                        src={m.icon}
                                        alt={m.chName}
                                        className={style.moodStamp}
                                      />
                                      <span className={`${style.moodText} `}>{m.chName}</span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-2 mb-3">
                              <div
                                className={`px-4 py-1 
                               text-primary-05 me-1 ${style.moodSpan} ${style.text}`}
                              >
                                <span className="fw-bold">本日代表圖片</span>
                              </div>
                              <label
                                type="button"
                                htmlFor="uploadImg"
                                className={`form-label mb-0 d-flex text-center mx-md-2 p-1 ${style.uploadBtn}`}
                              >
                                選擇
                              </label>
                              {fileName && <small className="text-muted">{fileName}</small>}
                              <input
                                id="uploadImg"
                                type="file"
                                accept="image/*"
                                name="file"
                                className={style.uploadInput}
                                onChange={imgUpload}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="d-flex mt-auto justify-content-between">
                          <div>
                            <Link to="/diary">
                              <button
                                type="button"
                                className={`${style.btnText} custom-btn-outline`}
                              >
                                返回
                              </button>
                            </Link>
                          </div>
                          <div className="ms-auto">
                            <button
                              type="button"
                              className={`${style.btnText} custom-btn-filled`}
                              onClick={saveDiary}
                            >
                              儲存
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* 右側 */}
                <div className="col mt-5 mt-lg-0">
                  <div className={`${style.diaryCard} ${style.diaryCardTop} bg-white  h-100 px-3`}>
                    <div className="d-flex align-items-center justify-content-center fw-bold fs-4 text-center text-primary-04 border-bottom pt-2 pb-1 mx-5">
                      <span className="my-2">日記預覽區</span>
                    </div>
                    {hasContent ? (
                      <div className="m-2 p-3 d-flex flex-column h-100">
                        <div className="d-flex align-items-center text-black-500 me-4 fw-bold ">
                          <span className="fs-md-4 fs-5 border-black-500 border-bottom px-1 ">
                            {dayText}
                          </span>
                          <small className="d-flex align-items-end fs-md-5 fs-6 ms-2 pb-1">
                            {weekday}
                          </small>
                          <span className="border border-primary-03 rounded-pill p-2 ms-3 small fs-6 text-primary-05">
                            心情
                          </span>
                          <span className="ms-2">
                            {previewD.mood ? (
                              <img
                                src={getMood(previewD.mood)?.icon}
                                alt={getMood(previewD.mood)?.chName}
                                className={style.moodStamp}
                              />
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                        <div className="fs-md-4 fs-5 my-3 fw-bold text-primary-05">
                          {previewD.diaryTitle || ""}
                        </div>
                        <div className={`d-flex flex-column justify-content-stretch gap-5 `}>
                          <div
                            className={`my-2 fs-md-5 fs-6 text-black-700 ${style.diaryPreviewContent}`}
                          >
                            {previewD.diaryContent || ""}
                          </div>
                          <div className="mb-3">
                            {previewD.diaryImg ? (
                              <img
                                src={previewD.diaryImg}
                                alt="preview"
                                className={`${style.diaryImg}`}
                              ></img>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex h-75 flex-column justify-content-center">
                        <div className="text-black-500 fs-5 text-center my-5 p-5">
                          \ 留下一點痕跡，讓時間不只是流逝 /
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

export default EditDiary;
