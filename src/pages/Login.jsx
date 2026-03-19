import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import Swal from "sweetalert2";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required").min(2).max(18),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/login", data); // backend later
      if (res?.data?.success) {
        Swal.fire("Login", res?.data?.message || "Success", "success");
        localStorage.setItem("token", JSON.stringify(res?.data?.token));
        nav("/book");
      } else {
        Swal.fire("Login", res?.data?.message || "Failed", "error");
      }
    } catch (err) {
      Swal.fire("Login", err?.response?.data?.message || "Server error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row g-3 align-items-stretch">
        <div className="col-md-6">
          <div className="left-banner">
            <h3 className="fw-bold">Doctor Appointment System</h3>
            <p className="mb-2">Book appointments quickly, view and edit anytime.</p>
            <div className="badge-soft">Secure Login + JWT</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card auth-card p-4">
            <h4 className="text-primary text-center fw-bold">Login</h4>

            {loading && <p className="text-center">Loading...</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
              <input
                {...register("email")}
                type="email"
                className="form-control mb-2"
                placeholder="Enter your email"
              />
              {errors?.email && (
                <p className="text-danger small">{errors.email.message}</p>
              )}

              <input
                {...register("password")}
                type="password"
                className="form-control mb-2"
                placeholder="Enter your password"
              />
              {errors?.password && (
                <p className="text-danger small">{errors.password.message}</p>
              )}

              <button className="btn btn-primary w-100 mt-2">Login</button>
            </form>

            <p className="mt-3 text-center">
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
