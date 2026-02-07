import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import style from "./diaryLayout.module.scss";

const DiaryLayout = ({
  year_month = "",
  weeks = [],
  diaryMood = "",
  renderMood = () => null,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  selectedDay = null,
  diaryDate = "",
  weekday = "",
  diaryTitle = "",
  diaryContent = "",
  diaryImg = "",
  loading = false,
  footer = "",
}) => {
  const canPrev = typeof onPrevMonth === "function";
  const canNext = typeof onNextMonth === "function";
  const canSelect = typeof onSelectDate === "function";

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className={`col-12 ${style.diaryBlur}`}>
          <div className={style.diaryCardBottom}>
            <div className={`d-flex flex-column flex-lg-row p-3 gap-2 ${style.cardPosition}`}>
              {/* 左側月曆 */}
              <div
                className={`${style.diaryCardTop} ${style.diaryLeft} col-lg-6 d-flex flex-column justify-content-between p-7`}
              >
                <div className="d-flex flex-column ps-4">
                  <h4 className="text-primary-04 text-center fw-bold">{year_month}</h4>
                  <table className={`text-center my-3 ${style.calendarTable}`}>
                    <thead className="text-primary-05 fs-5">
                      <tr>
                        <th className="text-start ps-4">日</th>
                        <th className="text-start ps-4">一</th>
                        <th className="text-start ps-4">二</th>
                        <th className="text-start ps-4">三</th>
                        <th className="text-start ps-4">四</th>
                        <th className="text-start ps-4">五</th>
                        <th className="text-start ps-4">六</th>
                      </tr>
                    </thead>
                    <tbody className="fs-sm">
                      {weeks.map((week, rowIndex) => (
                        <tr key={rowIndex}>
                          {week.map((cell, colIndex) => (
                            <td key={colIndex}>
                              {(() => {
                                const isSelectable = canSelect && !!cell?.date;
                                const isSelected = !!cell?.date && cell.date === selectedDay;

                                const hasDate = !!cell?.date;
                                const hasMood = !!cell?.mood;
                                const isNoMoodDate = hasDate && !hasMood;
                                return (
                                  <div
                                    className={`${style.calCell} d-flex flex-column align-items-center  ${
                                      isSelectable ? "cursor-pointer" : ""
                                    } ${isSelectable ? style.calCellSelectable : ""} ${
                                      isSelected ? style.calCellSelected : ""
                                    } ${!cell?.date ? style.calCellDisabled : ""}`}
                                    onClick={() => isSelectable && onSelectDate(cell)}
                                    role={isSelectable ? "button" : undefined}
                                    tabIndex={isSelectable ? 0 : undefined}
                                  >
                                    <div
                                      className={`w-100 text-start ms-3 ps-1 ${style.calDate} ${
                                        isNoMoodDate ? style.calDateNoMood : ""
                                      }`}
                                    >
                                      {cell.date ?? ""}
                                    </div>
                                    <div className={`${style.moodStamp} ${style.calMood}`}>
                                      {cell?.mood ? (
                                        renderMood(cell.mood)
                                      ) : (
                                        <span className={style.moodPlaceholder} />
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className={`${style.calendarBtn}`}
                    onClick={onPrevMonth}
                    disabled={!canPrev}
                  >
                    <IconArrowNarrowLeft size={24} className={style.calendarArrow} />
                  </button>
                  <button
                    type="button"
                    className={`${style.calendarBtn}`}
                    onClick={onNextMonth}
                    disabled={!canNext}
                  >
                    <IconArrowNarrowRight size={24} className={style.calendarArrow} />
                  </button>
                </div>
              </div>
              {/* 右側日記 */}
              <div
                className={`${style.diaryCardTop} ${style.diaryRight} col-lg-6 p-7 d-flex flex-column justify-content-between`}
              >
                <div className="mb-5 fw-bold text-primary-05">
                  <span className="fw-bold h5">{diaryDate}</span>
                  <small className="fs-6 ms-2">{weekday}</small>
                  {diaryMood ? (
                    <>
                      <span className="border border-light rounded-pill p-2 ms-3 small fs-6">
                        心情
                      </span>
                      <span className={`ms-2 ${style.moodStamp}`}>
                        {diaryMood ? renderMood(diaryMood) : null}
                      </span>
                    </>
                  ) : null}
                </div>

                <div className="d-flex flex-column flex-grow-1">
                  {loading ? (
                    <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                      <p className={style.diaryText}>讀取中...</p>
                    </div>
                  ) : (
                    <>
                      <div className="d-flex flex-column flex-grow-1">
                        <h5 className="text-primary-05 fw-bold my-3">{diaryTitle}</h5>
                        <div
                          className={`d-flex flex-column flex-grow-1 ${
                            typeof diaryContent === "string"
                              ? `justify-content-start ${style.diaryText}`
                              : "justify-content-center"
                          }`}
                        >
                          {diaryContent}
                        </div>
                      </div>
                      <div className="my-5">
                        {diaryImg ? (
                          <img src={diaryImg} alt="日記圖" className={`mb-5 ${style.diaryImg}`} />
                        ) : null}
                      </div>
                    </>
                  )}
                </div>

                {footer ? (
                  <div className="d-flex justify-content-end my-4 mt-lg-0">{footer}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DiaryLayout;
