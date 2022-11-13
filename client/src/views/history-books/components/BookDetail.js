import "./styles/BookDetail.css";

export const BookDetail = ({ book }) => {
  console.log({ book });
  return (
    <ul className="book-details">
      <p>{book.album}</p>
      <p>{book.year}</p>
      <p>{book.US_peak_chart_post}</p>
    </ul>
  );
};
