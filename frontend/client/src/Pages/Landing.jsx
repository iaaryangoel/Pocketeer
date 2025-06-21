import React from "react";
import {useNavigate} from "react-router-dom";
import ShowLoveButton from "../Components/Cards/ShowLoveButton";
import logo from "../assets/Images/pocketeer-logo.png"
import bgimage4 from "../assets/Images/bgimage4.png"

const Landing = () => {

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleGetStarted = () => {
    if (isAuthenticated) navigate("/dashboard");
  else navigate("/login");
  }

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
    <div className="bg-opacity-90 min-h-screen bg-cover bg-center flex flex-col"
         style={{ backgroundImage: `url(${bgimage4})`}}
    >
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <img
          src={logo}
          alt="Pocketeer Logo"
          className="w-64 h-64 animate-fade-in"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Pocketeer
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          Master your money - track spending, manage budgets, and build better money habits effortlessly.
        </p>
        <button
          className="cursor-pointer mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 px-4 md:px-12 shadow-inner">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center" style={{ boxShadow: "0 10px 40px rgba(160, 100, 255, 0.3)" }}>
            <h3 className="font-semibold text-lg mb-2">Expense Tracking</h3>
            <p className="text-gray-600 text-sm">
              Log and categorize all your daily expenses with ease.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center" style={{ boxShadow: "0 10px 40px rgba(160, 100, 255, 0.3)" }}>
            <h3 className="font-semibold text-lg mb-2">Budget Planning</h3>
            <p className="text-gray-600 text-sm">
              Set monthly budgets and track how well you stick to them.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center" style={{ boxShadow: "0 10px 40px rgba(160, 100, 255, 0.3)" }}>
            <h3 className="font-semibold text-lg mb-2">Visual Reports</h3>
            <p className="text-gray-600 text-sm">
              Get clear insights into your spending habits with charts.
            </p>
          </div>
        </div>
      </div>

      {/* Show Love Button */}
      {/* <div className="mt-12 text-center">
        <button
          onClick={() => alert('Thanks for the love!')}
          className="flex items-center justify-center mx-auto px-5 py-2 bg-pink-500 text-white rounded-full text-lg shadow hover:bg-pink-600 transition duration-200"
        >
          ❤️ Show Love
        </button>
      </div> */}

      <div className="mt-1 text-center">
        <ShowLoveButton />
      </div>
    </div>
  );
};

export default Landing;
