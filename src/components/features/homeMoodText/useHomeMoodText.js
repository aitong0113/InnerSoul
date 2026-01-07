import { useState } from "react";

const useHomeMoodText = () => {
  const moodTexts = [
    "今天也慢慢來就好。",
    "你已經做得很努力了。",
    "允許自己休息一下。",
    "世界不急，你也不用急。",
  ];

  const [currentText, setCurrentText] = useState(moodTexts[0]);

  const changeMoodText = () => {
    const randomIndex = Math.floor(Math.random() * moodTexts.length);
    setCurrentText(moodTexts[randomIndex]);
  };

  return {
    currentText,
    changeMoodText,
  };
};

export default useHomeMoodText;
