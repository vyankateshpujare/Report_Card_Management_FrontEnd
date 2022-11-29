import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  addTest,
  getAllTests,
  getCurrentTest,
  updateTest,
} from "../../actions/subjectTeacherAction/testAction";
import jwt_decode from "jwt-decode";
import { useState } from "react";

const schema = yup.object().shape({
  testName: yup.string().min(3).max(30).required(),
  totalMarks: yup.number().required(),
  year: yup.number().min(2000).required(),
});

export const getTestId = ({ params }) => {
  return params.testId;
};

export const AddUpdateTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testId = useLoaderData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const token = useSelector((state) => state.loginReducer.token);
  const test = useSelector((state) => state.testReducer.currentTest);
  const decoded = jwt_decode(token);
  const [searchTest, setSearchTest] = useState("");

  useEffect(() => {
    dispatch(getAllTests(decoded._id));
    if (testId) {
      dispatch(getCurrentTest(testId));
    }
  }, []);

  useEffect(() => {
    if (!testId) return;
    if (test) {
      setValue("testName", test.testName);
      setValue("totalMarks", test.totalMarks);
      setValue("year", test.year);
      setValue("_id", test._id);
    }
  }, [test]);

  const tests = [
    "Class Test 1",
    "Unit Test 1",
    "Mid Term",
    "Class Test 2",
    "Unit Test 2",
    "Final Test",
  ];

  const years = [
    2010, 2011, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];

  const handleAddUpdateTest = (data) => {
    if (data._id) {
      dispatch(updateTest(data));
      navigate("/subjectteacher/tests");
    } else {
      dispatch(addTest(decoded._id, data));
      navigate("/subjectteacher/tests");
    }
  };

  return (
    <div className="">
      <div className="w-full h-20 bg-white flex justify-end items-center"></div>
      <div className="border-t-2 p-6 h-[600px] flex justify-center paper-window overflow-y-auto">
        {/* <div className="w-[50%] h-[450px] bg-[#F3F3F3] flex justify-center items-center rounded-tl-3xl rounded-br-3xl shadow-md"> */}
          <form
            action=""
            className="h-[420px] w-[50%] border-2 border-yellow-400 rounded-b-3xl "
            onSubmit={handleSubmit(handleAddUpdateTest)}
          >
            <div className="font-bold flex justify-start h-16">
              <span
                className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400"
                style={{ fontSize: "20px" }}
              >
                {testId ? "UPDATE  " : "ADD  "}
              </span>
            </div>
            <div className="flex justify-center mt-5">
              <select
                name=""
                id=""
                className="input-width rounded pl-3 border-2 w-[70%] text-gray-400 border-gray-300 h-10"
                {...register("testName")}
              >
                <option value="">Select Test</option>
                {tests.map((test, index) => (
                  <option key={index} value={test}>
                    {test}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.testName?.message}
            </div>
            <div className="flex justify-center ">
              <input
                type="text"
                id=""
                className="input-width rounded pl-3 border-2 w-[70%] text-gray-400 border-gray-300 h-10"
                placeholder="Enter Total Marks"
                {...register("totalMarks")}
              />
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.totalMarks?.message}
            </div>
            <div className="flex justify-center">
              <select
                name=""
                id=""
                className="input-width rounded pl-3 border-2 w-[70%] text-gray-400 border-gray-300 h-10"
                {...register("year")}
              >
                <option value="">Select Year</option>
                {years.map((year, index) => (
                  <option key={index}>{year}</option>
                ))}
              </select>
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.year?.message}
            </div>
            <div className="flex justify-center h-16">
              <button
                type="SUBMIT"
                className="bg-gray-400 mt-2 text-white text-sm rounded-full h-full hover:bg-teal-700 block px-2.5 w-[25%] py-3 font-bold"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      {/* </div> */}
    </div>
  );
};
