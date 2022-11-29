import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../actions/loginAction";

export const UserProfile = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, profileImage, email } = props;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-center mb-3">
        <img
          src={profileImage}
          alt="profile image"
          className=" object-cover cursor-pointer rounded-full h-20 w-20"
        />
      </div>
      <div className="flex justify-center text-gray-600">
        <h4>{firstName + " " + lastName}</h4>
      </div>
      <div className="flex justify-center text-gray-500 mb-5 text-lg">
        {email}
      </div>
      <div className="flex justify-center ">
        <button
          type="button"
          className="border-2 border-black rounded h-12 w-24"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
