import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const doctors = [
  { name: "Dr. Sharma", dept: "Cardiology" },
  { name: "Dr. Singh", dept: "Dermatology" },
  { name: "Dr. Khan", dept: "Orthopedic" },
  { name: "Dr. Verma", dept: "Pediatrics" },
];

export default function BookAppointment() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const schema = yup.object().shape({
    patientName: yup.string().required().min(2).max(30),
    phone: yup.string().required().min(10).max(15),
    doctorName: yup.string().required(),
    department: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required(),
    reason: yup.string().required().min(3).max(200),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onDoctorChange = (e) => {
    const d = doctors.find((x) => x.name === e.target.value);
    setValue("department", d?.dept || "");
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/appointments/create", data);
      if (res?.data?.success) {
        Swal.fire("Appointment", res?.data?.message || "Booked!", "success");
        nav("/appointments");
      } else {
        Swal.fire("Appointment", res?.data?.message || "Failed", "error");
      }
    } catch (err) {
      Swal.fire("Appointment", err?.response?.data?.message || "Server error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card page-card p-4">
        <h4 className="text-primary fw-bold">Book Appointment</h4>
        <p className="text-muted mb-3">Fill patient + doctor details</p>

        {loading && <p>Loading...</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Patient Name</label>
              <input className="form-control" {...register("patientName")} />
              {errors?.patientName && (
                <p className="text-danger small">{errors.patientName.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input className="form-control" {...register("phone")} />
              {errors?.phone && (
                <p className="text-danger small">{errors.phone.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Doctor</label>
              <select className="form-select" {...register("doctorName")} onChange={onDoctorChange}>
                <option value="">Select doctor</option>
                {doctors.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name} ({d.dept})
                  </option>
                ))}
              </select>
              {errors?.doctorName && (
                <p className="text-danger small">{errors.doctorName.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Department</label>
              <input className="form-control" {...register("department")} />
              {errors?.department && (
                <p className="text-danger small">{errors.department.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" {...register("date")} />
              {errors?.date && <p className="text-danger small">{errors.date.message}</p>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Time</label>
              <input type="time" className="form-control" {...register("time")} />
              {errors?.time && <p className="text-danger small">{errors.time.message}</p>}
            </div>

            <div className="col-12">
              <label className="form-label">Reason</label>
              <textarea className="form-control" rows="3" {...register("reason")}></textarea>
              {errors?.reason && <p className="text-danger small">{errors.reason.message}</p>}
            </div>
          </div>

          <button className="btn btn-primary mt-3 w-100">Book Now</button>
        </form>
      </div>
    </div>
  );
}
