export const DeletePopUp = (props) => {
  const { onShowPopUp, onDelete, itemId } = props;

  const handleOnDelete = () => {
    onDelete();
    onShowPopUp(false);
  };

  return (
    <div className="h-full w-full rounded-3xl ">
      <div className="flex justify-end pr-4 cursor-pointer pt-2">
        <span
          onClick={() => onShowPopUp(false)}
          className="bg-white rounded-full w-10 h-10 flex justify-center items-center"
        >
          X
        </span>
      </div>
      <div className="flex justify-center text-white text-bold">
        <h3>Are You Sure !!</h3>
      </div>
      <div className="flex justify-center text-white ">
        <h5>Do You Really Want To Delete . . .</h5>
      </div>
      <div className="mt-5 flex justify-center ">
        <button
          type="button"
          className="bg-white rounded-full w-28 h-10 font-bold"
          onClick={handleOnDelete}
        >
          YES
        </button>
      </div>
    </div>
  );
};
