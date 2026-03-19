import { userModel, AppointmentModel } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ✅ REGISTER
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        code: 400,
        message: "All fields are required.",
        data: "",
        error: true,
      });
    }

    const isExist = await userModel.findOne({ email });

    if (isExist) {
      return res.json({
        success: false,
        code: 400,
        message: "User Already Exists.",
        data: isExist,
        error: true,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const data = new userModel({ name, email, password: hashPassword });
    const result = await data.save();

    return res.json({
      success: true,
      code: 200,
      message: "User Register Successfully!",
      data: result,
      error: false,
    });
  } catch (err) {
    console.log("REGISTER ERROR:", err.message);
    return res.json({
      success: false,
      code: 500,
      message: "Internal Server Error.",
      data: "",
      error: true,
    });
  }
};

// ✅ LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        code: 400,
        message: "Email & Password required.",
        data: "",
        error: true,
      });
    }

    const data = await userModel.findOne({ email });

    if (!data) {
      return res.json({
        success: false,
        code: 404,
        message: "User Not Found",
        data: "",
        error: true,
      });
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res.json({
        success: false,
        code: 400,
        message: "Invalid Credentials login failed!",
        data: "",
        error: true,
      });
    }

    const payload = { email: data.email };
    const token = jwt.sign(payload, "jwt_secret", { expiresIn: "1h" });

    return res.json({
      success: true,
      code: 200,
      message: "Login Successfully!",
      data: data,
      token,
      error: false,
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    return res.json({
      success: false,
      code: 500,
      message: "Internal Server Error",
      data: "",
      error: true,
    });
  }
};

// ✅ CREATE APPOINTMENT
export const createAppointmentController = async (req, res) => {
  try {
    const { patientName, phone, doctorName, department, date, time, reason, status } = req.body;

    if (!patientName || !phone || !doctorName || !department || !date || !time || !reason) {
      return res.json({
        success: false,
        code: 400,
        message: "All fields are required.",
        data: "",
        error: true,
      });
    }

    // Optional: Same doctor same date same time slot check
    const isExist = await AppointmentModel.findOne({ doctorName, date, time, status: "Booked" });
    if (isExist) {
      return res.json({
        success: false,
        code: 400,
        message: "This slot already booked!",
        data: "",
        error: true,
      });
    }

    const data = new AppointmentModel({
      patientName,
      phone,
      doctorName,
      department,
      date,
      time,
      reason,
      status: status || "Booked",
    });

    const result = await data.save();

    return res.json({
      success: true,
      code: 200,
      message: "Appointment Booked!",
      data: result,
      error: false,
    });
  } catch (err) {
    console.log("CREATE APPOINTMENT ERROR:", err.message);
    return res.json({
      success: false,
      code: 500,
      message: "Internal Server Error",
      data: "",
      error: true,
    });
  }
};

// ✅ GET ALL APPOINTMENTS
export const getAppointmentController = async (req, res) => {
  try {
    const result = await AppointmentModel.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      code: 200,
      message: "Appointment get!",
      data: result,
      error: false,
    });
  } catch (err) {
    console.log("GET APPOINTMENT ERROR:", err.message);
    return res.json({
      success: false,
      code: 500,
      message: "Internal Server Error",
      data: "",
      error: true,
    });
  }
};

// ✅ GET SINGLE APPOINTMENT
export const getSingleAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await AppointmentModel.findOne({ _id: id });

    if (!result) {
      return res.json({
        success: false,
        code: 404,
        message: "Appointment Not Found",
        data: "",
        error: true,
      });
    }

    return res.json({
      success: true,
      code: 200,
      message: "Appointment Found!",
      data: result,
      error: false,
    });
  } catch (err) {
    console.log("GET SINGLE ERROR:", err.message);
    return res.json({
      success: false,
      code: 500,
      message: "Internal Server Error",
      data: "",
      error: true,
    });
  }
};

// ✅ DELETE APPOINTMENT
export const deleteAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AppointmentModel.deleteOne({ _id: id });

    return res.json({
      success: true,
      code: 200,
      message: "Appointment Deleted!",
      data: result,
      error: false,
    });
  } catch (err) {
    console.log("DELETE ERROR:", err.message);
    return res.json({
      success: false,
      code: 500,
      message: "Internal Server Error",
      data: "",
      error: true,
    });
  }
};

// ✅ UPDATE APPOINTMENT
export const updateAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientName, phone, doctorName, department, date, time, reason, status } = req.body;

    const result = await AppointmentModel.updateOne(
      { _id: id },
      { $set: { patientName, phone, doctorName, department, date, time, reason, status } }
    );

    return res.json({
      success: true,
      code: 200,
      message: "Appointment Updated!",
      data: result,
      error: false,
    });
  } catch (err) {
    console.log("UPDATE ERROR:", err.message);
    return res.json({
      success: false,
      code: 500,
      message: "Internal Server Error",
      data: "",
      error: true,
    });
  }
};
