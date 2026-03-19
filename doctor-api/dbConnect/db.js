import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/DoctorAppointment");
    if (conn) {
      console.log("Db Connected!..");
    }
  } catch (err) {
    console.log("DB Connection Error:", err.message);
  }
};

export default dbConnect;
