import express from "express";

import booksRouter from "./routes/books";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("somenone pinged here!!");
  res.send("pong");
});

app.use("/api/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
