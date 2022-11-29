import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getAllDivisions } from "../../actions/adminActions/divisionAction";
import { getAllStandards } from "../../actions/adminActions/standardAction";
import {
  addStudent,
  getCurrentStudent,
  updateStudent,
} from "../../actions/classTeachersActions/studentAction";
import jwt_decode from "jwt-decode";
import { useState } from "react";

const schema = yup.object().shape({
  rollNumber: yup.number().min(1).max(100).required(),
  firstName: yup.string().min(3).max(50).required(),
  middleName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  dob: yup.date().required(),
  parents: yup.object({
    firstName: yup.string().min(3).max(50).required(),
    lastName: yup.string().min(3).max(50).required(),
    phone: yup.string().min(7).max(10),
    email: yup.string().email(),
    addressLine1: yup.string().required(),
    addressLine2: yup.string(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.string().required(),
  }),
  isActive: yup.boolean().default(false),
});

export const getStudentId = ({ params }) => {
  return params.studentId;
};

export const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentId = useLoaderData();

  const [img, setImg] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({}); //resolver: yupResolver(schema)

  const token = useSelector((state) => state.loginReducer.token);
  const decoded = jwt_decode(token);
  const student = useSelector((state) => state.studentReducer.currentStudent);

  useEffect(() => {
    if (studentId) {
      dispatch(getCurrentStudent(studentId));
    }
  }, []);

  useEffect(() => {
    if (!studentId) return;

    if (student) {
      setValue("firstName", student.firstName);
      setValue("middleName", student.middleName);
      setValue("lastName", student.lastName);
      setValue("rollNumber", student.rollNumber);
      setValue("dob", new Date(student.dob).toLocaleDateString());
      setValue("parents.firstName", student.parents?.firstName);
      setValue("parents.lastName", student.parents?.lastName);
      setValue("parents.phone", student.parents?.phone);
      setValue("parents.email", student.parents?.email);
      setValue("parents.addressLine1", student.parents?.addressLine1);
      setValue("parents.city", student.parents?.city);
      setValue("parents.state", student.parents?.state);
      setValue("parents.zipCode", student.parents?.zipCode);
      setValue("_id", student._id);
    }
  }, [student]);

  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleAddStudent = (data) => {
    data = { ...data, file: img };
    if (data._id) {
      dispatch(updateStudent(decoded._id, data));
      navigate("/classteacher/students");
    } else {
      dispatch(addStudent(decoded._id, data));
      navigate("/classteacher/students");
    }
  };

  return (
    <div className="">
      <div className="w-full h-[90px] bg-white flex justify-end items-center"></div>
      <div className="border-t-2 p-5 h-[600px] flex justify-centerpaper-window overflow-y-auto">
        {/* <div className="w-full h-[750px] bg-[#F3F3F3] flex justify-center items-center rounded-tl-3xl rounded-br-3xl shadow-md"> */}
          <form
            className="h-[750px] w-[94%] border-2 border-yellow-400 rounded-b-3xl"
            onSubmit={handleSubmit(handleAddStudent)}
            encType="multipart/form-data"
          >
            <div className="flex">
              <div className="w-[50%]">
                <div className="font-bold flex justify-start h-12">
                  <span
                    className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400"
                    style={{ fontSize: "20px" }}
                  >
                    {"Student Details"}
                  </span>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter  First Name"
                    {...register("firstName")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.firstName?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400 "
                    placeholder="Enter  Middle Name"
                    {...register("middleName")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.middleName?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400 "
                    placeholder="Enter  Last Name"
                    {...register("lastName")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.lastName?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter  Roll Number"
                    {...register("rollNumber")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.rollNumber?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter Date Of Birth"
                    {...register("dob")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.dob?.message}
                </div>
                <div className="flex justify-center items-center ">
                  <input
                    type="file"
                    id=""
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    name="file"
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>
              </div>
              <div className="w-[50%]">
                <div className="font-bold flex justify-start h-12">
                  <span
                    className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400"
                    style={{ fontSize: "20px" }}
                  >
                    {"Parents Details"}
                  </span>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter  First Name"
                    {...register("parents.firstName")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.parents?.firstName?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter  Last Name"
                    {...register("parents.lastName")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.parents?.lastName?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter Phone Number"
                    {...register("parents.phone")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.parents?.phone?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter Email"
                    {...register("parents.email")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.parents?.email?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter Address"
                    {...register("parents.addressLine1")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.parents?.addressLine1?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter city"
                    {...register("parents.city")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.parents?.city?.message}
                </div>
                <div className="flex justify-center items-center ">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter state"
                    {...register("parents.state")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.parents?.state?.message}
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    className="border-2 rounded h-10 pl-3 border-gray-300 w-[70%] text-gray-400"
                    placeholder="Enter Zip Code"
                    {...register("parents.zipCode")}
                  />
                </div>
                <div className="h-6 flex justify-center text-red-600">
                  {errors.parents?.zipCode?.message}
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-center h-16">
              <button
                className="bg-gray-400 text-white w-[30%] p-3 rounded-full h-full"
                style={{fontSize:"20px"}}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        {/* </div> */}
      </div>
    </div>
  );
};
