import express, { Request, Response } from "express";
//import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Book from "../models/books";
import * as booksServices from "../services/booksServices";
import toNewBookEntry from "../utils/utils";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    if (!collections.books) throw new Error("Collection no found");

    const books = (await collections.books
      .find({})
      .limit(20)
      .toArray()) as Book[];

    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/all", (_req, res) => {
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
