import express from "express";
import dotenv from "dotenv";

//routes imported
import authRouter from "./routes/auth/auth.routes";

const app = express();
dotenv.config();

app.use(express.json());

//Base path for auth
app.use("/api/auth", authRouter);

const port = process.env.PORT;

//test to see if its correctly deployed from Vercel
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

export default app;
