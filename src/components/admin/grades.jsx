import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch, BiPlusCircle } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  deleteGrade,
  getAllGrades,
  getTotalGrades,
} from "../../actions/adminActions/gradeAction";
import { DeletePopUp } from "../Common/deletePopUp";
import Pagination from "../Common/pagination";

const Grades = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [searchGrade, setSearchGrade] = useState("");
  const [searchMinMarks, setSearchMinMarks] = useState("");
  const [searchMaxMarks, setSearchMaxMarks] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const grades = useSelector((state) => state.gradeReducer.grades);
  const totalNoOfGrades = useSelector(
    (state) => state.gradeReducer.totalNoOfGrades
  );

  useEffect(() => {
    dispatch(
      getAllGrades({
        grade: searchGrade,
        minMarks: searchMinMarks,
        maxMarks: searchMaxMarks,
        pageSize,
        currentPage,
      })
    );
    dispatch(
      getTotalGrades({
        grade: searchGrade,
        minMarks: searchMinMarks,
        maxMarks: searchMaxMarks,
      })
    );
  });

  const handleSearchGrade = ({ target }) => {
    setSearchGrade(target.value);
    if (target.value == "") {
      dispatch(
        getAllGrades({
          grade: target.value,
          minMarks: searchMinMarks,
          maxMarks: searchMaxMarks,
          pageSize,
          currentPage,
        })
      );
    } else {
      dispatch(
        getAllGrades({
          grade: target.value,
          minMarks: searchMinMarks,
          maxMarks: searchMaxMarks,
          pageSize,
          currentPage: 1,
        })
      );
    }

    dispatch(
      getTotalGrades({
        grade: target.value,
        minMarks: searchMinMarks,
        maxMarks: searchMaxMarks,
      })
    );
  };

  const handleSearchMinMarks = ({ target }) => {
    setSearchMinMarks(target.value);
    if (target.value == "") {
      dispatch(
        getAllGrades({
          grade: searchGrade,
          minMarks: target.value,
          maxMarks: searchMaxMarks,
          pageSize,
          currentPage,
        })
      );
    } else {
      dispatch(
        getAllGrades({
          grade: searchGrade,
          minMarks: target.value,
          maxMarks: searchMaxMarks,
          pageSize,
          currentPage: 1,
        })
      );
    }
    dispatch(
      getTotalGrades({
        grade: searchGrade,
        minMarks: target.value,
        maxMarks: searchMaxMarks,
      })
    );
  };

  const handleSearchMaxMarks = ({ target }) => {
    setSearchMaxMarks(target.value);
    if (target.value == "") {
      dispatch(
        getAllGrades({
          grade: searchGrade,
          minMarks: searchMinMarks,
          maxMarks: target.values,
          pageSize,
          currentPage,
        })
      );
    } else {
      dispatch(
        getAllGrades({
          grade: searchGrade,
          minMarks: searchMinMarks,
          maxMarks: target.values,
          pageSize,
          currentPage: 1,
        })
      );
    }
    dispatch(
      getTotalGrades({
        grade: searchGrade,
        minMarks: searchMinMarks,
        maxMarks: target.value,
      })
    );
  };

  const handlePageClick = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(
      getAllGrades({
        grade: searchGrade,
        minMarks: searchMinMarks,
        maxMarks: searchMaxMarks,
        pageSize,
        currentPage,
      })
    );
  };

  const handleDeleteGrade = () => {
    dispatch(deleteGrade(deleteId));
    dispatch(
      getTotalGrades({
        grade: searchGrade,
        minMarks: searchMinMarks,
        maxMarks: searchMaxMarks,
      })
    );

    if (grades.length == 1) {
      setCurrentPage(currentPage - 1);
      dispatch(
        getAllGrades({
          grade: searchGrade,
          minMarks: searchMinMarks,
          maxMarks: searchMaxMarks,
          pageSize,
          currentPage: currentPage - 1,
        })
      );
    } else {
      dispatch(
        getAllGrades({
          grade: searchGrade,
          minMarks: searchMinMarks,
          maxMarks: searchMaxMarks,
          pageSize,
          currentPage,
        })
      );
    }
    navigate("/admin/grades");
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
            onChange={""}
          />
        </div>
      </div>
      <div className="border-t-2 p-10 h-full">
        <div className="flex items-center justify-between ">
          <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 mb-1 flex justify-around text-gray-400">
            <label htmlFor="" className="flex ml-8 items-center text-gray-500">
              Grades
              <input
                type="text"
                name=""
                id=""
                className="mx-2 py-1 px-3 ml-8 border-2 rounded border-gray-300"
                onChange={handleSearchGrade}
              />
            </label>
            <label htmlFor="" className="flex ml-8 items-center text-gray-500">
              Min Marks
              <input
                type="text"
                name=""
                id=""
                className="mx-2 py-1 px-3 ml-8 border-2 border-gray-300 rounded"
                onChange={handleSearchMinMarks}
              />
            </label>
            <label htmlFor="" className="flex ml-8 items-center text-gray-500">
              Max Marks
              <input
                type="text"
                name=""
                id=""
                className="mx-2 py-1 px-3 ml-8 border-2 border-gray-300 rounded"
                onChange={handleSearchMaxMarks}
              />
            </label>
          </div>
          <NavLink to="/admin/addGrade" className="w-[14%]">
            <button
              type="submit"
              className="h-20 px-3 text-xs w-full rounded-lg bg-slate-500 text-white flex flex-col items-center justify-center no-underline"
            >
              <BiPlusCircle size={25} />
              <span>
                <h6>Add Grades</h6>
              </span>
            </button>
          </NavLink>
        </div>
        {grades.map((g) => (
          <div className="flex items-center justify-between " key={g._id}>
            <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 flex ">
              <table className=" w-full ml-12">
                <thead className="text-gray-400">
                  <tr>
                    <td>Grade</td>
                    <td>Min Marks</td>
                    <td>Max Marks</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-lg w-[22%]">{g.grade}</td>
                    <td className="text-lg w-[23%]">{g.start}</td>
                    <td className="text-lg w-[20%]">{g.end}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="h-20 px-3 my-1 text-xs w-[14%] rounded-lg bg-gray-100 text-white flex items-center justify-evenly">
              <NavLink to={`/admin/updateGrade/${g._id}`}>
                <FiEdit
                  size={15}
                  className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                />
              </NavLink>
              <FiTrash2
                size={15}
                className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                onClick={() => handleDeletePopUp(g._id)}
              />
            </div>
          </div>
        ))}
        <div className="mt-2">
          <Pagination
            itemsCount={totalNoOfGrades}
            pageSize={pageSize}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        </div>
      </div>
      <div
        className={` absolute w-[400px] h-[250px]  bottom-0 bg-gray-600 right-0 mr-9 mb-6 shadow rounded-3xl p-2 animate-bounce ${
          showDeletePopUp ? "block" : "hidden"
        }`}
      >
        <DeletePopUp
          onShowPopUp={setShowDeletePopUp}
          onDelete={handleDeleteGrade}
        />
      </div>
    </div>
  );
};

export default Grades;
