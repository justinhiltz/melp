import React from "react";
import { Link } from "react-router-dom";

const MemeTile = ({ id, title, image }) => {
  return (
    <div className="cell medium-4 small-6">
      <h3>
        <Link to={`/memes/${id}`}>{title}</Link>
      </h3>
      <div className="align-center">
        <Link to={`/memes/${id}`}>
          <img src={image} />
        </Link>
      </div>
    </div>
  );
};

export default MemeTile;
