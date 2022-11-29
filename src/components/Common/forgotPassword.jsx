import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdEmail } from "react-icons/md";
import { useEffect } from "react";
import { getAllUsers } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup.string().required("Please enter email").min(5).max(50).email(),
});

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  let match = false;

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const users = useSelector((state) => state.userReducer.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (userId) {
      navigate(`/resetpassword/${userId}`);
    }
  }, [userId]);

  const handleOnSubmit = (data) => {
    users?.map((user) => {
      if (user.email == data.email) {
        match = true;
        setUserId(user._id);
      }
    });

    if (!match) {
      alert("email is invalid");
    }
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center   bg-[#F3F3F3]">
        <form
          action=""
          className="h-[35%] w-[30%] bg-white rounded-3xl shadow-lg p-10"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="flex justify-end ">
            <NavLink to="/"
              className=" flex justify-center items-center text-white mr-3  h-10 w-10 rounded-full bg-black cursor-pointer no-underline"
              style={{ fontSize: "22px" }}
            >
              X
            </NavLink>
          </div>
          <div className="mb-4 flex justify-start">
            <h3 className="font-bold">Forgot Password</h3>
          </div>
          <div className="flex items-center border-b border-teal-500 ">
            <MdEmail size={25} />
            <input
              className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
              placeholder="Enter email"
              type="text"
              {...register("email")}
            />
          </div>
          <div className="h-6 text-red-400">{errors.email?.message}</div>

          <div className="flex justify-end">
            <button
              type="submit"
              value="SEND"
              className="bg-teal-500 mt-3 text-white text-sm rounded-full  block w-[40%] px-2.5 py-3 font-bold"
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
