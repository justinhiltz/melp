import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ErrorList from "./layout/ErrorList";
import translateServerErrors from "./../services/translateServerErrors";

const NewMemeForm = (props) => {
  const [newMeme, setNewMeme] = useState({
    title: "",
    memeUrl: "",
  });

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const addNewMeme = async () => {
    try {
      const response = await fetch("/api/v1/memes", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newMeme),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        setShouldRedirect({
          status: true,
          id: body.meme.id,
        });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setNewMeme({
      ...newMeme,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewMeme(newMeme);
    clearForm();
  };

  const clearForm = () => {
    setNewMeme({
      title: "",
      memeUrl: "",
    });
  };

  if (shouldRedirect.status) {
    return <Redirect to={`/memes/${shouldRedirect.id}`} />;
  }

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x align-center">
        <div className="cell medium-6">
          <h1>Add a Meme</h1>
          <ErrorList errors={errors} />
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input type="text" name="title" onChange={handleInputChange} value={newMeme.title} />
            </label>

            <label>
              Meme URL:
              <input
                type="text"
                name="memeUrl"
                onChange={handleInputChange}
                value={newMeme.memeUrl}
              />
            </label>

            <div className="button-group">
              <input className="button" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMemeForm;
