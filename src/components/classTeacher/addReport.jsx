import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import jwt_decode from "jwt-decode";
import { getAllStudents } from "../../actions/classTeachersActions/studentAction";
import { getAllTests } from "../../actions/subjectTeacherAction/testAction";
import { getAllUserRoles } from "../../actions/adminActions/userRoleAction";
import { generateReport } from "../../actions/classTeachersActions/reportAction";

const schema = yup.object().shape({
  student: yup.string().required(),
  testName: yup.string().required(),
});

export const GenerateReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const token = useSelector((state) => state.loginReducer.token);
  const decoded = jwt_decode(token);
  const students = useSelector((state) => state.studentReducer.students);
  const users = useSelector((state) => state.userRoleReducer.userRoles);
  const currentUser = users.find((user) => user.user._id == decoded._id);
  let alltests = useSelector((state) => state.testReducer.tests);
  let tests = [];
  alltests.filter((t) => tests.push(t.testName));
  tests = [...new Set(tests)];

  useEffect(() => {
    dispatch(getAllUserRoles());
    dispatch(getAllStudents({ userId: decoded._id }));
    dispatch(getAllTests(decoded._id));
  }, []);

  const handleGenerateReport = (data) => {
    dispatch(generateReport(decoded._id, data));
    navigate("/classteacher/reports");
  };

  return (
    <div className="">
      <div className="w-full h-[90px] bg-white flex justify-end items-center"></div>
      <div className="border-t-2 p-10 h-[600px] flex justify-center">
        {/* <div className="w-[50%] h-[360px] bg-[#F3F3F3] flex justify-center items-center rounded-tl-3xl rounded-br-3xl shadow-md"> */}
          <form
            action=""
            className="h-[330px] w-[50%] border-2 border-yellow-400 rounded-b-3xl"
            onSubmit={handleSubmit(handleGenerateReport)}
          >
            <div className="font-bold flex justify-start h-16">
              <span
                className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400"
                style={{ fontSize: "20px" }}
              >
                {"Genrate Report"}
              </span>
            </div>
            <div className="flex justify-center mt-5">
              <select
                name=""
                id=""
                className="input-width rounded pl-3 border-2 w-[70%]  border-gray-300 text-gray-400 h-10"
                {...register("student")}
              >
                <option value="">Select Student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.student?.message}
            </div>
            <div className="flex justify-center">
              <select
                name=""
                id=""
                className="input-width rounded pl-3 border-2 w-[70%]  border-gray-300 text-gray-400 h-10"
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
              {errors.student?.message}
            </div>
            <div className="flex justify-center h-16">
              <button
                type="SUBMIT"
                value="submit"
                className="bg-gray-400 hover:bg-teal-700 text-white text-sm rounded-full  block px-2.5 w-[25%] py-3 font-bold"
              >
                SUBMIT
              </button>
            </div>
          </form>
        {/* </div> */}
      </div>
    </div>
  );
};
