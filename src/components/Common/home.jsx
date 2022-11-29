import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeImage from "../../images/home1.webp";
import Login from "./login";
import { Register } from "./register";

const Home = () => {
  const [showRegisterFormPopUp, setShowRegisterFormPopUp] = useState(false);
  const [showLoginFormPopUp, setShowLoginFormPopUp] = useState(false);

  const handleLogin = () => {
    setShowRegisterFormPopUp(false);
    setShowLoginFormPopUp(true);
  };

  const handleRegister = () => {
    setShowLoginFormPopUp(false);
    setShowRegisterFormPopUp(true);
  };

  const handleHome = () => {
    setShowLoginFormPopUp(false);
    setShowRegisterFormPopUp(false);
  };

  return (
    <div className="h-screen w-full bg-cover bg-no-repeat">
      <nav className="p-3 border-gray-300 h-[15%] rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 shadow">
        <div className=" flex flex-wrap items-center ">
          <div className="w-[60%] mr-48">
            <span
              className="self-center  font-bold whitespace-nowrap py-3 px-8 rounded-tr-full rounded-bl-full shadow  border-4 border-yellow-400 text-slate-700 bg-white"
              style={{ fontSize: "30px" }}
            >
              Report Card Management
            </span>
          </div>

          <div
            className="w-full flex justify-end md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul
              className="flex  mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
              style={{ fontSize: "20px" }}
            >
              <li>
                <NavLink
                  to="/"
                  className="block py-3 px-4 text-gray-700 rounded-full no-underline border-gray-300 border-2 hover:bg-white hover:border-yellow-500 hover:text-yellow-700 shadow-sm"
                  onClick={handleHome}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  className="block py-3 px-4 text-gray-700 rounded-full no-underline border-gray-300 border-2 hover:bg-white hover:border-yellow-500 hover:text-yellow-700"
                  onClick={handleRegister}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  className="block py-3 px-4 text-gray-700 rounded-full no-underline border-gray-300 border-2 hover:bg-white hover:border-yellow-500 hover:text-yellow-700"
                  onClick={handleLogin}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="h-[82%] mt-3 flex">
        <div className="w-[50%] h-full  flex items-center ">
          <img src={HomeImage} alt="" className="w-[65%] h-[98%]" />
          <div
            className="flex justify-end w-[35%] font-semibold"
            style={{ fontSize: "20px" }}
          >
            <div className="bg-gray-100 rounded-l-full h-48 pl-3 pt-3 pb-3 drop-shadow-[0_10px_0px_rgba(0,0,0,0.25)]">
              <div
                className="flex justify-end font-bold mb-3 text-orange-700  "
                style={{ fontSize: "27px" }}
              >
                Report Card Gen
              </div>
              <div>(RCMS) is highly flexible and c</div>
              <div className="flex justify-end">
                {" "}
                to facilitate teachers to g
              </div>
              <div className="flex  justify-end">stud</div>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-full bg-gray-100 flex items-center">
          <div
            className="flex justify-start w-[30%] font-semibold"
            style={{ fontSize: "20px" }}
          >
            <div className="text-slate-700 bg-white rounded-r-full h-48 pr-4 pt-3 pb-3 drop-shadow-[0_10px_0px_rgba(0,0,0,0.25)] ">
              <div
                className="font-bold mb-3 text-orange-700"
                style={{ fontSize: "27px" }}
              >
                {" "}
                eration System
              </div>
              <div>onfigurable web application</div>
              <div>enerate report cards of</div>
              <div>ents</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={` absolute w-[900px] h-[550px]  bottom-10 bg-gray-300 left-1/3 mr-10  shadow-lg rounded-3xl  ${
          showRegisterFormPopUp ? "block" : "hidden"
        }`}
      >
        <Register showForm={setShowRegisterFormPopUp} />
      </div>
      <div
        className={` absolute w-[720px] h-[400px]  bottom-20 bg-gray-300 left-1/3 rounded-3xl mr- mb-6 shadow-lg shadow-balck  ${
          showLoginFormPopUp ? "block" : "hidden"
        }`}
      >
        <Login showForm={setShowLoginFormPopUp} />
      </div>
    </div>
  );
};

export default Home;
