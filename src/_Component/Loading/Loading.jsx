import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Loading(props) {
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  return (
    <Fragment>
      {isLoading ? (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black"
          style={{ backgroundColor: "rgba(0,0,0,1)" }}
        >
          <img
            style={{ width: "400px" }}
            src="https://www.mesanationalhq.com/admin/postimages/265def50d8be004698739c6718f6a03a.gif"
            alt="loading-gif"
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
