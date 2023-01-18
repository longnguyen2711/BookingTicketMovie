import React from "react";
import "./News.css";

export default function News(props) {
  return (
    <div
      id = "news"
      className="pb-96"
      style={{
        backgroundImage: `url("/assets/images/bg-home-page.jpeg")`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      News
    </div>
  );
}
