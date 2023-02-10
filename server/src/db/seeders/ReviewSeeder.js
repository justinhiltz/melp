import { Meme, Review, User } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    await Review.query().delete();

    const firstMeme = await Meme.query().findOne({ title: "This is Fine" });
    const secondMeme = await Meme.query().findOne({ title: "Helium Dog" });
    const thirdMeme = await Meme.query().findOne({ title: "The Biggest Chungus" });
    const fourthMeme = await Meme.query().findOne({ title: "Kermit Tea" });
    const fifthMeme = await Meme.query().findOne({ title: "Scumbag Steve" });
    const sixthMeme = await Meme.query().findOne({
      title: "When You're Allowed to Merge Without EE Approval",
    });
    const seventhMeme = await Meme.query().findOne({ title: "Confused Pooh" });
    const eighthMeme = await Meme.query().findOne({ title: "Tappity Tappity" });
    const ninthMeme = await Meme.query().findOne({ title: "Objection, Your Honor" });

    const firstUser = await User.query().findOne({ userName: "rckbi" });
    const secondUser = await User.query().findOne({ userName: "michelle" });
    const thirdUser = await User.query().findOne({ userName: "justin" });
    const fourthUser = await User.query().findOne({ userName: "nyck" });

    const reviewsData = [
      {
        rating: 5,
        content: "This meme is hilarious!",
        userId: firstUser.id,
        memeId: firstMeme.id,
      },
      {
        rating: 4,
        content: "My sentiments exactly lol",
        userId: secondUser.id,
        memeId: secondMeme.id,
      },
      {
        rating: 5,
        content: "I love this big boi",
        userId: firstUser.id,
        memeId: thirdMeme.id,
      },
      {
        rating: 1,
        content: "Eww",
        userId: secondUser.id,
        memeId: thirdMeme.id,
      },
      {
        rating: 5,
        content: "I wonder if that's sleepytime tea",
        userId: thirdUser.id,
        memeId: fourthMeme.id,
      },
      {
        rating: 1,
        content: "Terrible",
        userId: fourthUser.id,
        memeId: fifthMeme.id,
      },
      {
        rating: 5,
        content: "Love this. Like a lot.",
        userId: secondUser.id,
        memeId: sixthMeme.id,
      },
      {
        rating: 1,
        content: "No.",
        userId: firstUser.id,
        memeId: sixthMeme.id,
      },
      {
        rating: 0,
        content: "Seriously?",
        userId: secondUser.id,
        memeId: seventhMeme.id,
      },
      {
        rating: 5,
        content: "Got 'em!",
        userId: fourthUser.id,
        memeId: eighthMeme.id,
      },
      {
        rating: 4,
        content: "I have definitely done this",
        userId: secondUser.id,
        memeId: ninthMeme.id,
      },
      {
        rating: 1,
        content: "Have had to debug this. Ugh!",
        userId: thirdUser.id,
        memeId: ninthMeme.id,
      },
      {
        rating: 5,
        content: "Bring the whole server down, I say!",
        userId: firstUser.id,
        memeId: ninthMeme.id,
      },
    ];

    for (const singleReviewData of reviewsData) {
      const currentReview = await Review.query().findOne(singleReviewData);
      if (!currentReview) {
        await Review.query().insert(singleReviewData);
      }
    }
  }
}

export default ReviewSeeder;
