import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import RMSlogo from "../../images/RMSlogo.png";

const classTeacherMenuList = [
  {
    title: "Students",
    to: "students",
  },
  {
    title: "Reports",
    to: "reports",
  },
];

export const ClassTeacherDashboard = () => {
  return (
    <div className=" h-screen w-full mx-auto flex justify-center">
      <div className="flex flex-col bg-[#F3F3F3] h-full" style={{ flex: "1" }}>
        <div className="w-full h-[10%] bg-slate-500"></div>
        <div className="w-full h-[11%] bg-white border-r-2 ">
          <img src={RMSlogo} alt="RMSlogo" className=" h-full object-cover" />
        </div>
      </div>
      <div className="flex flex-col bg-white h-full" style={{ flex: "5" }}>
        <Navbar menuList={classTeacherMenuList} role={"Class Teacher"} />
        <Outlet />
      </div>
    </div>
  );
};
