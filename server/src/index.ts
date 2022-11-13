import express from "express";
import cors from "cors";

import booksRouter from "./routes/books";

const app = express();
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());

const PORT = 3001;

app.use("/api/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
