import React, { useState, useEffect } from "react";

import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import ReviewTile from "./ReviewTile";
import NewReviewForm from "./NewReviewForm";

const MemeShowPage = (props) => {
  const [meme, setMeme] = useState({ reviews: [] });
  const [errors, setErrors] = useState([]);

  const memeId = props.match.params.id;
  const currentUser = props.currentUser;

  const getMeme = async () => {
    try {
      const response = await fetch(`/api/v1/memes/${memeId}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const parsedResponse = await response.json();
      setMeme(parsedResponse.meme);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getMeme();
  }, []);

  const postReview = async (newReviewData) => {
    try {
      const response = await fetch(`/api/v1/memes/${memeId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newReviewData),
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
        const updatedReviews = meme.reviews.concat(body.review);
        setErrors([]);
        setMeme({ ...meme, reviews: updatedReviews });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      setMeme({
        ...meme,
        reviews: meme.reviews.filter((review) => review.id !== reviewId),
      });
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const reviewTileComponents = meme.reviews.map((reviewObject) => {
    return (
      <ReviewTile
        key={reviewObject.id}
        {...reviewObject}
        onDelete={deleteReview}
        currentUser={currentUser}
        setMeme={setMeme}
        meme={meme}
        voteCount={reviewObject.voteCount}
      />
    );
  });

  let form;
  if (currentUser) {
    form = <NewReviewForm postReview={postReview} />;
  }

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x align-center">
        <div className="cell medium-6">
          <h1>{meme.title}</h1>
          <img src={meme.image} />
          <ul>{reviewTileComponents}</ul>
          <ErrorList errors={errors} />
          {form}
        </div>
      </div>
    </div>
  );
};

export default MemeShowPage;
