import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { standardReducer } from "./adminReducers/standardReducer";
import { roleReducer } from "./adminReducers/roleReducer";
import { divisionReducer } from "./adminReducers/divisionReducer";
import { userRoleReducer } from "./adminReducers/userRoleReducer";
import { gradeReducer } from "./adminReducers/gradesReducer";
import { subjectReducer } from "./adminReducers/subjectReducer";
import { studentReducer } from "./classTeachersReducer/studentReducer";
import { testReducer } from "./subjectTeachersReducer/testReducer";
import { testResultReducer } from "./subjectTeachersReducer/resultReducer";
import { reportReducer } from "./classTeachersReducer/reportReducer";

export default combineReducers({
  loginReducer,
  userReducer,
  standardReducer,
  divisionReducer,
  roleReducer,
  userRoleReducer,
  gradeReducer,
  subjectReducer,
  studentReducer,
  testReducer,
  testResultReducer,
  reportReducer,
});
