import "./styles/BookDetail.css";

export const BookDetail = ({ book }) => {
  return (
    <ul className="book-details">
      <p>
        <span>Title: </span>
        {book.bookTitle}
      </p>
      <p>
        <span>Year: </span> {book.yearOfPublication}
      </p>
      <p>
        <span>Author: </span> {book.bookAuthor}
      </p>
    </ul>
  );
};
