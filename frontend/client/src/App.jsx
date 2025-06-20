import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Home from "./Pages/Dashboard/Home";
import Income from "./Pages/Dashboard/Income";
import Expense from "./Pages/Dashboard/Expense";
import UserProvider from "./Context/UserContext";
import {Toaster} from "react-hot-toast"
import PrivateRoute from "./Components/Layouts/PrivateRoute";
import Landing from "./Pages/Landing";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<PrivateRoute> <Home /> </PrivateRoute>} />
            <Route path="/income" exact element={<PrivateRoute> <Income /> </PrivateRoute>} />
            <Route path="/expense" exact element={<PrivateRoute> <Expense /> </PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" replace/>} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          },
        }}
      />
    </UserProvider>
  );
};

export default App;
