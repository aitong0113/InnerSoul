import { useState } from "react";
import { moodText } from "./moodText";

function HomeMoodText() {
  const [randomIndex, setRandomIndex] = useState(() =>
    Math.floor(Math.random() * moodText.length)
  );

  const handleChange = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * moodText.length);
    } while (newIndex === randomIndex && moodText.length > 1);
    setRandomIndex(newIndex);
  };

  const text = moodText[randomIndex];

  return (
    <div>
      <div>{text}</div>
      <button onClick={handleChange}>換一換</button>
    </div>
  );
}

export default HomeMoodText;