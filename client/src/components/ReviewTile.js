import React from "react";

const ReviewTile = props => {
  return (
    <li>{props.rating}/5 stars - {props.content}</li>
  );
};

export default ReviewTile;