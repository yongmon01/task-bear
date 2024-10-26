import { TextField } from "@mui/material";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useState } from "react";

interface SearchBoxProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox = (props: SearchBoxProps) => {
  const { setKeyword } = props;
  const [text, setText] = useState("");
  const debounced = useDebounce(text, 500);

  useEffect(() => {
    setKeyword(debounced);
  }, [debounced, setKeyword]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setText(e.target.value);
  };

  return (
    <TextField
      style={{ width: "400px" }}
      placeholder="search robot or location"
      onChange={handleChange}
    />
  );
};

export default SearchBox;
