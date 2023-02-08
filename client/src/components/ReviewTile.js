import React, { useState } from "react";
import EditReviewForm from "./EditReviewForm";
import ErrorList from "./layout/ErrorList";

const ReviewTile = ({ rating, content, onDelete, id, currentUser, userId, memeId, setMeme, meme }) => {
  const [editForm, setEditForm] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleEditButton = (event) => {
    event.preventDefault();
    if (editForm) {
      setEditForm(false);
    } else {
      setEditForm(true)
    }
  };

  const handleDeleteButton = (event) => {
    event.preventDefault();
    onDelete(id);
  };

  const editReview = async (reviewId, reviewData) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      } else {
        const body = await response.json();
        setErrors([]);
        const editedReviews = meme.reviews
        const editedId = editedReviews.findIndex(review => review.id === body.review.id)
        editedReviews[editedId] = body.review
        setMeme({
          ...meme,
          reviews: editedReviews
        })
        setEditForm(false)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  let editButton;
  if (currentUser && currentUser.id === userId) {
    editButton = (
      <input type="button" className="button" value="Edit Review" onClick={handleEditButton} />
    );
  }

  let deleteButton;
  if (currentUser && currentUser.id === userId) {
    deleteButton = (
      <input type="button" className="button" value="Delete Review" onClick={handleDeleteButton} />
    );
  }

  let shouldEditForm
  if(editForm){
    shouldEditForm = (
      <EditReviewForm
        rating={rating}
        content={content}
        id={id}
        editReview={editReview}
      />
    )
  }

  return (
    <>
      <li>
        {rating}/5 stars - {content}
      </li>
      {editButton}
      {deleteButton}
      <ErrorList errors={errors} />
      {shouldEditForm}
    </>
  );
};

export default ReviewTile;
