import { useState } from "react";
import { moodText } from "./moodText";
import { getMoodText } from "./getMoodText";

function HomeMoodText() {
  // 初始化隨機文字
  const [text, setText] = useState(getMoodText());

  const handleChange = () => {
    setText(getMoodText());
  };

  return (
    <div className="mood-text">
      <div>{text}</div>
      <button onClick={handleChange}>換一換</button>
    </div>
  );
}

export default HomeMoodText;