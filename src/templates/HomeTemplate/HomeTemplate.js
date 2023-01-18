import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props; // path, exact, Component

  // Chuyển hướng về đầu trang khi trở lại trang trước đó
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match
        return (
          <Fragment>
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};
