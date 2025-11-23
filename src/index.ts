// Base setup
import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Routes
import userRoutes from "./routes/userRoutes"
import reminderRoutes from "./routes/reminderRoutes"
import { errorHandler } from "./middlewares/errorHandler";

app.get("/", (req: Request, res: Response) => {
  res.send("Reminder API Connected");
});

app.use("/users", userRoutes);
app.use("/reminders", reminderRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
