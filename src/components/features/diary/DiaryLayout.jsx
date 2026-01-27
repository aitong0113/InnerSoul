import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import "./diaryLayout.scss";

const DiaryLayout = ({
  year_month = "",
  weeks = [],
  diaryMood = "",
  renderMood = () => null,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  diaryDate = "",
  weekday = "",
  diaryTitle = "",
  diaryContent = "",
  diaryImg = "",
  footer = "",
}) => {
  const canPrev = typeof onPrevMonth === "function";
  const canNext = typeof onNextMonth === "function";
  const canSelect = typeof onSelectDate === "function";

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 diary-blur">
          <div className="diary-card-bottom">
            <div className="d-flex flex-column flex-lg-row p-3 gap-2 card-position">
              {/* 左側月曆 */}
              <div className="diary-card-top diary-left col-lg-6 d-flex flex-column justify-content-between p-7">
                <div className="d-flex flex-column gap-3 ">
                  <h4 className="text-primary-04 text-center fw-bold">{year_month}</h4>
                  <table className="text-center my-3">
                    <thead>
                      <tr>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                      </tr>
                    </thead>
                    <tbody className="fs-sm">
                      {weeks.map((week, rowIndex) => (
                        <tr key={rowIndex}>
                          {week.map((cell, colIndex) => (
                            <td key={colIndex}>
                              <div
                                className={`cal-cell d-flex flex-column align-items-center gap-1 ${
                                  canSelect ? "cursor-pointer" : ""
                                }`}
                                onClick={() => canSelect && onSelectDate(cell)}
                                role={canSelect ? "button" : undefined}
                                tabIndex={canSelect ? 0 : undefined}
                              >
                                <div className="cal-date">{cell.date ?? ""}</div>
                                <div className="cal-mood">
                                  {cell?.mood ? (
                                    renderMood(cell.mood)
                                  ) : (
                                    <span className="mood-placeholder" />
                                  )}
                                </div>
                              </div>
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
                    className="calendar-btn my-3 "
                    onClick={onPrevMonth}
                    disabled={!canPrev}
                  >
                    <IconArrowNarrowLeft size={24} className="calendar-arrow" />
                  </button>
                  <button
                    type="button"
                    className="calendar-btn my-3 "
                    onClick={onNextMonth}
                    disabled={!canNext}
                  >
                    <IconArrowNarrowRight size={24} className="calendar-arrow" />
                  </button>
                </div>
              </div>
              {/* 右側日記 */}
              <div className="diary-card-top diary-right col-lg-6 p-7 d-flex flex-column justify-content-between">
                <div>
                  <div className="mb-5 fw-bold text-black-500">
                    <span className="fw-bold h5">{diaryDate}</span>
                    <small className="fs-6 ms-2">{weekday}</small>
                    {diaryMood ? (
                      <span className="border rounded-pill p-2 ms-3 small fs-6"> 心情</span>
                    ) : null}
                    <span className="ms-2">{diaryMood ? renderMood(diaryMood) : null}</span>
                  </div>
                  <h5 className="text-primary-05 fw-bold">{diaryTitle}</h5>
                  <p className="diary-text">{diaryContent}</p>

                  {diaryImg ? <img src={diaryImg} alt="日記圖" className="diary-img" /> : null}
                </div>

                {footer ? (
                  <div className="d-flex justify-content-end  mt-4 mt-lg-0">{footer}</div>
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
