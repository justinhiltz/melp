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

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // const addNewMeme = async () => {
  //   try {
  //     const response = await fetch("/api/v1/memes", {
  //       method: "POST",
  //       headers: new Headers({
  //         "Content-Type": "application/json",
  //       }),
  //       body: JSON.stringify(newMeme),
  //     });
  //     if (!response.ok) {
  //       if (response.status === 422) {
  //         const body = await response.json();
  //         const newErrors = translateServerErrors(body.errors);
  //         return setErrors(newErrors);
  //       } else {
  //         const errorMessage = `${response.status} (${response.statusText})`;
  //         const error = new Error(errorMessage);
  //         throw error;
  //       }
  //     } else {
  //       const body = await response.json();
  //       setShouldRedirect({
  //         status: true,
  //         id: body.meme.id,
  //       });
  //     }
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };

  // const handleInputChange = (event) => {
  //   setNewMeme({
  //     ...newMeme,
  //     [event.currentTarget.name]: event.currentTarget.value,
  //   });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   addNewMeme(newMeme);
  //   clearForm();
  // };

  const clearForm = () => {
    setNewMeme({
      title: "",
      image: {},
    });
  };

  if (shouldRedirect.status) {
    return <Redirect to={`/memes/${shouldRedirect.id}`} />;
  }

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
    const newMemeBody = new FormData();
    newMemeBody.append("title", newMeme.title);
    newMemeBody.append("image", newMeme.image);
    clearForm();

    for (let pair of newMemeBody.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await fetch("/api/v1/memes", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: newMemeBody,
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();
      debugger;
      // redirect not set state
      setNewMeme([...newMeme, body.meme]);
    } catch (error) {
      console.error(`Error in addMeme Fetch: ${error.message}`);
    }
  };
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
                <section>
                  <div {...getRootProps({})}>
                    <input {...getInputProps()} />
                    <p>Upload Your Meme - drag 'n' drop or click here to upload</p>
                  </div>
                </section>
              )}
            </Dropzone>

            <img src={uploadedImage.preview} />

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
