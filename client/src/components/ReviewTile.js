import React, { useState } from "react";
import EditReviewForm from "./EditReviewForm";
import ErrorList from "./layout/ErrorList";


const ReviewTile = ({ rating, content, onDelete, id, currentUser, userId, memeId, setMeme, meme, voteCount }) => {

  const [shouldEditForm, setShouldEditForm] = useState(false);
  const [errors, setErrors] = useState([]);

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

  const handleUpvote = event => {
    event.preventDefault()
    addReviewVote(1)
  }

  const handleDownvote = event => {
    event.preventDefault()
    addReviewVote(-1)
  }

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
        const editedId = editedReviews.findIndex(review => review.id === body.review.id);
        editedReviews[editedId] = body.review;
        setMeme({...meme, reviews: editedReviews});
        setShouldEditForm(false);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };


  const addReviewVote = async (value) => {
    try {
      const response = await fetch(`/api/v1/reviews/${id}/votes`, {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify( {value: value} )
      })
      if(!response.ok){
        throw new Error(`${response.status} (${response.statusText})`)
      }else{
        const body = await response.json()
        const newVoteCount = body.newVoteCount
        const editedReviews = meme.reviews
        const editedId = editedReviews.findIndex(review => review.id === id)
        editedReviews[editedId].voteCount = newVoteCount
        setMeme({...meme, reviews: editedReviews})
      }
    } catch (error) {
      console.error(`Error in vote fetch: ${error.message}`)
    }
  }

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

  let voteButtons
  if(currentUser){
    voteButtons = (
      <>
        <input className='button' type='button' value='Upvote' onClick={handleUpvote}/>
        <input className='button' type='button' value='Downvote' onClick={handleDownvote}/>
      </>
    )
  }

  return (
    <>
      <li>
        {rating}/5 stars - {content} {reviewControls}
      </li>
      <ErrorList errors={errors} />
      {editFormRender}
      {voteButtons}
      Votes: {voteCount}
    </>
  );
};

export default ReviewTile;
