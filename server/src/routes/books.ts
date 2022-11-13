import express from "express";
import * as booksServices from "../services/booksServices";
import toNewBookEntry from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("test");
  res.send(booksServices.getBooks());
});

router.get("/:year", (req, res) => {
  const book = booksServices.findByYear(Number(req.params.year));

  return book != null ? res.send(book) : res.sendStatus(404);
});

router.post("/", (req, res) => {
  try {
    const newBook = toNewBookEntry(req.body);
    const addedBookEntry = booksServices.addBook(newBook);

    res.json(addedBookEntry);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
