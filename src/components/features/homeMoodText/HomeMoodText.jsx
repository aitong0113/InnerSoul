import React from "react";

const HomeMoodText = ({ text }) => {
  return (
    <div key={text} className="mood-text fade-in-out">
      <p>{text}</p>
    </div>
  );
};

export default HomeMoodText;