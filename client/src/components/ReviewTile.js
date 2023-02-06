import React from "react";

const ReviewTile = ({ rating, content, onDelete, id, currentUser, userId, userName }) => {

  const handleDeleteButton = (event) => {
    event.preventDefault()
    onDelete(id)
  }

  let deleteButton
  if (currentUser && currentUser.id === userId) {
    deleteButton = <input type="button" className="button" value="Delete Review" onClick={handleDeleteButton}/>
  }

  return (
    <>
    <li>{rating}/5 stars - {content}</li>
    {deleteButton}
    </>
  );
};

export default ReviewTile;