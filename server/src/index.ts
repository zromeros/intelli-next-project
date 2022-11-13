import express from "express";
import cors from "cors";
import { connectToDatabase } from "./services/database.service";

import booksRouter from "./routes/books";

const PORT = 3001;

const app = express();
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

connectToDatabase()
  .then(() => {
    app.use("/api/books", booksRouter);

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
