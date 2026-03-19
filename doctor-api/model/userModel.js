import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const userModel = mongoose.model("users", userSchema);

// ✅ Appointment Schema
const appointmentSchema = new mongoose.Schema({
  patientName: String,
  phone: String,
  doctorName: String,
  department: String,
  date: String,    // "2026-02-05"
  time: String,    // "11:30"
  reason: String,
  status: { type: String, default: "Booked" }, // Booked/Cancelled/Completed
  createdAt: { type: Date, default: Date.now }
});

export const AppointmentModel = mongoose.model("appointments", appointmentSchema);
