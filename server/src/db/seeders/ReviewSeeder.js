import { Meme, Review  } from "../../models/index.js"

class ReviewSeeder {
    static async seed() {
        await Review.query().delete()

        const firstMeme = await Meme.query().findOne({ title: "First Meme" })
        const secondMeme = await Meme.query().findOne({ title: "Second Meme" })
        const thirdMeme = await Meme.query().findOne({ title: "Third Meme" })

        const reviewsData = [
            {
                rating: 5,
                content: "This meme is hilarious!",
                userId: firstMeme.userId,
                memeId: firstMeme.id
            },
            {
                rating: 4,
                content: "My sentiments exactly lol",
                userId: secondMeme.userId,
                memeId: secondMeme.id
            },
            {
                rating: 3,
                content: "ROFL",
                userId: secondMeme.userId,
                memeId: secondMeme.id
            },
            {
                rating: 5,
                content: "I love chonky Bugs Bunny",
                userId: thirdMeme.userId,
                memeId: thirdMeme.id
            }
        ]

        for (const singleReviewData of reviewsData) {
            const currentReview = await Review.query().findOne(singleReviewData)
            if (!currentReview) {
              await Review.query().insert(singleReviewData)
            }
        }
    }
}

export default ReviewSeeder