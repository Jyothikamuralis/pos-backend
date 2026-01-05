import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import itemRoutes from "./routes/itemRoutes";
import offerRoutes from "./routes/offerRoutes";
import billingRoutes from "./routes/billingRoutes";

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/items", itemRoutes);
app.use("/offers", offerRoutes);
app.use("/billing", billingRoutes); // ✅ REQUIRED

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
