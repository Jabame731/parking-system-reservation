import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//routes imported
import authRouter from "./routes/auth/auth.routes";
import parkingSlotRouter from "./routes/parking/parking.routes";
import reservationRouter from "./routes/reservation/reservation.routes";
import sensorRouter from "./routes/sensor/sensor.routes";

const app = express();
dotenv.config();

const allowedOrigins = [process.env.DEVELOPMENT_FRONTEND_PORT!];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        console.error("CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

//Base path for auth
app.use("/api/auth", authRouter);

//Base path for parking slot
app.use("/api/parkingSlots", parkingSlotRouter);

//Base path for reservation
app.use("/api/parkingReservation", reservationRouter);

//Base path for sensor
app.use("/api/sensor", sensorRouter);

const port = process.env.PORT;

//test to see if its correctly deployed from Vercel
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

export default app;
