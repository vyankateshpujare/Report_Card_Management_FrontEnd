import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch, BiPlusCircle } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteRole, getAllRoles } from "../../actions/adminActions/roleAction";
import { DeletePopUp } from "../Common/deletePopUp";

const Roles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchRoles, setSearchRoles] = useState();
  const [deleteId, setDeleteId] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const roles = useSelector((state) => state.roleReducer.roles);

  useEffect(() => {
    dispatch(getAllRoles({ role: searchRoles }));
  }, []);

  const handleSearchRole = ({ target }) => {
    setSearchRoles(target.value);
    dispatch(getAllRoles({ role: target.value }));
  };

  const handleDeleteRole = () => {
    dispatch(deleteRole(deleteId));
    navigate("/admin/roles");
  };

  const handleDeletePopUp = (id) => {
    setShowDeletePopUp(true);
    setDeleteId(id);
  };

  return (
    <div>
      <div className="w-full h-20 bg-white flex justify-end items-center">
        <div className="border-2 w-1/3 h-8 px-5 flex items-center rounded-full mr-4">
          <BiSearch size={20} className="mr-2 text-gray-500" />
          <input
            type="text"
            name="search"
            id="search"
            className="w-[90%] h-full outline-none"
            onChange={""}
          />
        </div>
      </div>
      <div className="border-t-2 p-10 h-full">
        <div className="flex items-center justify-between  ">
          <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 mb-1">
            <label
              htmlFor=""
              className="flex ml-8 mt-1 items-center text-gray-500"
            >
              Role
              <input
                type="text"
                name=""
                id=""
                className="ml-6 py-1 px-3 border-2 border-gray-300 rounded"
                // placeholder="Search ... "
                onChange={handleSearchRole}
              />
            </label>
          </div>
          <NavLink to="/admin/addRole" className="w-[14%]">
            <button
              type="submit"
              className="h-20 px-3 text-xs w-full rounded-lg bg-slate-500 text-white flex flex-col items-center justify-center"
            >
              <BiPlusCircle size={20} />
              <span>
                <h6>Add Role</h6>
              </span>
            </button>
          </NavLink>
        </div>
        {roles.map((r) => (
          <div className="flex items-center justify-between " key={r?._id}>
            <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 flex justify-between">
              <label
                htmlFor=""
                className="flex  items-center ml-8 text-gray-500"
              >
                Role
                <span className="text-gray-700 ml-8">{r.role}</span>
              </label>
            </div>
            <div className="h-20 px-3 my-1 text-xs w-[14%] rounded-lg bg-gray-100 text-white flex items-center justify-evenly">
              <NavLink to={`/admin/updateRole/${r._id}`}>
                <FiEdit
                  size={15}
                  className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                />
              </NavLink>
              <FiTrash2
                size={15}
                className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                onClick={() => handleDeletePopUp(r._id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className={` absolute w-[400px] h-[250px] mt-10 bottom-0 bg-gray-600 right-0 mr-6 mb-6 shadow rounded-lg p-2 ${
          showDeletePopUp ? "block" : "hidden"
        }`}
      >
        <DeletePopUp
          onShowPopUp={setShowDeletePopUp}
          onDelete={handleDeleteRole}
        />
      </div>
    </div>
  );
};

export default Roles;
