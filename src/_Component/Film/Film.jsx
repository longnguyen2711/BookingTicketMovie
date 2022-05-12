import React from "react";

export default function Film(props) {
  const { phim } = props;

  return (
    <div className="m-2 h-full bg-gray-100 bg-opacity-75 px-10 py-10 rounded-lg overflow-hidden text-center relative cursor-pointer hover:bg-orange-200">
      <div
        style={{
          background: `url(${phim.hinhAnh}) center 100%, url(https://picsum.photos/1000)` ,
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={phim.hinhAnh}
          alt={phim.tenPhim}
          className="opacity-0 w-full"
          style={{ height: "250px" }}
        />
      </div>
      <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mt-6 h-16">
        {phim.tenPhim}
      </h1>
      <p className="leading-relaxed mb-3 h-12 mb-8">{phim.moTa.length > 120 ? <span>{phim.moTa.slice(0, 120)}...</span> : <span>{phim.moTa}</span>}</p>
      <a className="text-indigo-500 inline-flex items-center">
        Đặt vé
        <svg
          className="w-4 h-4 ml-2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
