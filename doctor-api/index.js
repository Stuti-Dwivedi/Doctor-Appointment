import express from "express";
import cors from "cors";
import dbConnect from "./dbConnect/db.js";
import router from "./router/router.js";

const app = express();
const PORT = 9000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Express v5 safe preflight
app.use(cors())
app.use(express.json());

dbConnect();

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server is running........");
});
