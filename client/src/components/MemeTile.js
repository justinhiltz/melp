import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MemeTile = ({ id, title, image, userId }) => {
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

  return (
    <div className="grid-x grid-margin-x grid-padding-x grid-padding-y medium-4 small-6">
      <div className="cell">
        <div className="card">
          <div className="card-section">
            <h3>
              <Link to={`/memes/${id}`}>{title}</Link>
            </h3>
          </div>
          <div className="card-section">
            <Link to={`/memes/${id}`}>
              <img src={image} />
            </Link>
          </div>
          <div className="card-section">
            <p>brought to you by {userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeTile;
