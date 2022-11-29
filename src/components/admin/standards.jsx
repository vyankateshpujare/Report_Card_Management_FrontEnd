import React, { useState } from "react";
import { BiSearch, BiPlusCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  deleteStandard,
  getAllStandards,
  getTotalStandard,
} from "../../actions/adminActions/standardAction";
import Pagination from "../Common/pagination";
import { DeletePopUp } from "../Common/deletePopUp";

const Standards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [searchStandard, setSearchStandard] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const standards = useSelector((state) => state.standardReducer.standards);
  const totalNoOfStandard = useSelector(
    (state) => state.standardReducer.totalNoOfStandard
  );

  useEffect(() => {
    dispatch(
      getAllStandards({ standard: searchStandard, pageSize, currentPage })
    );
    dispatch(getTotalStandard({ standard: searchStandard }));
  }, []);

  const handleSearchStandard = ({ target }) => {
    setSearchStandard(target.value);
    if (target.value == "") {
      dispatch(
        getAllStandards({ standard: target.value, pageSize, currentPage })
      );
    } else {
      dispatch(
        getAllStandards({ standard: target.value, pageSize, currentPage: 1 })
      );
    }
    dispatch(getTotalStandard({ standard: target.value }));
  };

  const handlePageClick = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(
      getAllStandards({ standard: searchStandard, pageSize, currentPage })
    );
  };

  const handleDeleteStandard = () => {
    dispatch(deleteStandard(deleteId));
    dispatch(getTotalStandard({ standard: searchStandard }));

    if (standards.length === 1) {
      setCurrentPage(currentPage - 1);

      dispatch(
        getAllStandards({
          standard: searchStandard,
          pageSize,
          currentPage: currentPage - 1,
        })
      );
    } else {
      dispatch(
        getAllStandards({
          standard: searchStandard,
          pageSize,
          currentPage,
        })
      );
    }
    navigate("/admin/standards");
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
          />
        </div>
      </div>
      <div className="border-t-2 p-10 h-full">
        <div className="flex items-center justify-between ">
          <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 mb-1">
            <label
              htmlFor=""
              className="flex ml-8 mt-1 items-center text-gray-500"
            >
              Standard
              <input
                type="text"
                name=""
                id=""
                className="ml-6 py-1 px-3 border-2 border-gray-300 rounded"
                onChange={handleSearchStandard}
              />
            </label>
          </div>
          <NavLink to="/admin/addStandard" className="w-[14%]">
            <button
              type="submit"
              className="h-20 px-3 text-xs w-full rounded-lg bg-slate-500 text-white flex flex-col items-center justify-center no-underline"
            >
              <BiPlusCircle size={25} />
              <span>
                <h6>Add Standard</h6>
              </span>
            </button>
          </NavLink>
        </div>

        {standards.map((s) => (
          <div className="flex items-center justify-between " key={s._id}>
            <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 flex justify-between">
              <label
                htmlFor="standardinput"
                className="flex  items-center ml-8 text-gray-500"
              >
                Standard
                <span className="text-gray-700 ml-8">{s.standard}</span>
              </label>
            </div>
            <div className="h-20 px-3 my-1 text-xs w-[14%] rounded-lg bg-gray-100 text-white flex items-center justify-evenly">
              <NavLink to={`/admin/updateStandard/${s._id}`}>
                <FiEdit
                  size={15}
                  className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                />
              </NavLink>
              <FiTrash2
                size={15}
                className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
                onClick={() => handleDeletePopUp(s._id)}
              />
            </div>
          </div>
        ))}
        <div className="mt-2">
          <Pagination
            itemsCount={totalNoOfStandard}
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
          onDelete={handleDeleteStandard}
        />
      </div>
    </div>
  );
};

export default Standards;
