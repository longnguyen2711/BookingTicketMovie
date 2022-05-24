import HistoryBooking from "./pages/Admin/Profile/HistoryBooking/HistoryBooking";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import EditProfile from "./pages/Admin/Profile/EditFrofile/EditProfile";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import AddNewFilm from "./pages/Admin/AddNewFilm/AddNewFilm";
import EditUser from "./pages/Admin/User/EditUser/EditUser";
import ListUser from "./pages/Admin/User/ListUser/ListUser";
import AddUser from "./pages/Admin/User/AddUser/AddUser";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import EditFilm from "./pages/Admin/EditFilm/EditFilm";
import Profile from "./pages/Admin/Profile/Profile";
import Propducts from "./pages/Propducts/Propducts";
import Loading from "./_Component/Loading/Loading";
import Checkout from "./pages/Checkout/Checkout";
import Register from "./pages/Register/Register";
import { createBrowserHistory } from "history";
import Contact from "./pages/Contact/Contact";
import Films from "./pages/Admin/Films/Films";
import Detail from "./pages/Detail/Detail";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import "./App.css";

// import { Suspense, lazy } from "react";



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

        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        {/* Suspense: Dữ liệu html load xong mới hiển thị nếu ko sẽ hiển thị h1 */}
        {/* <Suspense fallback={<h1 className="font-bold text-center text-8xl mt-60">LOADING...</h1>}>
          <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}

        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/login" exact Component={Login} />

        <AdminTemplate path="/admin" exact Component={Films} />
        <AdminTemplate path="/admin/profile" exact Component={Profile} />
        <AdminTemplate path="/admin/profile/editprofile" exact Component={EditProfile} />
        <AdminTemplate path="/admin/profile/historybooking" exact Component={HistoryBooking} />
        <AdminTemplate path="/admin/user/listuser" exact Component={ListUser} />
        <AdminTemplate path="/admin/user/adduser" exact Component={AddUser} />
        <AdminTemplate path="/admin/user/edituser" exact Component={EditUser} />

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
