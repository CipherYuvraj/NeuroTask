import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

const NexusPortal = () => {
  useEffect(() => {
    document.body.style.background =
      "linear-gradient(135deg, #1e1e2e 0%, #3a0ca3 50%, #9d4edd 100%)";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 neon-text">
            NEUROFORM
          </h1>
          <p className="text-gray-300 mt-2 tracking-wider">NeuroTask</p>
        </div>

        <form className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i className="fas fa-user text-gray-400"></i>
            </div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              className="input-field w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i className="fas fa-lock text-gray-400"></i>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              className="input-field w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <i className="fas fa-gamepad"></i>
            <span>ENTER PORTAL</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-gray-400 hover:text-pink-400 transition duration-300 flex items-center justify-center space-x-2"
          >
            <i className="fas fa-question-circle"></i>
            <span>Forgot Credentials?</span>
          </a>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Nexus Gaming. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NexusPortal;