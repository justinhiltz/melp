import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Dropzone from "react-dropzone";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "./../services/translateServerErrors";

const NewMemeForm = (props) => {
  const [newMeme, setNewMeme] = useState({
    title: "",
    image: {},
  });

  const [uploadedImage, setUploadedImage] = useState({
    preview: "",
  });

  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState({
    status: false,
    id: null,
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    setNewMeme({
      ...newMeme,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleImageUpload = (acceptedImage) => {
    setNewMeme({
      ...newMeme,
      image: acceptedImage[0],
    });

    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0]),
    });
  };

  const addMeme = async (event) => {
    event.preventDefault();

    let submitErrors = {};
    if (newMeme.title.trim() === "") {
      console.log(newMeme.title);
      submitErrors = {
        ...submitErrors,
        title: "Title can't be blank",
      };
    }
    if (newMeme.image === {}) {
      submitErrors = {
        ...submitErrors,
        image: "Image can't be blank",
      };
    }

    const newMemeBody = new FormData();
    newMemeBody.append("title", newMeme.title);
    newMemeBody.append("image", newMeme.image);

    try {
      const response = await fetch("/api/v1/memes", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: newMemeBody,
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
      }
      const body = await response.json();
      setShouldRedirect({
        status: true,
        id: body.meme.id,
      });
    } catch (error) {
      console.error(`Error in addMeme Fetch: ${error.message}`);
    }
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
          <form onSubmit={addMeme}>
            <label>Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleInputChange}
              value={newMeme.title}
            />

            <Dropzone onDrop={handleImageUpload}>
              {({ getRootProps, getInputProps }) => (
                <section className="upload-box callout text-center">
                  <div {...getRootProps({})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' Drop or click here to upload a meme</p>
                    <i class="icon-large fa-solid fa-cloud-arrow-up fa-10x" />
                  </div>
                </section>
              )}
            </Dropzone>

            <img className="img-preview" src={uploadedImage.preview} />

            <div className="button-group">
              <input className="button" type="submit" value="Add Meme" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMemeForm;
