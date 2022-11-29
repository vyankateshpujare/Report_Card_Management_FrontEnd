import * as actions from "../../actions/actionType";

export const gradeReducer = (
  state = { grades: [], currentGrade: {}, totalNoOfGrades: 0 },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_GRADES:
      return { ...state, grades: action.payload.grades };

    case actions.GET_CURRENT_GRADE:
      return {
        ...state,
        currentGrade: action.payload.grade,
      };

    case actions.GET_TOTAL_GRADES:
      return { ...state, totalNoOfGrades: action.payload.totalNoOfGrades };

    case actions.ADD_GRADE:
      return {
        ...state,
        grades: [...state.grades, { ...action.payload.grade }],
      };

    case actions.UPDATE_GRADE:
      const updatedArr = state.grades.map((g) => {
        if (g._id === action.payload.grade._id) {
          g = action.payload.grade;
        }
        return g;
      });
      return { ...state, grades: updatedArr };

    case actions.DELETE_GRADE:
      const newArr = state.grades.filter(
        (g) => g._id !== action.payload.grade._id
      );
      return { ...state, grades: newArr };

    default:
      return state;
  }
};
