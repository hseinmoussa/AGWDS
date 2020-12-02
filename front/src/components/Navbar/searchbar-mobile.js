import React from "react";
import "./nav.css";

const SearchBarM = ({ keyword, setKeyword }) => {
  return (
    <input
      key="random1"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="SB-mobile"
      type="text"
      placeholder="Search Art..."
      required
    />
  );
};

export default SearchBarM;
