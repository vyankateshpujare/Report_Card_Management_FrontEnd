import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import profileImage from "../../images/profileImage.jpg";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { getCurrentUser } from "../../actions/userAction";
import { UserProfile } from "./userProfile";

const Navbar = (props) => {
  const { menuList, role } = props;
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const token = useSelector((state) => state.loginReducer.token);
  const user = useSelector((state) => state.userReducer.currentUser);
  const decoded = jwt_decode(token);

  useEffect(() => {
    if (decoded._id) {
      dispatch(getCurrentUser(decoded._id));
    }
  }, [token]);

  return (
    <div className="w-full h-[10%] bg-slate-500 flex items-end justify-between">
      <div className="flex items-end h-full" style={{ fontSize: "20px" }}>
        {menuList.map((menuItem) => {
          return (
            <NavLink
              key={menuItem.to}
              to={menuItem.to}
              className="mr-2 h-full flex items-center px-4 font-semibold no-underline"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#EEEAF1" : "",
                  color: isActive ? "#000000" : "#EEEAF1",
                };
              }}
            >
              {menuItem.title}
            </NavLink>
          );
        })}
      </div>
      <div className="w-48 h-full flex items-center justify-evenly mr-4">
        <div className="flex flex-col items-end justify-center text-sm ">
          <span className="text-[#EEEAF1]">
            <h6>{user.firstName + " " + user.lastName}</h6>
          </span>
          <span className="text-[#c7c3c9] italic">{role}</span>
        </div>
        <div className="w-14 h-14 overflow-clip rounded-full border-2 border-[#cac6cd]">
          <img
            src={profileImage}
            alt="profile image"
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => setShowProfile(true)}
          />
        </div>
      </div>
      <div
        className={` absolute w-[20%] h-[40%] mt-10 top-14 bg-slate-100 right-0 mr-4 shadow rounded-lg p-2 ${
          showProfile ? "block" : "hidden"
        }`}
      >
        <div
          onClick={() => setShowProfile(false)}
          className="flex justify-end pr-4 cursor-pointer pt-2"
        >
          X
        </div>
        <UserProfile
          firstName={user.firstName}
          lastName={user.lastName}
          profileImage={profileImage}
          email={user.email}
        />
      </div>
    </div>
  );
};

export default Navbar;
