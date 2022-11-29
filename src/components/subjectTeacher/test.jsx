import React, { useState } from "react";
import { BiSearch, BiPlusCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  deleteTest,
  getAllTests,
} from "../../actions/subjectTeacherAction/testAction";
import jwt_decode from "jwt-decode";
import { DeletePopUp } from "../Common/deletePopUp";

export const Test = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginReducer.token);
  const tests = useSelector((state) => state.testReducer.tests);
  const decoded = jwt_decode(token);
  const [searchTest, setSearchTest] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  useEffect(() => {
    dispatch(getAllTests(decoded._id, searchTest));
  }, []);

  const handleDeleteTest = () => {
    dispatch(deleteTest(deleteId));
    navigate("/subjectteacher/tests");
  };

  const handleSearchTest = ({ target }) => {
    setSearchTest(target.value);
    dispatch(getAllTests(decoded._id, target.value));
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
              Test
              <select
                name=""
                id=""
                className="ml-6 py-1 px-3 border-2 border-gray-300 rounded w-[30%] h-10"
                onChange={handleSearchTest}
              >
                <option value="All">All</option>
                <option value="Class Test 1">Class Test 1</option>
                <option value="Unit Test 1">Unit Test 1</option>
                <option value="Mid Term">Mid Term</option>
                <option value="Class Test 1">Class Test 1</option>
                <option value="Unit Test 1">Unit Test 1</option>
                <option value="Final">Final</option>
              </select>
            </label>
          </div>
          <NavLink to="/subjectteacher/addTest" className="w-[14%]">
            <button
              type="submit"
              className="h-20 px-3 text-xs w-full rounded-lg bg-slate-500 text-white flex flex-col items-center justify-center no-underline"
            >
              <BiPlusCircle size={25} />
              <span>
                <h6>Add test</h6>
              </span>
            </button>
          </NavLink>
        </form>
        {tests.map((test) => (
          <div className="flex items-center justify-between " key={test._id}>
            <div className="w-[85%] bg-gray-100 p-3 rounded-lg  flex mt-1 h-24">
              <table className=" w-full  ml-8">
                <thead className="text-gray-400">
                  <tr>
                    <td>Test</td>
                    <td>Standard</td>
                    <td>Division</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-lg w-[33%]">{test.testName}</td>
                    <td className="text-lg w-[33%]">
                      {test.standard.standard}
                    </td>
                    <td className="text-lg w-[33%]">
                      {test.division.division}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="h-24 px-3 my-2 text-xs w-[14%] rounded-lg bg-gray-100 text-white flex items-center justify-evenly">
              <NavLink to={`/subjectteacher/updateTest/${test._id}`}>
                <FiEdit
                  size={15}
                  className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                />
              </NavLink>
              <FiTrash2
                size={15}
                className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                onClick={() => handleDeletePopUp(test._id)}
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
          onDelete={handleDeleteTest}
        />
      </div>
    </div>
  );
};
