import { BooksEntry } from "../types";

import booksData from "./books.json";

const books: Array<BooksEntry> = booksData as Array<BooksEntry>;

export const getBooks = () => books;

export const addBook = (newBookEntry: BooksEntry): BooksEntry => {
    const newBook = {
        ...newBookEntry
    }
    books.push(newBook)
    return newBook
};


export const findByYear = (year: number): BooksEntry | undefined => {
    const entry = books.find(b => b.year === year)
    return entry
} 