import React, { Profiler, useState } from "react";
import { BiSearch, BiPlusCircle, BiUser } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiEdit, FiMail, FiTrash2 } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { BsCalendar4 } from "react-icons/bs";
import ShowImage from "../Common/ShowImage";
import {
  deleteStudent,
  getAllStudents,
} from "../../actions/classTeachersActions/studentAction";
import jwt_decode from "jwt-decode";
import { DeletePopUp } from "../Common/deletePopUp";

export const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchStudent, setSearchStudent] = useState("");
  const [searchRollNumber, setSearchRollNumber] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const token = useSelector((state) => state.loginReducer.token);
  const students = useSelector((state) => state.studentReducer.students);
  const decoded = jwt_decode(token);

  useEffect(() => {
    dispatch(
      getAllStudents({
        userId: decoded._id,
        firstName: searchStudent,
        rollNumber: searchRollNumber,
      })
    );
  }, []);

  const handleDeleteStudent = () => {
    dispatch(deleteStudent(deleteId));
    navigate("/classteacher/students");
  };

  const handleSearchStudent = ({ target }) => {
    setSearchStudent(target.value);
    dispatch(
      getAllStudents({
        userId: decoded._id,
        firstName: target.value,
        rollNumber: searchRollNumber,
      })
    );
  };

  const handleSearchRollNo = ({ target }) => {
    setSearchRollNumber(target.value);
    dispatch(
      getAllStudents({
        userId: decoded._id,
        firstName: searchStudent,
        rollNumber: target.value,
      })
    );
  };

  const handleDeletePopUp = (id) => {
    setShowDeletePopUp(true);
    setDeleteId(id);
  };

  return (
    <div>
      <div className="w-full h-[16%] bg-white flex justify-end items-center">
        <div className="border-2 border-slate-500 w-1/3 h-8 px-5 flex items-center rounded-full mr-4">
          <BiSearch size={20} className="mr-2 text-gray-500" />
          <input
            type="text"
            name="search"
            id="search"
            className="w-[90%] h-full outline-none "
          />
        </div>
      </div>
      <div className="border-t-2 p-10 h-[540px] paper-window overflow-y-auto">
        <div className="flex items-center justify-between ">
          <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 mb-1">
            <div className="flex w-full">
              <label
                htmlFor=""
                className="flex ml-8 mt-1 items-center text-gray-500 w-[50%]"
              >
                Student
                <input
                  type="text"
                  name=""
                  id=""
                  className="ml-6 py-1 px-3 border-2 border-gray-300 rounded w-[70%]"
                  onChange={handleSearchStudent}
                />
              </label>
              <label
                htmlFor=""
                className="flex ml-8 mt-1 items-center text-gray-500 w-[50%]"
              >
                Roll No
                <input
                  type="text"
                  name=""
                  id=""
                  className="ml-6 py-1 px-3 border-2 border-gray-300 rounded w-[70%]"
                  onChange={handleSearchRollNo}
                />
              </label>
            </div>
          </div>
          <NavLink to="/classteacher/addStudent" className="w-[14%]">
            <button
              type="submit"
              className="h-20 px-3 text-xs w-full rounded-lg bg-slate-500 text-white flex flex-col items-center justify-center no-underline"
            >
              <BiPlusCircle size={25} />
              <span>
                <h6>Add Student</h6>
              </span>
            </button>
          </NavLink>
        </div>
        {students.map((student) => (
          <div
            className="flex items-center justify-between h-32 my-2"
            key={student._id}
          >
            <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-full flex mt-1">
              <div className="w-[10%] p-1 ">
                <div className="w-full h-full bg-white rounded">
                  <ShowImage item={{ profile: student.profile }} />
                </div>
              </div>
              <div className="w-[90%] ">
                <table className=" w-full  ml-4">
                  <thead className="text-gray-400">
                    <tr>
                      <td>Name</td>
                      <td>Birth Date</td>
                      <td>Parent Details</td>
                      <td>Address</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-lg w-[17%]">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="text-lg w-[15%]">
                        <div className="flex">
                          <BsCalendar4
                            size={20}
                            className="text-gray-400 mt-1 mr-2"
                          />
                          {new Date(student.dob).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="text-lg w-[35%] ">
                        <div className="flex">
                          <BiUser
                            size={20}
                            className="text-gray-400 mt-1 mr-2"
                          />
                          {student.parents.firstName} {student.parents.lastName}
                          {" " + "(+91 "}
                          {student.parents.phone + ")"}
                        </div>
                        <div className="flex">
                          <FiMail
                            size={20}
                            className="text-gray-400 mt-1 mr-2 "
                          />
                          {student.parents.email}
                        </div>
                      </td>
                      <td className="text-lg w-[33%]">
                        <div className="flex">
                          <CiLocationOn
                            size={25}
                            className="text-gray-400 mt-1 mr-2"
                          />{" "}
                          {student.parents.addressLine1} {student.parents.city}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="h-full px-3 text-xs w-[14%] rounded-lg bg-gray-100 text-white flex items-center justify-evenly">
              <NavLink to={`/classteacher/updateStudent/${student._id}`}>
                <FiEdit
                  size={15}
                  className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                />
              </NavLink>
              <FiTrash2
                size={15}
                className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                onClick={() => handleDeletePopUp(student._id)}
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
          onDelete={handleDeleteStudent}
        />
      </div>
    </div>
  );
};
