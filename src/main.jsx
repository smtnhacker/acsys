import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import TeacherProblemList from './pages/TeacherProblemList.jsx'
import CreateProblemForm from './pages/CreateProblemForm.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <TeacherDashboard />
  },
  {
    path: "/problems",
    element: <TeacherProblemList />
  },
  {
    path: "/new_problem",
    element: <CreateProblemForm />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
