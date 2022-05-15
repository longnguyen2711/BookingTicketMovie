import { Fragment } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props; // path, exact, Component
  return (<Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return (<Fragment>
            <Header {...propsRoute}/>            
            <Component {...propsRoute} />
            {/* <hr className="mt-5"/> */}
            <Footer {...propsRoute}/>
          </Fragment>
        );
      }}
    />
  );
};
