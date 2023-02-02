import React, { useState, useEffect } from "react";

const MemeShowPage = (props) => {
  const [meme, setMeme] = useState({});

  const getMeme = async () => {
    const memeId = props.match.params.id;
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

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x align-center">
        <div className="cell medium-6">
          <h1>{meme.title}</h1>
          <img src={meme.memeUrl} />
        </div>
      </div>
    </div>
  );
};

export default MemeShowPage;
