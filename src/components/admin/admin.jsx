import React from "react";
import { ImSearch } from "react-icons/im";
import Navbar from "../navbar";
import Standard from "./standards";

const Admin = () => {
  const adminNavnar = [
    { name: "Standards", path: "/standards" },
    { name: "Divisions", path: "/divisions" },
    { name: "Roles", path: "/roles" },
    { name: "UserRoles", path: "/userroles" },
    { name: "Grades", path: "/grades" },
  ];
  return (
    <div className="w-full h-full">
      <div className="w-full h-[12%] flex bg-purple-900">
        <div className="w-[20%] h-full"></div>
        <div className="w-full h-full">
          <Navbar navItems={adminNavnar} />
        </div>
      </div>
      <div className="w-full h-[13%] flex">
        <div className="w-[20%] h-full border-r-2 rcms-logo bg-no-repeat bg-cover"></div>
        <div className="w-full border-b-2 flex justify-end items-center">
          <div className="flex border-2 border-black mr-12 w-[35%] rounded-full p-1">
            <ImSearch className="m-1 mx-3" />
            <input
              type="text"
              placeholder="S e a r c h"
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-25%)] flex">
        <div className="w-[20%] h-full bg-slate-200"></div>
        <div className="w-full h-full">
          {" "}
          <Standard />
        </div>
      </div>
    </div>
  );
};
//export default Admin;
