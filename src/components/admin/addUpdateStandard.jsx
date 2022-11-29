import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  addStandard,
  getCurrentStandard,
  updateStandard,
} from "../../actions/adminActions/standardAction";

const schema = yup.object().shape({
  standard: yup.string().min(1).max(4).required(),
});

export const getStandardLoader = ({ params }) => {
  return params.standardId;
};

export const AddStandard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const standardId = useLoaderData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleAddStandard = (data) => {
    if (data._id) {
      dispatch(updateStandard(data));
      navigate("/admin/standards");
    } else {
      dispatch(addStandard(data));
      navigate("/admin/standards");
    }
  };
  const standard = useSelector(
    (state) => state.standardReducer.currentStandard
  );

  useEffect(() => {
    if (standardId) {
      dispatch(getCurrentStandard(standardId));
    }
  }, []);
  useEffect(() => {
    if (!standardId) return;

    if (standard) {
      setValue("standard", standard.standard);
      setValue("_id", standard._id);
    }
  }, [standard]);

  return (
    <div className="h-[620px]">
      <div className="w-full h-20 bg-white flex justify-end items-center"></div>
      <div className="border-t-2 p-10 h-full flex justify-center ">
        {/* <div className="w-[50%] h-[350px] bg-[#F3F3F3] flex justify-center items-center rounded-tl-3xl rounded-br-3xl shadow-md"> */}
        <form
          action=""
          className=" h-[60%] w-[50%] border-2 border-yellow-400 rounded-b-3xl "
          onSubmit={handleSubmit(handleAddStandard)}
        >
          <div className="font-bold flex justify-start h-16">
            <span
              className="bg-[#F3F3F3] text-black w-[50%] flex justify-center items-center  rounded-br-full border-b-4 border-yellow-400  "
              style={{ fontSize: "20px" }}
            >
              {standardId ? "UPDATE  " : "ADD  "}
            </span>
          </div>
          <div className="h-28 ">
            <label
              htmlFor=""
              className="flex justify-center items-center text-gray-400 mt-5"
            >
              <h5>Standard</h5>
              <input
                type="text"
                id="standard"
                className="border-2 ml-5 rounded-lg h-10 pl-3 border-gray-400 w-[50%]"
                {...register("standard")}
              />
            </label>
            <p className="ml-48 text-red-700">{errors.standard?.message}</p>
          </div>

          <div className="flex justify-center h-[20%]">
            <button
              type="SUBMIT"
              className="text-white bg-gray-400 rounded-3xl hover:bg-teal-700 block px-2.5 w-[25%] font-bold mb-1"
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
