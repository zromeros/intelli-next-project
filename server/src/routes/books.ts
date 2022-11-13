import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Book from "../models/books";
const router = express.Router();

router.get("/constants", async (_req, res) => {
  try {
    if (!collections.books) throw new Error("Collection no found");

    const authors = await collections.books.distinct("bookAuthor");
    const years = await collections.books.distinct("yearOfPublication");
    res.status(200).send({
      authors,
      years,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/list", async (req, res) => {
  try {
    const { bookTitle, bookAuthor, yearOfPublication } = req.body;
    if (!collections.books) throw new Error("Collection no found");
    if (!bookAuthor && !yearOfPublication && !bookTitle)
      throw new Error("Invalid params");

    const bodyParams = {
      yearOfPublication,
      bookAuthor,
    };

    const orQuery = Object.entries(bodyParams)
      .map(([key, value]): any => {
        if (value) return { [key]: value };
        return null;
      })
      .filter((obj) => obj != null);

    const books = (await collections.books
      .find({
        $and: [...orQuery, { bookTitle: { $regex: new RegExp(bookTitle) } }],
      })
      .limit(20)
      .toArray()) as Book[];

    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const updatedBook: Book = req.body as Book;
    if (!collections.books) throw new Error("Collection no found");
    const result = await collections.books.insertOne({
      updatedBook,
    });

    result
      ? res.status(200).send(`Successfully inserted book `)
      : res.status(304).send(`Book with not inserted`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedBook: Book = req.body as Book;
    const query = { _id: new ObjectId(id) };
    if (!collections.books) throw new Error("Collection no found");
    const result = await collections.books.updateOne(query, {
      $set: updatedBook,
    });

    result
      ? res.status(200).send(`Successfully updated bool with id ${id}`)
      : res.status(304).send(`Book with id: ${id} not updated`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    if (!collections.books) throw new Error("Collection no found");
    const result = await collections.books.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed book with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove book with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Book with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default router;
