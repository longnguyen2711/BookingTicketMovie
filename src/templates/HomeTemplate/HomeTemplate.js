import { Fragment } from "react";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props; // path, exact, Component
  return (<Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return (<Fragment>
            <h1 className="bg-black h-10 text-white">Đây là Homepage</h1>

            <Component {...propsRoute} />

            <footer className="bg-black h-10 text-white">Đây là footer</footer>
          </Fragment>
        );
      }}
    />
  );
};
