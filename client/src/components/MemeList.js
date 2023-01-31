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
  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x align-center callout primary">
        <div className="cell grid-x grid-margin-x small-11 align-center callout">
          <div className="cell small-11 grid-x grid-margin-x align-center callout secondary">
            {memeTileComponents}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemesListPage;
