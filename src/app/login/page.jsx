"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { base_url } from "@/utils/URL";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { Spin } from "antd";
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(base_url + "/clients/web/login", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const result = response.data;

      // Handle success
      if (response.status === 200) {
        reset();
        console.log(result);
        Cookies.set("token", result.data.access_token, {
          expires: result.expires_in / 86400, // Convert seconds to days
        });
        toast.success("Login successful!");
        setLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      reset();
      setLoading(false);
      // Handle error
      if (error.response) {
        // Error from server
        toast.error(error.response.data.message || "Login failed.");
      } else {
        // Network or other errors
        console.log(error);
        toast.error("Invalid Credentials try again.");
      }
    }
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
          <h1 className="text-2xl font-bold text-gray-800 mt-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "email is required" })}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <div className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">
                {errors.email.message}
              </div>
            )}
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
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <div className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            
          >
            {loading ? <Spin /> : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="#" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
