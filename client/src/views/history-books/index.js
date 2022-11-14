import { useEffect, useState } from "react";
import { getConstants, listBooks } from "../../services/history-books/booksAPI";
import { BookDetail } from "./components/BookDetail";
import { BookForm } from "./components/BookForm";

export const HistoryBooks = () => {
  const [authorsOptions, setAuthorOptions] = useState([]);
  const [yearsOptions, setYearsOptions] = useState([]);
  const [isFetchConstants, setIsFetchConstants] = useState(true);
  const [isFetchBooks, setIsFetchBooks] = useState(false);
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        const { ok, res } = await getConstants();
        if (!ok) throw res;
        setAuthorOptions(res.authors);
        setYearsOptions(res.years);
      } catch (error) {
        alert(error || "Error");
      }
    };
    if (isFetchConstants) {
      fetchConstants();
      setIsFetchConstants(false);
    }

    const fetchBooks = async () => {
      try {
        const { ok, res } = await listBooks({ ...formData });
        if (!ok) throw res;
        console.log({ res });
        setBooks(res);
      } catch (error) {
        alert(error || "Error");
      }
    };
    if (isFetchBooks) {
      fetchBooks();
      setIsFetchBooks(false);
    }

    return () => null;
  }, [isFetchConstants, formData, books, isFetchBooks]);

  const handleSubmit = (obj) => {
    setFormData(obj);
    setIsFetchBooks(true);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BookForm
        authorsOptions={authorsOptions}
        yearsOptions={yearsOptions}
        handleSubmit={handleSubmit}
      />
      {books &&
        books.map((book) => {
          return <BookDetail book={book} key={book._id} />;
        })}
    </div>
  );
};
