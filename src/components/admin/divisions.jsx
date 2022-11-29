import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch, BiPlusCircle } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import StripeCard from "../stripeCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  deleteDivision,
  getAllDivisions,
  getTotalDivision,
} from "../../actions/adminActions/divisionAction";
import { DeletePopUp } from "../Common/deletePopUp";
import Pagination from "../Common/pagination";

const Division = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [searchDivisions, setSearchDivisions] = useState("");
  const [searchStandards, setSearchStandards] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const divisions = useSelector((state) => state.divisionReducer.divisions);
  const totalNoOfDivisions = useSelector(
    (state) => state.divisionReducer.totalNoOfDivision
  );

  useEffect(() => {
    dispatch(
      getAllDivisions({
        standard: searchStandards,
        division: searchDivisions,
        pageSize,
        currentPage,
      })
    );
    dispatch(
      getTotalDivision({ standard: searchStandards, division: searchDivisions })
    );
  }, []);

  const handleSearchStandard = ({ target }) => {
    setSearchStandards(target.value);
    if (target.value == "") {
      dispatch(
        getAllDivisions({
          standard: target.value,
          division: searchDivisions,
          pageSize,
          currentPage,
        })
      );
    } else {
      dispatch(
        getAllDivisions({
          standard: target.value,
          division: searchDivisions,
          pageSize,
          currentPage: 1,
        })
      );
    }
    dispatch(
      getTotalDivision({ standard: target.value, division: searchDivisions })
    );
  };

  const handleSearchDivision = ({ target }) => {
    setSearchDivisions(target.value);
    if (target.value == "") {
      dispatch(
        getAllDivisions({
          standard: searchStandards,
          division: target.value,
          pageSize,
          currentPage,
        })
      );
    } else {
      dispatch(
        getAllDivisions({
          standard: searchStandards,
          division: target.value,
          pageSize,
          currentPage: 1,
        })
      );
    }
    dispatch(
      getTotalDivision({ standard: searchStandards, division: target.value })
    );
  };

  const handlePageClick = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(
      getAllDivisions({
        standard: searchStandards,
        division: searchDivisions,
        pageSize,
        currentPage,
      })
    );
  };

  const handleDeleteDivision = () => {
    dispatch(deleteDivision(deleteId));
    dispatch(
      getTotalDivision({ standard: searchStandards, division: searchDivisions })
    );

    if (divisions.length === 1) {
      setCurrentPage(currentPage - 1);
      dispatch(
        getAllDivisions({
          standard: searchStandards,
          division: searchDivisions,
          pageSize,
          currentPage: currentPage - 1,
        })
      );
    } else {
      dispatch(
        getAllDivisions({
          standard: searchStandards,
          division: searchDivisions,
          pageSize,
          currentPage,
        })
      );
    }
    navigate("/admin/divisions");
  };

  const handleDeletePopUp = (id) => {
    setShowDeletePopUp(true);
    setDeleteId(id);
  };

  return (
    <div>
      <div className="w-full h-20 bg-white flex justify-end items-center">
        <div className="border-2 w-1/3 h-8 px-5 flex items-center rounded-full">
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
        <div className="flex items-center justify-between">
          <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 mb-1  flex ">
            <div className="w-[40%]">
              <label
                htmlFor="standardinput"
                className="flex ml-8 mt-1 items-center text-gray-500"
              >
                Standard
                <input
                  type="text"
                  name="standardinput"
                  id="standardinput"
                  className="ml-6 py-1 px-3 border-2 border-gray-300 rounded"
                  onChange={handleSearchStandard}
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="standardinput"
                className="flex ml-8 mt-1 items-center text-gray-500"
              >
                Division
                <input
                  type="text"
                  name="standardinput"
                  id="standardinput"
                  className="ml-6 py-1 px-3 border-2 border-gray-300 rounded"
                  onChange={handleSearchDivision}
                />
              </label>
            </div>
          </div>
          <NavLink to="/admin/addDivision" className="w-[14%]">
            <button
              type="submit"
              className="h-20 px-3 text-xs w-full rounded-lg bg-slate-500 text-white flex flex-col items-center justify-center"
            >
              <BiPlusCircle size={20} />
              <span>
                <h6>Add Division</h6>
              </span>
            </button>
          </NavLink>
        </div>
        {divisions.map((d) => (
          <div className="flex items-center justify-between">
            <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 flex ">
              <div className="flex items-center w-[43%]">
                {" "}
                <label
                  htmlFor=""
                  className="flex  items-center ml-8 text-gray-500"
                >
                  Standard
                  <span className="text-gray-700 ml-8">
                    {d.standard.standard}
                  </span>
                </label>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="standardinput"
                  className="flex  items-center text-gray-500"
                >
                  Division
                  <span className="text-gray-700 ml-8">{d.division}</span>
                </label>
              </div>
            </div>
            <div className="h-20 px-3 my-1 text-xs w-[14%] rounded-lg bg-gray-100 text-white flex items-center justify-evenly">
              <NavLink to={`/admin/updateDivision/${d._id}`}>
                <FiEdit
                  size={15}
                  className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                />
              </NavLink>
              <FiTrash2
                size={15}
                className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                onClick={() => handleDeletePopUp(d._id)}
              />
            </div>
          </div>
        ))}
        <div className="mt-2">
          <Pagination
            itemsCount={totalNoOfDivisions}
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
          onDelete={handleDeleteDivision}
        />
      </div>
    </div>
  );
};

export default Division;
