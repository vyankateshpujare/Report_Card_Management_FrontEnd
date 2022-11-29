import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getAllStudents } from "../../actions/classTeachersActions/studentAction";
import { addTestResult } from "../../actions/subjectTeacherAction/resultAction";
import { getAllTests } from "../../actions/subjectTeacherAction/testAction";
import jwt_decode from "jwt-decode";

const schema = yup.object().shape({
  student: yup.string().required(),
  test: yup.string().required(),
  obtainedMarks: yup.number().required(),
});

export const AddTestResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.loginReducer.token);
  const tests = useSelector((state) => state.testReducer.tests);
  const students = useSelector((state) => state.studentReducer.students);
  const decoded = jwt_decode(token);

  useEffect(() => {
    dispatch(getAllTests(decoded._id));
    dispatch(getAllStudents({ userId: decoded._id }));
  }, []);

  const handleAddTestResult = (data) => {
    dispatch(addTestResult(data));
    navigate("/subjectteacher/results");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <div className="">
      <div className="w-full h-20 bg-white flex justify-end items-center"></div>
      <div className="border-t-2 p-6 h-[600px] flex justify-center paper-window overflow-y-auto">
        {/* <div className="w-[50%] h-[450px] border-2 border-yellow-400 rounded-b-3xl"> */}
          <form
            action=""
            className="h-[420px] w-[50%] border-2 border-yellow-400 rounded-b-3xl shadow-sm"
            onSubmit={handleSubmit(handleAddTestResult)}
          >
            <div className="font-bold flex justify-start h-16">
              <span
                className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400"
                style={{ fontSize: "20px" }}
              >
                {"ADD"}
              </span>
            </div>
            <div className="flex justify-center mt-5">
              <select
                name=""
                id=""
                className="input-width rounded pl-3 border-2 w-[70%] text-gray-400 border-gray-300 h-10"
                {...register("student")}
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.firstName} {student.lastName}
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
                className="input-width rounded pl-3 border-2 w-[70%] text-gray-400 border-gray-300 h-10"
                {...register("test")}
              >
                <option value="">Select test</option>
                {tests.map((test) => (
                  <option key={test._id} value={test._id}>
                    {test.testName}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.testName?.message}
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                id=""
                className="input-width rounded pl-3 border-2 w-[70%] text-gray-400 border-gray-300 h-10"
                placeholder="Enter Marks"
                {...register("obtainedMarks")}
              />
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.obtainedMarks?.message}
            </div>
            <div className="flex justify-center h-16">
              <button
                type="SUBMIT"
                className="bg-gray-400 mt-4 text-white text-sm h-full rounded-full focus:ring-blue-500 focus:border-blue-500 block px-2.5 w-[25%] py-3 font-bold"
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
