import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getAllDivisions } from "../../actions/adminActions/divisionAction";
import { getAllRoles } from "../../actions/adminActions/roleAction";
import { getAllStandards } from "../../actions/adminActions/standardAction";
import { getAllSubjects } from "../../actions/adminActions/subjectAction";
import {
  addUserRole,
  getCurrentUserRole,
  updateUserRoles,
} from "../../actions/adminActions/userRoleAction";
import { getAllUsers } from "../../actions/userAction";

const schema = yup.object().shape({
  user: yup.string().required("Please Select User"),
  role: yup.string().required("Please Select Role"),
  standard: yup.string().required("Please Select Standard"),
  division: yup.string().required("Please Select Division"),
  subject: yup.string().required("Please Select Subject"),
  year: yup.number().required("Please Select Year"),
});

export const getUserRoleId = ({ params }) => {
  return params.userRoleId;
};

export const AddUpdateUserRoles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRoleId = useLoaderData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const users = useSelector((state) => state.userReducer.users);
  const roles = useSelector((state) => state.roleReducer.roles);
  const standards = useSelector((state) => state.standardReducer.standards);
  const divisions = useSelector((state) => state.divisionReducer.divisions);
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const userRole = useSelector(
    (state) => state.userRoleReducer.currentUserRole
  );

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllRoles());
    dispatch(getAllStandards());
    dispatch(getAllDivisions());
    dispatch(getAllSubjects());
    if (userRoleId) dispatch(getCurrentUserRole(userRoleId));
  }, []);

  useEffect(() => {
    if (!userRoleId) return;

    dispatch(getCurrentUserRole(userRoleId));
    if (userRole) {
      setValue("user", userRole.user._id);
      setValue("role", userRole.role._id);
      setValue("standard", userRole.standard._id);
      setValue("division", userRole.division._id);
      setValue("subject", userRole.subject._id);
      setValue("year", userRole.year);
      setValue("_id", userRole._id);
    }
  }, [userRole]);

  const years = [
    2010, 2011, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];

  const handleAddUpadateUserRole = (data) => {
    if (data._id) {
      dispatch(updateUserRoles(data));
      navigate("/admin/userroles");
    } else {
      dispatch(addUserRole(data));
      navigate("/admin/userroles");
    }
  };

  return (
    <div className="">
      <div className="w-full h-20 bg-white flex justify-end items-center"></div>
      <div className="border-t-2 p-6 h-[600px] flex justify-center paper-window overflow-y-auto">
        {/* <div className="w-[50%] h-[580px] bg-[#F3F3F3] flex justify-center items-center rounded-tl-3xl rounded-br-3xl shadow-md"> */}
          <form
            action=""
            className="  h-[570px] w-[50%] border-2 border-yellow-400 rounded-b-3xl "
            onSubmit={handleSubmit(handleAddUpadateUserRole)}
          >
            <div className="font-bold flex justify-start h-16">
              <span
                className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400"
                style={{ fontSize: "20px" }}
              >
                {userRoleId ? "UPDATE  " : "ADD  "}
              </span>
            </div>
            <div className="flex justify-center mt-4">
              <select
                name=""
                id=""
                className="input-width rounded pl-3 border-2 w-[70%]  border-gray-300 text-gray-400 h-10"
                {...register("user")}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.user?.message}
            </div>
            <div className="flex justify-center">
              <select
                name=""
                id=""
                className="input-width rounded  border-2 w-[70%] pl-3 text-gray-400 border-gray-300 h-10"
                {...register("role")}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.role?.message}
            </div>
            <div className="flex justify-center">
              <select
                name=""
                id=""
                className="input-width rounded  border-2 w-[70%] pl-3 text-gray-400 border-gray-300  h-10"
                {...register("standard")}
              >
                <option value="">Select Standard</option>
                {standards.map((standard) => (
                  <option key={standard._id} value={standard._id}>
                    {standard.standard}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.standard?.message}
            </div>
            <div className="flex justify-center">
              <select
                name=""
                id=""
                className="input-width rounded  border-2 w-[70%] pl-3 text-gray-400 border-gray-300  h-10"
                {...register("division")}
              >
                <option value="">Select Division</option>
                {divisions.map((division) => (
                  <option key={division._id} value={division._id}>
                    {division.division}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.division?.message}
            </div>
            <div className="flex justify-center">
              <select
                name=""
                id=""
                className="input-width rounded  border-2 w-[70%] pl-3 text-gray-400 border-gray-300  h-10"
                {...register("subject")}
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6 flex justify-center text-red-600">
              {errors.subject?.message}
            </div>
            <div className="flex justify-center">
              <select
                name=""
                id=""
                className="input-width rounded  border-2 w-[70%] pl-3 text-gray-400 border-gray-300  h-10"
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
                className="bg-gray-400 mt-2 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block px-2.5 w-[25%] py-3 h-full font-bold"
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
