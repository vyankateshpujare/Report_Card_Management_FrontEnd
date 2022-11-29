import React from "react";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import SignInImage from "../../images/signin.jpg";
import { useState } from "react";
import { loadLogin, loginUser } from "../../actions/loginAction";
import { getAllUserRoles } from "../../actions/adminActions/userRoleAction";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup.string().required("Please enter email").min(5).max(50),
  password: yup.string().required("Please enter password").min(8).max(1024),
});

export function getLoaderData({ params }) {
  return params.role;
}

const Login = (props) => {
  const { showForm } = props;
  const role = useLoaderData();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showForgotFormPopUp, setShowForgotFormPopUp] = useState(false);
  const token = useSelector((state) => state.loginReducer.token);
  const userRoles = useSelector((state) => state.userRoleReducer.userRoles);

  useEffect(() => {
    dispatch(getAllUserRoles());
    dispatch(loadLogin());
  }, []);

  useEffect(() => {
    dispatch(getAllUserRoles());
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.isAdmin === true) {
        navigate("/admin");
      } else {
        const userRole = userRoles.find((ur) => ur.user._id === decoded._id);
        if (userRole) {
          let role = userRole.role.role.toLowerCase();
          navigate(`/${role}`);
        } else {
          errorMesage("Access Denied...");
        }
      }
    }
  }, [token]);

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleEmailValidation = ({ target }) => {};

  const handleLoginSubmission = (data) => {
    dispatch(loginUser(data));
  };

  const errorMesage = (message) =>
    toast.error(message, {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });
  return (
    <>
      <div className="h-full w-full  bg-no-repeat bg-cover flex  items-center rounded-3xl shadow-lg bg-white">
        <div className="w-1/2 h-full p-1">
          <div className="h-[85%] object-cover">
            <img src={SignInImage} alt="" className="h-[90%] w-full" />
          </div>
          <div className="h-[15%] flex justify-around">
            <NavLink
              to="/forgotpassword"
              className="ml-4 no-underline font-bold text-gray-600"
            >
              Forgot Password?
            </NavLink>
          </div>
        </div>
        <div className="w-1/2 h-full p-2">
          <div className="flex h-full justify-center items-center p-3">
            <form
              action=""
              className="w-full"
              onSubmit={handleSubmit(handleLoginSubmission)}
            >
              <div className="flex justify-end ">
                <span
                  className=" flex justify-center items-center text-white mr-3  h-10 w-10 rounded-full bg-black cursor-pointer"
                  style={{ fontSize: "22px" }}
                  onClick={() => showForm(false)}
                >
                  X
                </span>
              </div>
              <div className="mb-5 flex justify-start">
                <h3 className="font-bold">LogIn</h3>
              </div>
              <div className="flex items-center border-b border-teal-500 ">
                <label htmlFor="">
                  <MdEmail size={25} />
                </label>
                <input
                  className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
                  placeholder="Enter email"
                  type="email"
                  onChange={handleEmailValidation}
                  {...register("email")}
                />
              </div>
              <div className="h-6 text-red-400">{errors.email?.message}</div>
              <div className="flex items-center border-b border-teal-500">
                <label htmlFor="">
                  <FaKey size={25} />
                </label>
                <input
                  className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
                  placeholder="Enter password"
                  type="password"
                  {...register("password")}
                />
              </div>
              <div className="h-6 text-red-400">{errors.password?.message}</div>
              <div className="flex justify-end">
                <input
                  type="submit"
                  value="LOGIN"
                  className="bg-teal-500 mt-4 text-white text-sm rounded-lg  block w-[40%] px-2.5 py-3 font-bold"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
