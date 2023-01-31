/* eslint-disable no-console */
import { connection } from "../boot.js";
import User from "../models/User.js";
import Meme from "../models/Meme.js";

class Seeder {
  static async seed() {
    await Meme.query().delete();
    await User.query().delete();
    const firstUser = await User.query().insert({
      userName: "rckbi",
      email: "fakeemail@gmail.com",
      cryptedPassword: "1234",
    });
    const secondUser = await User.query().insert({
      userName: "michelle",
      email: "fakeemail2@gmail.com",
      cryptedPassword: "1234",
    });
    const thirdUser = await User.query().insert({
      userName: "us",
      email: "fakeemail@gmail3.com",
      cryptedPassword: "1234",
    });

    const firstMeme = await Meme.query().insert({
      title: "First Meme",
      memeUrl: "https://i.kym-cdn.com/entries/icons/original/000/018/012/this_is_fine.jpeg",
      userId: firstUser.id,
    });
    const secondMeme = await Meme.query().insert({
      title: "Second Meme",
      memeUrl:
        "https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2021/10/30/85f2cb5f-44f8-4f2f-a813-63e657e11acc_5065cac7.jpg",
      userId: secondUser.id,
    });
    const thirdMeme = await Meme.query().insert({
      title: "Third Meme",
      memeUrl: "https://i.kym-cdn.com/entries/icons/original/000/027/843/chungcover.jpg",
      userId: thirdUser.id,
    });
    const fourthMeme = await Meme.query().insert({
      title: "Fourth Meme",
      memeUrl: "https://i.kym-cdn.com/entries/icons/original/000/015/878/thatsnoneofmy.jpg",
      userId: firstUser.id,
    });

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
