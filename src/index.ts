import express from "express";
import { connectDB } from "./db";
import itemRoutes from "./routes/itemRoutes";
import offerRoutes from "./routes/offerRoutes";

const app = express();
const PORT = 5000;

// Connect MongoDB
connectDB();

app.use(express.json());
app.use("/items", itemRoutes);
app.use("/offers", offerRoutes);

app.get("/", (req, res) => {
  res.send("POS Backend Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
