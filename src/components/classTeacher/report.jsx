import React, { useState } from "react";
import { BiSearch, BiPlusCircle, BiUser } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import jwt_decode from "jwt-decode";
import {
  addRemark,
  deleteReport,
  getAllReports,
  sendReport,
  totalReports,
} from "../../actions/classTeachersActions/reportAction";
import ShowImage from "../Common/ShowImage";
import Pagination from "../Common/pagination";

export const Reports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [searchStudent, setSearchStudent] = useState("");
  const [searchRollNumber, setSearchRollNumber] = useState("");
  const token = useSelector((state) => state.loginReducer.token);
  const reports = useSelector((state) => state.reportReducer.reports);
  const decoded = jwt_decode(token);
  const totalNoOfReports = useSelector(
    (state) => state.reportReducer.totalReports
  );
  console.log(totalNoOfReports);

  useEffect(() => {
    dispatch(
      getAllReports({
        pageSize,
        currentPage,
        firstName: searchStudent,
        rollNumber: searchRollNumber,
      })
    );
    dispatch(
      totalReports({ firstName: searchStudent, rollNumber: searchRollNumber })
    );
  }, []);

  const handlePageClick = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(
      getAllReports({
        pageSize,
        currentPage,
        firstName: searchStudent,
        rollNumber: searchRollNumber,
      })
    );
  };

  const handleSearchStudent = ({ target }) => {
    setSearchStudent(target.value);
    if (target.value == "") {
      dispatch(
        getAllReports({
          pageSize,
          currentPage,
          firstName: target.value,
          rollNumber: searchRollNumber,
        })
      );
    }
    dispatch(
      getAllReports({
        pageSize,
        currentPage: 1,
        firstName: target.value,
        rollNumber: searchRollNumber,
      })
    );
    dispatch(
      totalReports({ firstName: target.value, rollNumber: searchRollNumber })
    );
  };

  const handleSearchRollNo = ({ target }) => {
    setSearchRollNumber(target.value);
    if (target.value == "") {
      dispatch(
        getAllReports({
          pageSize,
          currentPage,
          rollNumber: target.value,
          firstName: searchStudent,
        })
      );
    }
    dispatch(
      getAllReports({
        pageSize,
        currentPage: 1,
        rollNumber: target.value,
        firstName: searchStudent,
      })
    );
    dispatch(
      totalReports({ rollNumber: target.value, firstName: searchStudent })
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteReport(id));
    dispatch(totalReports({ firstName: searchStudent }));
    dispatch(
      getAllReports({
        pageSize,
        currentPage,
        firstName: searchStudent,
      })
    );

    navigate("/classteacher/reports");
  };

  const handleRemark = (e, id) => {
    dispatch(addRemark(e.target.value, id));
  };

  const handleSendReport = (id) => {
    dispatch(sendReport(id));
  };

  return (
    <div className="h-[90%]">
      <div className="w-full h-[12%] bg-white flex justify-end items-center">
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
      <div className="border-t-2 p-10 h-[86%] paper-window overflow-y-auto">
        <div className="flex items-center justify-between mb-3 ">
          <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 mb-1 flex">
            <label
              htmlFor=""
              className="flex ml-8 mt-1 items-center text-gray-500 w-[40%]"
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
              className="flex ml-8 mt-1 items-center text-gray-500 w-[60%]"
            >
              Roll No
              <input
                type="text"
                name=""
                id=""
                className="ml-6 py-1 px-3 border-2 border-gray-300 rounded w-[40%]"
                onChange={handleSearchRollNo}
              />
            </label>
          </div>
          <NavLink to="/classteacher/generatereport" className="w-[14%]">
            <button
              type="submit"
              className="h-20 px-3 text-xs w-full rounded-lg bg-slate-500 text-white flex flex-col items-center justify-center no-underline"
            >
              <BiPlusCircle size={25} />
              <span>
                <h6>Generate Report</h6>
              </span>
            </button>
          </NavLink>
        </div>
        {reports.map((report) => (
          <div
            className=" bg-gray-100 rounded flex p-4 mb-2"
            style={{ height: "500px" }}
          >
            <div className="w-[60%] h-full mr-3 p-2 mt-10">
              <div className="w-full flex mb-3">
                <div className="w-[20%] mr-5 "></div>
                <div
                  className="w-[80%] font-bold "
                  style={{ fontSize: "20px" }}
                >
                  {report.student.firstName} {report.student.lastName}
                  <span className="font-semibold">
                    {" ( Roll-No : " + report.student.rollNumber + " )"}
                  </span>
                </div>
              </div>
              <div className="flex h-28 w-full mb-4 ">
                <div className="h-full w-[20%] bg-slate-500 mr-5 rounded">
                  <ShowImage item={{ profile: report.student.profile }} />
                </div>
                <div className="h-full w-[80%] ">
                  <table className="w-full h-full border-collapse border border-slate-800 rounded-lg">
                    <thead className="w-full h-[50%]">
                      <tr className="w-full h-full">
                        {report.subjects.map((subject) => (
                          <th className="w-[20%] h-full border text-center text-gray-400">
                            {subject}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="w-full h-[50%]">
                      <tr className="w-full h-full">
                        {report.marks.map((mark) => (
                          <td className="w-[20%] h-full border text-center">
                            <span style={{ "font-size": "30px" }}>{mark}</span>
                            <span className="text-gray-400">
                              {"/" + report.total}
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="flex h-20 w-full mb-4 text-gray-400"
                style={{ fontSize: "20px" }}
              >
                <div className="h-full w-[20%] mr-5"></div>
                <div className="h-full w-[80%] flex">
                  <div className=" w-[30%] h-full mr-3">
                    <div>Total</div>
                    <div className="text-gray-800" style={{ fontSize: "28px" }}>
                      {report.marks
                        .map((mark) => mark)
                        .reduce((prev, curr) => prev + curr, 0)}
                      {"/"}
                      {report.marks.length * report.total}
                    </div>
                  </div>
                  <div className=" w-[30%] h-full mr-3">
                    <div>Percentage</div>
                    <div className="text-gray-800" style={{ fontSize: "28px" }}>
                      {(report.marks
                        .map((mark) => mark)
                        .reduce((prev, curr) => prev + curr, 0) /
                        (report.marks.length * report.total)) *
                        100}
                      {"%"}
                    </div>
                  </div>
                  <div className=" w-[30%] h-full">
                    <div>Grade</div>
                    <div className="text-gray-800" style={{ fontSize: "28px" }}>
                      {report.obtainedGrade.grade}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex h-40 w-full ">
                <div className="h-full w-[20%] mr-5"></div>
                <div
                  className="h-full w-[80%] rounded"
                  style={{ fontSize: "20px" }}
                >
                  <div className="text-gray-400">Parent Details</div>
                  <div className="flex">
                    <BiUser size={20} className="text-gray-400 mt-1 mr-3" />
                    {report.student.parents.firstName}{" "}
                    {report.student.parents.lastName}
                    {"   " + "( +91 "}
                    {report.student.parents.phone + " )"}
                  </div>
                  <div className="flex">
                    <FiMail size={20} className="text-gray-400 mt-1 mr-3 " />
                    {report.student.parents.email}
                  </div>
                  <div className="flex">
                    <CiLocationOn
                      size={25}
                      className="text-gray-400 mt-1 mr-3"
                    />{" "}
                    {report.student.parents.addressLine1}{" "}
                    {report.student.parents.city}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[40%] h-full p-2">
              <div className="flex justify-end">
                <button
                  className="bg-slate-500 text-white w-28 rounded-full h-12"
                  onClick={() => handleDelete(report._id)}
                >
                  delete
                </button>
              </div>
              <div className="mb-2 text-gray-400" style={{ fontSize: "20px" }}>
                Remark
              </div>
              <div className="w-full h-48 bg-white mb-28  rounded">
                <textarea
                  name=""
                  id=""
                  className="h-full w-full rounded-lg p-3"
                  onMouseOut={(e) => handleRemark(e, report._id)}
                ></textarea>
              </div>
              <div className="flex justify-end ">
                <button
                  className="py-3 w-40 rounded-full bg-gray-700 text-white"
                  onClick={() => handleSendReport(report._id)}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-2">
          <Pagination
            itemsCount={totalNoOfReports}
            pageSize={pageSize}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
