import React, { useState } from "react";
import { BiSearch, BiPlusCircle, BiUser } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMail, FiTrash2 } from "react-icons/fi";
import {
  deleteTestResult,
  getAllTestResults,
} from "../../actions/subjectTeacherAction/resultAction";
import { BsCalendar4 } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import jwt_decode from "jwt-decode";
import { DeletePopUp } from "../Common/deletePopUp";

export const TestResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const testResults = useSelector((state) => state.testResultReducer.results);
  const token = useSelector((state) => state.loginReducer.token);
  const decoded = jwt_decode(token);
  const [searchStudent, setSearchStudent] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  useEffect(() => {
    dispatch(getAllTestResults(decoded._id, searchStudent));
  }, []);

  const handleDeleteTestResult = () => {
    dispatch(deleteTestResult(deleteId));
    navigate("/subjectteacher/results");
  };

  const handleSearchResult = ({ target }) => {
    setSearchStudent(target.value);
    dispatch(getAllTestResults(decoded._id, target.value));
  };

  const handleDeletePopUp = (id) => {
    setShowDeletePopUp(true);
    setDeleteId(id);
  };

  return (
    <div>
      <div className="w-full h-20 bg-white flex justify-end items-center">
        <div className="border-2 border-slate-500 w-1/3 h-8 px-5 flex items-center rounded-full mr-4">
          <BiSearch size={20} className="mr-2 text-gray-500" />
          <input
            type="text"
            name="search"
            id="search"
            className="w-[90%] h-full outline-none "
            onChange={(e) => {}}
          />
        </div>
      </div>
      <div className="border-t-2 p-10 h-full">
        <form className="flex items-center justify-between ">
          <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 mb-1">
            <label
              htmlFor=""
              className="flex ml-8 mt-1 items-center text-gray-500"
            >
              Student
              <input
                type="text"
                name=""
                id=""
                className="ml-6 py-1 px-3 border-2 border-gray-300 rounded w-[40%]"
                onChange={handleSearchResult}
              />
            </label>
          </div>
          <NavLink to="/subjectteacher/addResult" className="w-[14%]">
            <button
              type="submit"
              className="h-20 px-3 text-xs w-full rounded-lg bg-slate-500 text-white flex flex-col items-center justify-center no-underline"
            >
              <BiPlusCircle size={25} />
              <span>
                <h6>Add Result</h6>
              </span>
            </button>
          </NavLink>
        </form>
        {testResults.map((testResult) => (
          <div className="flex items-center justify-between ">
            <div className="w-[85%] bg-gray-100 p-3 rounded-lg  flex mt-1 h-28 ">
              <table className=" w-full  ml-8">
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
                    <td className="text-lg w-[20%]">
                      {testResult.student.firstName}{" "}
                      {testResult.student.lastName}
                    </td>
                    <td className="text-lg w-[15%]">
                      <div className="flex">
                        <BsCalendar4
                          size={20}
                          className="text-gray-400 mt-1 mr-2"
                        />
                        {new Date(testResult.student.dob).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="text-lg w-[35%] ">
                      <div className="flex">
                        <BiUser size={20} className="text-gray-400 mt-1 mr-2" />
                        {testResult.student.parents.firstName}{" "}
                        {testResult.student.parents.lastName}
                        {" " + "(+91 "}
                        {testResult.student.parents.phone + ")"}
                      </div>
                      <div className="flex">
                        <FiMail
                          size={20}
                          className="text-gray-400 mt-1 mr-2 "
                        />
                        {testResult.student.parents.email}
                      </div>
                    </td>
                    <td className="text-lg w-[30%]">
                      <div className="flex">
                        <CiLocationOn
                          size={25}
                          className="text-gray-400 mt-1 mr-2"
                        />{" "}
                        {testResult.student.parents.addressLine1}{" "}
                        {testResult.student.parents.city}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="h-28 px-3 my-2 text-xs w-[14%] rounded-lg bg-gray-100 text-white flex items-center justify-evenly">
              <div className="text-gray-600 " style={{ "font-size": "40px" }}>
                {testResult.obtainedMarks}
              </div>
              <FiTrash2
                size={15}
                className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                onClick={() => {
                  handleDeletePopUp(testResult._id);
                }}
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
          onDelete={handleDeleteTestResult}
        />
      </div>
    </div>
  );
};
