import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser } from "../../actions/userAction";
import SignUpImage from "../../images/signup1.jpg";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(7).max(10).required(),
  userName: yup.string().min(3).max(50).required(),
  password: yup.string().min(8).max(1024).required(),
});

export const Register = (props) => {
  const { showForm } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleAddUser = (data) => {
    dispatch(addUser(data));
    navigate("/");
  };

  return (
    <>
      <div className="h-full w-full  bg-no-repeat bg-cover flex  items-center rounded-3xl shadow-lg bg-white">
        <div className="w-1/2 h-full p-2 flex items-center ">
          <div className=" object-cover">
            <img src={SignUpImage} alt="" />
          </div>
        </div>
        <div className="w-1/2 h-full p-2">
          <form
            className="w-full  p-3 rounded bg-white"
            onSubmit={handleSubmit(handleAddUser)}
          >
            <div className="flex justify-end ">
              <span
                className=" flex justify-center items-center text-white mr-3  h-10 w-10 rounded-full bg-black cursor-pointer"
                style={{ fontSize: "22px" }}
                onClick={() => showForm(false)}
              >
                X
              </span>
            </div>
            <div className="mb-2 flex justify-start">
              <h3 className="font-bold">Register</h3>
            </div>
            <div className="flex items-center border-b border-teal-500 ">
              <input
                className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
                placeholder="Enter First Name"
                type="text"
                {...register("firstName")}
              />
            </div>
            <div className="h-6">{errors.firstName?.message}</div>
            <div className="flex items-center border-b border-teal-500 ">
              <input
                className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
                placeholder="Enter Last Name"
                type="text"
                {...register("lastName")}
              />
            </div>
            <div className="h-6">{errors.lastName?.message}</div>
            <div className="flex items-center border-b border-teal-500 ">
              <input
                className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
                placeholder="Enter Email"
                type="text"
                {...register("email")}
              />
            </div>
            <div className="h-6">{errors.email?.message}</div>
            <div className="flex items-center border-b border-teal-500 ">
              <input
                className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
                placeholder="Enter password"
                type="text"
                {...register("password")}
              />
            </div>
            <div className="h-6">{errors.password?.message}</div>
            <div className="flex items-center border-b border-teal-500 ">
              <input
                className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
                placeholder="Enter Username"
                type="text"
                {...register("userName")}
              />
            </div>
            <div className="h-6">{errors.userName?.message}</div>
            <div className="flex items-center border-b border-teal-500 ">
              <input
                className=" border-none w-full text-gray-900 py-1 px-3 focus:outline-none "
                placeholder="Enter Phone Number"
                type="text"
                {...register("phone")}
              />
            </div>
            <div className="h-6">{errors.phone?.message}</div>

            <div className="flex justify-end mt-3">
              <button className="bg-teal-500 hover:bg-teal-700 text-white w-[40%] p-3 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
