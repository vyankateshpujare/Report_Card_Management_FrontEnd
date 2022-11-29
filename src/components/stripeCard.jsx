import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const StripeCard = (props) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="w-[85%] bg-gray-100 p-3 rounded-lg h-20 flex justify-evenly">
        {/* {props.std ? (
          <label htmlFor="standardinput" className="flex mx-1 items-center">
            Standard
            <span className="text-gray-700 ml-8">{props.std.name}</span>
          </label>
        ) : (
          ""
        )} */}
        {props.div ? (
          <>
            <label htmlFor="standardinput" className="flex  items-center">
              Standard
              <span className="text-gray-700 ml-8">{props.div.standard.standard}</span>
            </label>
            <label htmlFor="standardinput" className="flex  items-center">
              Division
              <span className="text-gray-700 ml-8">{props.div.division}</span>
            </label>
          </>
        ) : (
          ""
        )}

        {props.role ? (
          <label htmlFor="roleinput" className="flex mx-1 items-center">
            Roles
            <span className="text-gray-700 ml-5">{props.role.name}</span>
          </label>
        ) : (
          ""
        )}

        {props.grade ? (
          <label htmlFor="gradeinput" className="flex mx-1 items-center">
            Grade
            <span className="text-gray-700 ml-5">{props.grade}</span>
          </label>
        ) : (
          ""
        )}
        {props.Min ? (
          <label htmlFor="gradeinput" className="flex mx-12 items-center">
            Min Marks
            <span className="text-gray-700 ml-5">{props.Min}</span>
          </label>
        ) : (
          ""
        )}
      </div>
      <div className="h-20 px-3 my-1 text-xs w-[14%] rounded-lg bg-gray-100 text-white flex items-center justify-evenly">
        <FiEdit
          size={15}
          className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
        />
        <FiTrash2
          size={15}
          className="text-primary h-10 w-10 p-[10px] cursor-pointer rounded-full bg-gray-50"
        />
      </div>
    </div>
  );
};

export default StripeCard;
