import React, { useState, useEffect } from "react";
import EditReviewForm from "./EditReviewForm";
import ErrorList from "./layout/ErrorList";

const ReviewTile = ({
  rating,
  content,
  onDelete,
  id,
  currentUser,
  userId,
  memeId,
  setMeme,
  meme,
}) => {
  const [shouldEditForm, setShouldEditForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [userName, setUserName] = useState("");

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedUser = await response.json();
      setUserName(parsedUser.user.userName);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleEditButton = (event) => {
    event.preventDefault();
    if (shouldEditForm) {
      setShouldEditForm(false);
    } else {
      setShouldEditForm(true);
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
        const editedReviews = meme.reviews;
        const editedId = editedReviews.findIndex((review) => review.id === body.review.id);
        editedReviews[editedId] = body.review;
        setMeme({
          ...meme,
          reviews: editedReviews,
        });
        setShouldEditForm(false);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  let reviewControls;
  if (currentUser && currentUser.id === userId) {
    reviewControls = (
      <>
        <i
          className="icon fa-regular fa-pen-to-square"
          title="Edit Review"
          onClick={handleEditButton}
        />
        <i
          className="icon fa-regular fa-trash-can"
          title="Delete Review"
          onClick={handleDeleteButton}
        />
      </>
    );
  }

  let editFormRender;
  if (shouldEditForm) {
    editFormRender = (
      <EditReviewForm rating={rating} content={content} id={id} editReview={editReview} />
    );
  }

  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<i className={`rating-icon fa-${i < rating ? "solid" : "regular"} fa-star`} />);
  }

  return (
    <>
      <li>
        <p className="review-header">
          <strong>{userName}</strong> {stars} {reviewControls}
        </p>
        <p className="review-body">{content}</p>
      </li>
      <ErrorList errors={errors} />
      {editFormRender}
    </>
  );
};

export default ReviewTile;
