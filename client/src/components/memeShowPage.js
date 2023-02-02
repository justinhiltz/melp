import React, { useState, useEffect } from "react";

import NewMemeForm from "./NewMemeForm";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import ReviewTile from "./ReviewTile";

const MemeShowPage = (props) => {
  const [meme, setMeme] = useState({ reviews: [] });

  const memeId = props.match.params.id;

  const getMeme = async () => {
    try {
      const response = await fetch(`/api/v1/memes/${memeId}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const parsedResponse = await response.json();
      setMeme(parsedResponse.meme);
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getMeme();
  }, []);

  const reviewTileComponents = meme.reviews.map((reviewObject) => {
    return <ReviewTile key={reviewObject.id} {...reviewObject} />;
  });

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x align-center">
        <div className="cell medium-6">
          <h1>{meme.title}</h1>
          <img src={meme.memeUrl} />
          <ul>{reviewTileComponents}</ul>
        </div>
      </div>
    </div>
  );
};

export default MemeShowPage;
