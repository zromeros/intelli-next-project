import { ObjectId } from "mongodb";

export default class Book {
  constructor(
    public ISBN: string,
    public bookTitle: string,
    public yearOfPublication: string,
    public bookAuthor: string,
    public publisher: string,
    public imageURLS: string,
    public imageURLM: string,
    public imageURLL: string,
    public _id?: ObjectId
  ) {}
}
