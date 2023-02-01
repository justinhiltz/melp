import React, {useState, useEffect} from "react"

const memeShowPage = (props) => {
    const [meme, setMeme] = useState({})

    const getMeme = async() => {
        const memeId = props.match.params.id
        try {
            const response = await fetch(`/api/v1/memes/${memeId}`)
            if(!response.ok){
                throw new Error(`${response.status} (${response.statusText})`)
            }
            const parsedResponse = await response.json()
            setMeme(parsedResponse.meme)
        } catch (error) {
            console.log(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getMeme()
    }, [])

    return(
        <div>
            <h1>{meme.title}</h1>
            <img src={meme.memeUrl}/>
        </div>
    )
}

export default memeShowPage