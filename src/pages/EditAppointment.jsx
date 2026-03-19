import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import Swal from "sweetalert2";

export default function EditAppointment() {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    doctorName: "",
    department: "",
    date: "",
    time: "",
    reason: "",
  });

  const fetchOne = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/appointments/${id}`);
      if (res?.data?.success) setForm(res.data.data);
    } catch (err) {
      Swal.fire("Error", "Unable to load appointment", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOne();
  }, []);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.put(`/appointments/${id}`, form);
      if (res?.data?.success) {
        Swal.fire("Updated", res?.data?.message || "Updated", "success");
        nav("/appointments");
      } else {
        Swal.fire("Error", res?.data?.message || "Failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "Server error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card page-card p-4">
        <h4 className="text-primary fw-bold">Edit Appointment</h4>

        {loading && <p>Loading...</p>}

        <form onSubmit={onUpdate} className="mt-3">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Patient Name</label>
              <input
                className="form-control"
                name="patientName"
                value={form.patientName || ""}
                onChange={onChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                name="phone"
                value={form.phone || ""}
                onChange={onChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Doctor Name</label>
              <input
                className="form-control"
                name="doctorName"
                value={form.doctorName || ""}
                onChange={onChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Department</label>
              <input
                className="form-control"
                name="department"
                value={form.department || ""}
                onChange={onChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={form.date || ""}
                onChange={onChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={form.time || ""}
                onChange={onChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Reason</label>
              <textarea
                className="form-control"
                rows="3"
                name="reason"
                value={form.reason || ""}
                onChange={onChange}
              />
            </div>
          </div>

          <button className="btn btn-warning w-100 mt-3">Update Appointment</button>
        </form>
      </div>
    </div>
  );
}
