import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Standard from "./components/admin/standards";
import Home from "./components/Common/home";
import ProtectedRoute from "./components/protectedRoute";
import AdminDashboard from "./components/Common/adminDashBoard";
import {
  AddStandard,
  getStandardLoader,
} from "./components/admin/addUpdateStandard";
import Division from "./components/admin/divisions";
import {
  AddUpdadteDivision,
  getDivisionLoader,
} from "./components/admin/addUpdateDivision";
import Roles from "./components/admin/roles";
import { AddUpdateRole, getRoleLoader } from "./components/admin/addUpdateRole";
import UserRoles from "./components/admin/userRoles";
import {
  AddUpdateUserRoles,
  getUserRoleId,
} from "./components/admin/addUpdateUserRole";

import Grades from "./components/admin/grades";
import {
  AddUpdateGrade,
  getGradeLoder,
} from "./components/admin/addUpdateGrade";
import { SubjectTeacherDashboard } from "./components/Common/subjectTeacherDashBoard";
import { ClassTeacherDashboard } from "./components/Common/classTeacherDashboard";
import { Students } from "./components/classTeacher/students";
import { AddStudent, getStudentId } from "./components/classTeacher/addStudent";
import { Test } from "./components/subjectTeacher/test";
import {
  AddUpdateTest,
  getTestId,
} from "./components/subjectTeacher/addUpadateTest";
import { TestResult } from "./components/subjectTeacher/result";
import { AddTestResult } from "./components/subjectTeacher/addResult";
import { Register } from "./components/Common/register";
import { Reports } from "./components/classTeacher/report";
import { GenerateReport } from "./components/classTeacher/addReport";
import { ForgotPassword } from "./components/Common/forgotPassword";
import { getUserId, ResetPassword } from "./components/Common/resetPassword";
import Login from "./components/Common/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "resetpassword/:userId",
        element: <ResetPassword />,
        loader: getUserId,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            // path: "standards",
            element: <Standard />,
            index: true,
          },
          {
            path: "standards",
            element: <Standard />,
          },
          {
            path: "addStandard",
            element: <AddStandard />,
          },
          {
            path: "updateStandard/:standardId",
            element: <AddStandard />,
            loader: getStandardLoader,
          },
          {
            path: "divisions",
            element: <Division />,
          },
          {
            path: "addDivision",
            element: <AddUpdadteDivision />,
          },
          {
            path: "updateDivision/:divisionId",
            element: <AddUpdadteDivision />,
            loader: getDivisionLoader,
          },
          {
            path: "roles",
            element: <Roles />,
          },
          {
            path: "addRole",
            element: <AddUpdateRole />,
          },
          {
            path: "updateRole/:roleId",
            element: <AddUpdateRole />,
            loader: getRoleLoader,
          },
          {
            path: "userroles",
            element: <UserRoles />,
          },
          {
            path: "addUserRole",
            element: <AddUpdateUserRoles />,
          },
          {
            path: "updateUserRole/:userRoleId",
            element: <AddUpdateUserRoles />,
            loader: getUserRoleId,
          },
          {
            path: "grades",
            element: <Grades />,
          },
          {
            path: "addGrade",
            element: <AddUpdateGrade />,
          },
          {
            path: "updateGrade/:gradeId",
            element: <AddUpdateGrade />,
            loader: getGradeLoder,
          },
        ],
      },
      {
        path: "subjectteacher",
        element: (
          <ProtectedRoute>
            <SubjectTeacherDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Test />,
          },
          {
            path: "tests",
            element: <Test />,
          },
          {
            path: "addTest",
            element: <AddUpdateTest />,
          },
          {
            path: "updateTest/:testId",
            element: <AddUpdateTest />,
            loader: getTestId,
          },
          {
            path: "results",
            element: <TestResult />,
          },
          {
            path: "addResult",
            element: <AddTestResult />,
          },
        ],
      },
      {
        path: "classteacher",
        element: (
          <ProtectedRoute>
            <ClassTeacherDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Students />,
          },
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "addStudent",
            element: <AddStudent />,
          },
          {
            path: "updateStudent/:studentId",
            element: <AddStudent />,
            loader: getStudentId,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "generatereport",
            element: <GenerateReport />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
