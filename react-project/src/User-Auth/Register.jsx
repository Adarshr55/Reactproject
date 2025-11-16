import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContest } from "./Authcontest";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Register() {
//   const navigate = useNavigate();
//   const {isloggedin}=useContext(AuthContest)
//   useEffect(()=>{
//     if(isloggedin){
//         navigate("/")
//     }
//   },[isloggedin,navigate])
const navigate=useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        const users = res.data;

        const userExists = users.find(
          (u) =>
            u.username.toLowerCase() === values.username.toLowerCase().trim() ||
            u.email.toLowerCase() === values.email.toLowerCase().trim()
            &&
            u.isActive===true
        );

        if(userExists && userExists.isActive===true){
            toast.error("username or email already exists")
        }

        if (userExists && userExists.isBlocked===true) {
          toast.error("This Account is blocked you cannot register again");
          return;
        }

        const newUser = {
          username: values.username.trim(),
          email: values.email.trim(),
          password: values.password,
          role: "user",
          createdAt: new Date().toISOString(),
          isActive:true,
          isBlocked:false,
          wishlist:[]
        };

        await axios.post("http://localhost:5000/users", newUser);
        toast.success("Registration successful!");
        resetForm();
        navigate("/login");
      } catch (error) {
        console.error("Error during registration", error);
        toast.error("Something went wrong. Please try again!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-gray-100 shadow-md hover:shadow-xl transition-transform duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          Create an <span className="text-yellow-500">Account</span>
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-yellow-400"
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-yellow-400"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-yellow-400"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-yellow-400"
              }`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
              formik.isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg"
            }`}
          >
            {formik.isSubmitting ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-yellow-500 cursor-pointer hover:underline font-semibold"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
