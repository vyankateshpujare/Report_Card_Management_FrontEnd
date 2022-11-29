import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { generateAndSendOtp, resetPassword } from "../../actions/userAction";

export function getUserId({ params }) {
  const userId = params.userId;
  return userId;
}

const checkOtpToast = () => {
  toast.error("OTP is Invalid....", {
    position: "top-center",
    autoClose: 500,
  });
};
const SendOtpToast = () => {
  toast.success("OTP send to Registred Email....", {
    position: "top-center",
    autoClose: 1500,
  });
};

const schema = yup.object().shape({
  newPassword: yup.string().required("Password is required").min(8),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const ResetPassword = () => {
  const userId = useLoaderData();
  const [otp, setOtp] = useState(0);
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userOtp = useSelector((state) => state.userReducer.otp);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (userId) {
      dispatch(generateAndSendOtp(userId));
      SendOtpToast();
    }
  }, [userId]);

  const handleResend = () => {
    if (userId) dispatch(generateAndSendOtp(userId));
    SendOtpToast();
  };

  const onSubmitHandler = (data) => {
    dispatch(resetPassword({ id: userId, password: data.newPassword }));
    navigate("/login");
  };

  const handleOtp = (value) => {
    setOtp(value);
  };

  const handleVerifyOtp = () => {
    if (userOtp == otp) {
      setVerified(true);
    } else {
      checkOtpToast();
    }
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center   bg-[#F3F3F3]">
        <form
          className="  w-1/3 mx-auto my-5 px-14 py-5 border-2 rounded-xl shadow-4xl backdrop-blur-md bg-white shadow-lg"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4 flex justify-start">
            <h3 className="font-bold">Forgot Password</h3>
          </div>
          <div className="flex items-center border-b border-teal-500">
            <label
              htmlFor="otp"
              className="block  text-lg font-medium text-black dark:text-gray-300 "
            >
              OTP
            </label>
            <input
              className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
              placeholder=" XXX XXX"
              type="text"
              onChange={(e) => handleOtp(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <div className="w-full flex justify-between px-3">
              <button
                className={`flex justify-start px-5 border-2 py-2 mb-3 rounded-2xl text-lg ${
                  verified
                    ? "bg-green-300 border-black"
                    : "bg-gray-200 border-red-800"
                } `}
                onClick={handleVerifyOtp}
              >
                {verified ? "Verified" : "Verify"}
              </button>
              <button
                className="flex justify-end px-4 py-2 text-lg"
                onClick={handleResend}
              >
                Resend
              </button>
            </div>
          </div>

          {verified ? (
            <>
              <hr className="h-[2px] w-full  border-black bg-black" />
              <div className="mt-5">
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-black dark:text-gray-300 pl-3"
                >
                  New Password
                </label>
                <input
                  {...register("newPassword")}
                  type="text"
                  id="newPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
                  placeholder="********"
                  required=""
                />
                <p className="text-red-400">{errors.newPassword?.message}</p>
              </div>
              <div className="">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-black dark:text-gray-300 pl-3"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="text"
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
                  placeholder="********"
                  required=""
                  disabled={false}
                />
                <p className="text-red-400">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <button
                type="submit"
                // className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm h-full w-full mb-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                className=" mt-5 text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-1/2 px-5  text-center py-3"
              >
                Submit
              </button>
            </>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
};
