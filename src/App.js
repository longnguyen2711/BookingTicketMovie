import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Propducts from "./pages/Propducts/Propducts";
import Detail from "./pages/Detail/Detail";

import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";

import Checkout from "./pages/Checkout/Checkout";
import { Suspense, lazy } from "react";

const CheckoutTemplateLazy = lazy(() => import("./templates/CheckoutTemplate/CheckoutTemplate"))



export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/products" exact Component={Propducts} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <Route path="/login" exact Component={Login}/>
        <Route path="/register" exact Component={Register}/>

        {/* Suspense: Dữ liệu html load xong mới hiển thị nếu ko sẽ hiển thị h1 */}
        <Suspense fallback={<h1 className="font-bold text-center text-8xl mt-60">LOADING...</h1>}>
          <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout} />
        </Suspense>

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
