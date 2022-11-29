import * as actions from "../../actions/actionType";

export const studentReducer = (
  state = { students: [], currentStudent: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_STUDENTS:
      return { ...state, students: action.payload.students };

    case actions.GET_CURRENT_STUDENT:
      return { ...state, currentStudent: action.payload.student };

    case actions.ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, { ...action.payload.student }],
      };

    case actions.UPDATE_STUDENT:
      const updatedArr = state.students.map((s) => {
        if (s._id === action.payload.student._id) {
          s = action.payload.student;
        }
        return s;
      });
      return { ...state, students: updatedArr };

    case actions.DELETE_STUDENT:
      const newArr = state.students.filter(
        (s) => s._id !== action.payload.student._id
      );
      return { ...state, students: newArr };

    default:
      return state;
  }
};
