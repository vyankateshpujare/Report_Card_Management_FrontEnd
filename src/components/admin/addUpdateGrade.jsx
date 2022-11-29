import { yupResolver } from "@hookform/resolvers/yup";
import { data } from "autoprefixer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  addGrade,
  getCurrentGrade,
  updateGrade,
} from "../../actions/adminActions/gradeAction";

const schema = yup.object().shape({
  grade: yup.string().required("Please Enter Grade"),
  start: yup.number("please enter number").required("Please Enter Min Marks"),
  end: yup
    .number("please enter number")
    .max(100)
    .required("Please Enter Max Marks"),
});

export const getGradeLoder = ({ params }) => {
  return params.gradeId;
};
export const AddUpdateGrade = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gradeId = useLoaderData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleAddUpdateGrade = (data) => {
    if (data._id) {
      dispatch(updateGrade(data));
      navigate("/admin/grades");
    } else {
      dispatch(addGrade(data));
      navigate("/admin/grades");
    }
  };

  const grade = useSelector((state) => state.gradeReducer.currentGrade);
  useEffect(() => {
    if (gradeId) dispatch(getCurrentGrade(gradeId));
  }, []);

  useEffect(() => {
    if (!gradeId) return;

    if (grade) {
      setValue("grade", grade.grade);
      setValue("start", grade.start);
      setValue("end", grade.end);
      setValue("_id", grade._id);
    }
  }, [grade]);

  return (
    <div className="">
      <div className="w-full h-20 bg-white flex justify-end items-center"></div>
      <div className="border-t-2 p-10 h-[600px] flex justify-center">
        {/* <div className="w-[50%] h-[400px] bg-[#F3F3F3] flex justify-center items-center rounded-tl-3xl rounded-br-3xl shadow-md"> */}
          <form
            action=""
            className="  h-[400px] w-[50%] border-2 border-yellow-400 rounded-b-3xl"
            onSubmit={handleSubmit(handleAddUpdateGrade)}
          >
            <div className="font-bold flex justify-start h-16">
              <span
                className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400"
                style={{ fontSize: "20px" }}
              >
                {gradeId ? "UPDATE  " : "ADD  "}
              </span>
            </div>
            <div className="flex justify-center items-center mt-4">
              <input
                type="text"
                className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] "
                placeholder="Enter  Grade"
                {...register("grade")}
              />
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.grade?.message}
            </div>
            <div className="flex justify-center items-center">
              <input
                type="text"
                className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%]"
                placeholder="Enter min marks"
                {...register("start")}
              />
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.start?.message}
            </div>
            <div className="flex justify-center items-center">
              <input
                type="text"
                className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%]"
                placeholder="enter max marks"
                {...register("end")}
              />
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.end?.message}
            </div>
            <div className="flex justify-center h-16">
              <button
                type="SUBMIT"
                value="submit"
                className="bg-gray-400 mt-3 text-white text-sm rounded-full h-full  block px-2.5 w-[25%] py-3 font-bold"
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
