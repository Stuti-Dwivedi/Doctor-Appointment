import express from "express";
import jwt from "jsonwebtoken";
import {
  registerController,
  loginController,
  createAppointmentController,
  getAppointmentController,
  deleteAppointmentController,
  updateAppointmentController,
  getSingleAppointmentController
} from "../controller/controller.js";

const router = express.Router();

// ✅ SAME AuthMiddleware FORMAT
const AuthMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({
      success: false,
      code: 404,
      message: "Token is required!.",
      data: "",
      error: true,
    });
  }

  const rawToken = req.headers.authorization.split(" ");
  const token = rawToken[1];

  jwt.verify(token, "jwt_secret", (err, decode) => {
    if (err) {
      return res.json({
        success: false,
        code: 400,
        message: "Invalid Or Expired token.",
        data: "",
        error: true,
      });
    } else {
      req.user = decode;
      next();
    }
  });
};

// ✅ Auth Routes
router.post("/register", registerController);
router.post("/login", loginController);

// ✅ Appointment Routes (protected)
router.post("/create-appointment", AuthMiddleware, createAppointmentController);
router.get("/get-appointment", AuthMiddleware, getAppointmentController);
router.get("/get-appointment/:id", AuthMiddleware, getSingleAppointmentController);
router.delete("/del-appointment/:id", AuthMiddleware, deleteAppointmentController);
router.put("/update-appointment/:id", AuthMiddleware, updateAppointmentController);

export default router;
