import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";

export const UserTemplate = (props) => {
  const { Component, ...restProps } = props; // path, exact, Component

  // Chuyển hướng về đầu trang khi trở lại trang trước đó
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match
        return (
          <Fragment>
            <div
              className="flex justify-center relative min-h-screen max-h-full"
              style={{
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url("/assets/images/bg-login.jpeg")`,
              }}
            > <div className="bg-black bg-opacity-60 absolute top-0 left-0 w-full h-full"></div>
              <Component {...propsRoute} />
            </div>
          </Fragment>
        );
      }}
    />
  );
};

