import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MemeTile from "./MemeTile";

const MemesListPage = (props) => {
  const [memes, setMemes] = useState([]);

  const getMemes = async () => {
    try {
      const response = await fetch("/api/v1/memes");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedMemes = await response.json();
      setMemes(parsedMemes.memes);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getMemes();
  }, []);

  const memeTileComponents = memes.map((memeObject) => {
    return <MemeTile key={memeObject.id} {...memeObject} />;
  });

  // const handleImageUpload = (acceptedImage) => {
  //   setNewMemeFormData({
  //     ...newMemeFormData,
  //     image: acceptedImage[0],
  //   });
  // };
  // const addMeme = async (event) => {
  //   event.preventDefault();
  //   const newMemeBody = new FormData();
  //   newMemeBody.append("title", newMemeFormData.title);
  //   newMemeBody.append("image", newMemeFormData.image);

  //   try {
  //     const response = await fetch("/api/v1/memes", {
  //       method: "POST",
  //       headers: {
  //         Accept: "image/jpeg",
  //       },
  //       body: newMemeBody,
  //     });
  //     if (!response.ok) {
  //       throw new Error(`${response.status} (${response.statusText})`);
  //     }
  //     const body = await response.json();
  //     setMemes([...memes, body.meme]);
  //   } catch (error) {
  //     console.error(`Error in addMeme Fetch: ${error.message}`);
  //   }
  // };

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x grid-margin-y align-center">
        <div className="cell">
          <h1 className="text-center">Melp!</h1>
        </div>
        {memeTileComponents}
      </div>
    </div>
  );
};

export default MemesListPage;
