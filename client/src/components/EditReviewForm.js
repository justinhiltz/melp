import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorList from "./layout/ErrorList";

const EditReviewForm = ({ editReview, rating, content, id }) => {
  const [review, setReview] = useState({
    rating: rating,
    content: content,
  });
  const [errors, setErrors] = useState([]);

  const handleRatingChange = (event) => {
    setReview({
      ...review,
      rating: event.currentTarget.value,
    });
  };

  const handleContentChange = (event) => {
    setReview({
      ...review,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    editReview(id, review);
  };

  return (
    <>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={review.rating} onChange={handleRatingChange}>
            <option value="0">0 stars</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </label>
        <label>
          Review:
          <textarea
            name="content"
            rows={4}
            cols={40}
            onChange={handleContentChange}
            value={review.content || ""}
          />
        </label>
        <input type="submit" className="button" value="Submit" />
      </form>
    </>
  );
};

export default EditReviewForm;
