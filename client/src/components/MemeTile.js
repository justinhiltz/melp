import React from "react";
import { Link } from "react-router-dom";

const MemeTile = ({ id, title, memeUrl }) => {
  return (
    <div>
      <h3>
        <Link to={`/memes/${id}`}>{title}</Link>
      </h3>
      <img src={memeUrl} />
    </div>
  );
};

export default MemeTile;
