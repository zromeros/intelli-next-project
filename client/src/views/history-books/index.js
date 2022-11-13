import { useEffect, useState } from "react";
import { getBooks } from "../../services/history-books/booksAPI";

export const HistoryBooks = () => {
  //const [books, setBooks] = [];
  const [isFetch, setIsFetch] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        console.log({ response });
      } catch (error) {
        alert(error || "Error");
      }
    };
    if (isFetch) {
      fetchBooks();
      setIsFetch(false);
    }

    return () => null;
  }, [isFetch, setIsFetch]);

  return <p> im a book </p>;
};
