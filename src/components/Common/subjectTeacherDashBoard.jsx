import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import RMSlogo from "../../images/RMSlogo.png";

const subjectTeacherMenuList = [
  {
    title: "Test",
    to: "tests",
  },
  {
    title: "Result",
    to: "results",
  },
];

export const SubjectTeacherDashboard = () => {
  return (
    <div className=" h-screen w-full mx-auto flex justify-center">
      <div className="flex flex-col bg-[#F3F3F3]" style={{ flex: "1" }}>
        <div className="w-full h-[10%] bg-slate-500"></div>
        <div className="w-full h-20 bg-white border-r-2 ">
          <img src={RMSlogo} alt="RMSlogo" className=" h-full object-cover" />
        </div>
      </div>
      <div className="flex flex-col bg-white" style={{ flex: "5" }}>
        <Navbar menuList={subjectTeacherMenuList} role={"Subject Teacher"} />
        <Outlet />
      </div>
    </div>
  );
};
