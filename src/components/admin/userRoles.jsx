import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch, BiPlusCircle } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  deleteUserRole,
  getAllUserRoles,
  getTotalUserRoles,
} from "../../actions/adminActions/userRoleAction";
import { DeletePopUp } from "../Common/deletePopUp";
import Pagination from "../Common/pagination";

const UserRoles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [searchUser, setSearchUser] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const userRoles = useSelector((state) => state.userRoleReducer.userRoles);
  const totalNoOfUserRoles = useSelector(
    (state) => state.userRoleReducer.totalNoOfUserRoles
  );
  useEffect(() => {
    dispatch(
      getAllUserRoles({
        user: searchUser,
        role: searchRole,
        pageSize,
        currentPage,
      })
    );
    dispatch(getTotalUserRoles({ user: searchUser, role: searchRole }));
  }, []);

  const handleSearchUser = ({ target }) => {
    setSearchUser(target.value);
    if (target.value == "") {
      dispatch(
        getAllUserRoles({
          user: target.value,
          role: searchRole,
          pageSize,
          currentPage,
        })
      );
    } else {
      dispatch(
        getAllUserRoles({
          user: target.value,
          role: searchRole,
          pageSize,
          currentPage: 1,
        })
      );
    }
    dispatch(getTotalUserRoles({ user: target.value, role: searchRole }));
  };

  const handleSearchRole = ({ target }) => {
    setSearchRole(target.value);
    if (target.value == "") {
      dispatch(
        getAllUserRoles({
          user: searchUser,
          role: target.value,
          pageSize,
          currentPage,
        })
      );
    } else {
      dispatch(
        getAllUserRoles({
          user: searchUser,
          role: target.value,
          pageSize,
          currentPage: 1,
        })
      );
    }
    dispatch(getTotalUserRoles({ user: searchUser, role: target.value }));
  };

  const handlePageClick = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(
      getAllUserRoles({
        user: searchUser,
        role: searchRole,
        pageSize,
        currentPage,
      })
    );
  };

  const handleDeleteUserRole = () => {
    dispatch(deleteUserRole(deleteId));
    dispatch(getTotalUserRoles({ user: searchUser, role: searchRole }));

    if (userRoles.length == 1) {
      setCurrentPage(currentPage - 1);
      dispatch(
        getAllUserRoles({
          user: searchUser,
          role: searchRole,
          pageSize,
          currentPage: currentPage - 1,
        })
      );
    } else {
      dispatch(
        getAllUserRoles({
          user: searchUser,
          role: searchRole,
          pageSize,
          currentPage,
        })
      );
    }

    navigate("/admin/userroles");
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
      <div className="border-t-2 p-10 h-[550px] paper-window overflow-y-auto">
        <div className="flex items-center justify-between  ">
          <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 mb-1 flex">
            <div className="flex items-center w-[50%]">
              <label
                htmlFor=""
                className="flex ml-8 mt-1 items-center text-gray-500 w-full"
              >
                User
                <input
                  type="text"
                  name=""
                  id=""
                  className="ml-6 py-1 px-3 border-2 border-gray-300 rounded w-[70%]"
                  onChange={handleSearchUser}
                />
              </label>
            </div>
            <div className="flex items-center w-[50%]">
              <label
                htmlFor=""
                className="flex ml-8 mt-1 items-center text-gray-500 w-full"
              >
                Role
                <input
                  type="text"
                  name=""
                  id=""
                  className="ml-6 py-1 px-3 border-2 border-gray-300 rounded w-[70%]"
                  onChange={handleSearchRole}
                />
              </label>
            </div>
          </div>
          <NavLink to="/admin/addUserRole" className="w-[14%]">
            <button
              type="button"
              className="h-20 px-3 text-xs w-full rounded-lg bg-slate-500 text-white flex flex-col items-center justify-center"
            >
              <BiPlusCircle size={20} />
              <span>
                <h6>Add User</h6>
              </span>
            </button>
          </NavLink>
        </div>
        {userRoles.map((ur) => (
          <div className="flex items-center justify-between " key={ur._id}>
            <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 ">
              <table className=" w-full ml-8">
                <thead className="text-gray-400">
                  <tr>
                    <td>Name</td>
                    <td>Role</td>
                    <td>Std</td>
                    <td>Div</td>
                    <td>Subject</td>
                    <td>Year</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-lg w-[25%]">
                      {ur.user.firstName}
                      {"  "}
                      {ur.user.lastName}
                    </td>
                    <td className="text-lg w-[25%]">{ur.role.role}</td>
                    <td className="text-lg w-[10%]">{ur.standard.standard}</td>
                    <td className="text-lg w-[10%]">{ur.division.division}</td>
                    <td className="text-lg w-[15%]">{ur.subject.subject}</td>
                    <td className="text-lg w-[15%]">{ur.year}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="h-20 px-3 my-1 text-xs w-[14%] rounded-lg bg-gray-100 text-white flex items-center justify-evenly">
              <NavLink to={`/admin/updateUserRole/${ur._id}`}>
                <FiEdit
                  size={15}
                  className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                />
              </NavLink>
              <FiTrash2
                size={15}
                className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                onClick={() => handleDeletePopUp(ur._id)}
              />
            </div>
          </div>
        ))}
        <div className="mt-2">
          <Pagination
            itemsCount={totalNoOfUserRoles}
            pageSize={pageSize}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        </div>
      </div>
      <div
        className={` absolute w-[400px] h-[250px] mt-10 bottom-0 bg-gray-600 right-0 mr-6 mb-6 shadow rounded-lg p-2 ${
          showDeletePopUp ? "block" : "hidden"
        }`}
      >
        <DeletePopUp
          onShowPopUp={setShowDeletePopUp}
          onDelete={handleDeleteUserRole}
        />
      </div>
    </div>
  );
};

export default UserRoles;
