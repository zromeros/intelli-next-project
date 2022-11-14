import "./styles/BookForm.css";
import DatalistInput from "react-datalist-input";
import "./styles/Datalist.css";
import { useState } from "react";

export const BookForm = ({ handleSubmit, authorsOptions, yearsOptions }) => {
  const [author, setAuthor] = useState(null);
  const [year, setYear] = useState(null);
  const [title, setTitle] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("test");
    handleSubmit({
      bookAuthor: author,
      yearOfPublication: year,
      bookTitle: title,
    });
  };

  if (!authorsOptions || !yearsOptions) return <></>;

  const yearItems = [
    { id: "a", value: "" },
    ...yearsOptions.map((item) => {
      return { id: item, value: item };
    }),
  ];
  const authorItems = [
    { id: "a", value: "" },
    ...authorsOptions.map((item) => {
      return { id: item, value: item };
    }),
  ];
  return (
    <form onSubmit={onSubmit} className="book-form">
      <DatalistInput
        placeholder="Richard Bruce Wright"
        label="Select author: "
        onSelect={(item) => setAuthor(item.value)}
        items={[...authorItems]}
        value={author}
      />
      <DatalistInput
        placeholder="2003"
        label="Select year: "
        onSelect={(item) => setYear(item.value)}
        items={[...yearItems]}
        value={year}
      />
      <div className="title">
        <label htmlFor="title">{"Title: "}</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          name="title"
        />
      </div>
      <button disabled={!year && !author}>Submit</button>
    </form>
  );
};
