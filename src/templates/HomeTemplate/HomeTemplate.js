import { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props; // path, exact, Component
  return (<Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return (<Fragment>

            <Header {...propsRoute}/>

            <HomeCarousel {...propsRoute}/>

            <Component {...propsRoute} />

            <footer className="bg-black h-10 text-white">Đây là footer</footer>
          </Fragment>
        );
      }}
    />
  );
};
