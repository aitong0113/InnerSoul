import style from "./diaryState.module.scss";

export default function DiaryWriteBlocked() {
  return (
    <div
      className={`${style.desktopMargin} d-flex flex-grow-1 justify-content-center align-items-center`}
    >
      <div className="text-black-500 fs-6 fs-md-5 text-center">
        \ 未來的故事，就交給未來的自己 /
      </div>
    </div>
  );
}
