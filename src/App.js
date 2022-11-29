import logo from "./logo.svg";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { loadLogin } from "./actions/loginAction";
import { getAllUserRoles } from "./actions/adminActions/userRoleAction";
import jwt_decode from "jwt-decode";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginReducer.token);
  const userRoles = useSelector((state) => state.userRoleReducer.userRoles);

  // useEffect(() => {
  //   // dispatch(loadLogin());
  //   dispatch(getAllUserRoles());
  // }, []);

  // useEffect(() => {
  //   if (token) {
  //     if (userRoles.length != 0) {
  //       const decoded = jwt_decode(token);
  //       if (decoded.isAdmin === true) {
  //         navigate("/admin");
  //       } else {
  //         const userRole = userRoles.find((ur) => ur.user._id === decoded._id);
  //         let role = userRole?.role?.role?.toLowerCase();
  //         navigate(`/${role}`);
  //       }
  //     }
  //   }
  // }, [token, userRoles]);

  return (
    <>
      <Outlet />
      <ToastContainer/>
    </>
  );
}

export default App;
