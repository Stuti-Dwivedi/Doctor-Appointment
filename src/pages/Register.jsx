import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import Swal from "sweetalert2";

export default function Register() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Name required").min(2).max(18),
    email: yup.string().required("Email required").email("Invalid email"),
    password: yup.string().required("Password required").min(2).max(18),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/register", data);
      if (res?.data?.success) {
        Swal.fire("Register", res?.data?.message || "Success", "success");
        reset();
        nav("/");
      } else {
        Swal.fire("Register", res?.data?.message || "Failed", "error");
      }
    } catch (err) {
      Swal.fire("Register", err?.response?.data?.message || "Server error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row g-3 align-items-stretch">
        <div className="col-md-6">
          <div className="left-banner">
            <h3 className="fw-bold">Create your account</h3>
            <p className="mb-2">Register once and manage your appointments.</p>
            <div className="badge-soft">Simple + Clean UI</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card auth-card p-4">
            <h4 className="text-primary text-center fw-bold">Register</h4>

            {loading && <p className="text-center">Loading...</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
              <input
                {...register("name")}
                type="text"
                className="form-control mb-2"
                placeholder="Enter your name"
              />
              {errors?.name && <p className="text-danger small">{errors.name.message}</p>}

              <input
                {...register("email")}
                type="email"
                className="form-control mb-2"
                placeholder="Enter your email"
              />
              {errors?.email && <p className="text-danger small">{errors.email.message}</p>}

              <input
                {...register("password")}
                type="password"
                className="form-control mb-2"
                placeholder="Enter your password"
              />
              {errors?.password && (
                <p className="text-danger small">{errors.password.message}</p>
              )}

              <button className="btn btn-primary w-100 mt-2">Register</button>
            </form>

            <p className="mt-3 text-center">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
