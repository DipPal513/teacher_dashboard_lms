"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add validation logic
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulated API call
    setError(""); // Clear error
    console.log("Email:", email, "Password:", password);

    // You can redirect or show a success message
    alert("Login Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
            alt="Logo"
            className="h-20 mx-auto rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Welcome Back!</h1>
          <p className="text-gray-600">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
