import React from "react";
import { Link } from "react-router-dom";

const ReviewTile = props => {
  return (
    <div>
        <li><p>{props.rating}/5 stars - {props.review}</p></li>
    </div>
  );
};

export default ReviewTile;