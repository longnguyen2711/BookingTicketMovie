import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";

const CheckoutTemplate = (props) => {
  const { Component, ...restProps } = props; // path, exact, Component

    // Kiểm tra trong localStorage, nếu chưa đăng nhập thì đưa đến trang login bằng thẻ Redirect
    // if(!localStorage.getItem(USER_LOGIN)){
    //     return <Redirect to='/login'/>
    // }

  return (<Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return (<Fragment>
            <Component {...propsRoute}/>

          </Fragment>
        );
      }}
    />
  );
};

export default CheckoutTemplate;
