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
import Profile from "./pages/Profile/Profile";

import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import DashBoard from "./pages/Admin/DashBoard/DashBoard";
import Films from "./pages/Admin/Films/Films";
import Loading from "./_Component/Loading/Loading";
import AddNewFilm from "./pages/Admin/AddNewFilm/AddNewFilm";

import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";

import Checkout from "./pages/Checkout/Checkout";
// import { Suspense, lazy } from "react";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import EditFilm from "./pages/Admin/EditFilm/EditFilm";





// const CheckoutTemplateLazy = lazy(() => import("./templates/CheckoutTemplate/CheckoutTemplate"))
export const history = createBrowserHistory();


function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/products" exact Component={Propducts} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile" exact Component={Profile} />        

        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        {/* Suspense: Dữ liệu html load xong mới hiển thị nếu ko sẽ hiển thị h1 */}
        {/* <Suspense fallback={<h1 className="font-bold text-center text-8xl mt-60">LOADING...</h1>}>
          <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}

        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/login" exact Component={Login} />

        <AdminTemplate path="/admin" exact Component={Films} />
        <AdminTemplate path="/admin/users" exact Component={DashBoard} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/editfilm/:id" exact Component={EditFilm} />
        <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={ShowTime} />
        <AdminTemplate path="/admin/addnewfilm" exact Component={AddNewFilm} />

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
