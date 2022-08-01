import React from "react";
import end from "../../assets/end.png";
import "./EndComponent.css";
const EndComponent = () => {
  return (
    <div className="ei289EndContainer">
      <img src={end} alt="end" className="ei345EndImage" />
      <h4>You have reached the end</h4>
    </div>
  );
};

export default EndComponent;
