import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  addDivision,
  getCurrentDivision,
  updateDivision,
} from "../../actions/adminActions/divisionAction";
import { getAllStandards } from "../../actions/adminActions/standardAction";

const schema = yup.object().shape({
  division: yup.string().min(1).max(1).required(),
  standard: yup.string().required(),
});

export const getDivisionLoader = ({ params }) => {
  return params.divisionId;
};

export const AddUpdadteDivision = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const divisionId = useLoaderData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleAddUpdateDivision = (data) => {
    if (data._id) {
      console.log("update", data);
      dispatch(updateDivision(data));
      navigate("/admin/divisions");
    } else {
      dispatch(addDivision(data));
      navigate("/admin/divisions");
    }
  };
  const standards = useSelector((state) => state.standardReducer.standards);
  const division = useSelector(
    (state) => state.divisionReducer.currentDivision
  );

  useEffect(() => {
    dispatch(getAllStandards());
    if (divisionId) {
      dispatch(getCurrentDivision(divisionId));
    }
  }, []);

  useEffect(() => {
    if (!divisionId) return;

    if (division) {
      setValue("standard", division.standard?._id);
      setValue("division", division.division);
      setValue("_id", division._id);
    }
  }, [division]);

  return (
    <div className="">
      <div className="w-full h-20 bg-white flex justify-end items-center"></div>
      <div className="border-t-2 p-10 h-[600px] flex justify-center">
        {/* <div className="w-[50%] h-[360px] bg-[#F3F3F3] flex justify-center items-center rounded-tl-3xl rounded-br-3xl shadow-md"> */}
          <form
            action=""
            className="w-[50%] h-[360px] border-2 border-yellow-400 rounded-b-3xl"
            onSubmit={handleSubmit(handleAddUpdateDivision)}
          >
            <div className="font-bold flex justify-start h-16">
              <span
                className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400"
                style={{ fontSize: "20px" }}
              >
                {divisionId ? "UPDATE  " : "ADD  "}
              </span>
            </div>
            <div className="flex justify-center mt-5">
              <select
                name=""
                id=""
                className=" rounded-lg pl-3 border-2 w-[70%]  border-gray-300 text-gray-400 h-10"
                {...register("standard")}
              >
                <option value="">Select Standard</option>
                {standards.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.standard}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-7 flex justify-center text-red-600">
              {errors.standard?.message}
            </div>
            <div className="flex justify-center items-center ">
              <input
                type="text"
                className="border-2  rounded h-10 pl-3  border-gray-300 text-gray-400 w-[70%]"
                placeholder="Enter Division"
                {...register("division")}
              />
            </div>
            <div className="h-7 flex justify-center text-red-600">
              {errors.division?.message}
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
