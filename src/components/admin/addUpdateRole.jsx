import { yupResolver } from "@hookform/resolvers/yup";
import { data } from "autoprefixer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  addRole,
  getCurrentRole,
  updateRole,
} from "../../actions/adminActions/roleAction";

const schema = yup.object().shape({
  role: yup.string().min(5).max(20).required(),
});

export const getRoleLoader = ({ params }) => {
  return params.roleId;
};

export const AddUpdateRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleId = useLoaderData();

  const role = useSelector((state) => state.roleReducer.currentRole);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (roleId) dispatch(getCurrentRole(roleId));
  }, []);

  useEffect(() => {
    if (!roleId) return;
    if (role) {
      setValue("role", role.role);
      setValue("_id", role._id);
    }
  }, [role]);

  const handleAddUpdateRole = (data) => {
    if (data._id) {
      dispatch(updateRole(data));
      navigate("/admin/roles");
    } else {
      dispatch(addRole(data));
      navigate("/admin/roles");
    }
  };

  return (
    <div className="">
      <div className="w-full h-20 bg-white flex justify-end items-center"></div>
      <div className="border-t-2 p-10 h-full flex justify-center">
        {/* <div className="w-[50%] h-[350px] bg-[#F3F3F3] flex justify-center items-center rounded-tl-3xl rounded-br-3xl shadow-md"> */}
          <form
            action=""
            className=" h-[300px] w-[50%] border-2 border-yellow-400 rounded-b-3xl "
            onSubmit={handleSubmit(handleAddUpdateRole)}
          >
            <div className="font-bold flex justify-start h-16">
              <span
                className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400"
                style={{ fontSize: "20px" }}
              >
                {roleId ? "UPDATE  " : "ADD  "}
              </span>
            </div>
            <div className="h-20">
              <label
                htmlFor=""
                className="flex justify-center items-center text-gray-400 mt-5"
              >
                <h5>Role</h5>
                <input
                  type="text"
                  className="border-2 ml-5 rounded-lg h-10 pl-3 border-gray-400 w-[50%]"
                  {...register("role")}
                />
              </label>
              <p className="ml-48 text-red-700">{errors.role?.message}</p>
            </div>
            <div className="flex justify-center h-16">
              <button
                type="SUBMIT"
                value="submit"
                className=" text-white text-sm rounded-full bg-gray-400 hover:bg-teal-700 block px-2.5 w-[25%] py-3 font-bold"
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
