import React, {useState} from "react"

const NewReviewForm = ({ postReview }) => {
    const [newReview, setNewReview] = useState({
        rating: "0",
        content: ""
    })

    const handleRatingChange = event => {
        setNewReview({
            ...newReview, 
            rating: event.currentTarget.value
        })
    }
    
    const handleContentChange = (event) => {
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postReview(newReview)
        clearForm()
    }

    const clearForm = () => {
        setNewReview({
            rating: "0",
            content: ""
        })
    }

    return(
        <div className="cell medium-6">
          <h1>Add a Review</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Rating:
              <select value={newReview.rating} onChange={handleRatingChange}>
                <option value="0">0 stars</option>
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
              </select>
            </label>

            <label>
              Review:
              <textarea 
                name="review" 
                rows={4}
                cols={40}
                onChange={handleContentChange}/>
            </label>

            <div className="button-group">
              <input className="button" type="submit" value="Submit" />
            </div>
          </form>
        </div>
    )
}

export default NewReviewForm