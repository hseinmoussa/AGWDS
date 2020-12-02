import React from "react";
import "./nav.css";

const SearchBar = (handleChange) => {
  return (
    <input
      key="random1"
      className=" SB"
      type="text"
      onChange={handleChange}
      placeholder="Search Art..."
      required
    />
  );
};

export default SearchBar;
