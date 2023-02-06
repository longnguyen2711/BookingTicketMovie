import { useSelector } from "react-redux";
import React, { Fragment } from "react";

export default function Loading(props) {
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  return (
    <Fragment>
      {isLoading ? (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black"
          style={{ backgroundColor: "rgba(34,34,34,1)" }}
        >
          <img
            style={{ width: "500px" }}
            src="https://i0.wp.com/codemyui.com/wp-content/uploads/2017/09/rotate-pulsating-loading-animation.gif?fit=880%2C440&ssl=1"
            alt="loading-gif"
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
