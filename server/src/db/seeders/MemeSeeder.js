import { User, Meme } from "../../models/index.js";

class MemeSeeder {
  static async seed() {
    await Meme.query().delete();

    const firstUser = await User.query().findOne({ userName: "rckbi" });
    const secondUser = await User.query().findOne({ userName: "michelle" });
    const thirdUser = await User.query().findOne({ userName: "justin" });
    const fourthUser = await User.query().findOne({ userName: "nyck" });

    const firstMeme = await Meme.query().insert({
      title: "This is Fine",
      image: "https://i.kym-cdn.com/entries/icons/original/000/018/012/this_is_fine.jpeg",
      userId: firstUser.id,
    });
    const secondMeme = await Meme.query().insert({
      title: "Helium Dog",
      image:
        "https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2021/10/30/85f2cb5f-44f8-4f2f-a813-63e657e11acc_5065cac7.jpg",
      userId: secondUser.id,
    });
    const thirdMeme = await Meme.query().insert({
      title: "The Biggest Chungus",
      image: "https://i.kym-cdn.com/entries/icons/original/000/027/843/chungcover.jpg",
      userId: thirdUser.id,
    });
    const fourthMeme = await Meme.query().insert({
      title: "Kermit Tea",
      image: "https://i.kym-cdn.com/entries/icons/original/000/015/878/thatsnoneofmy.jpg",
      userId: fourthUser.id,
    });
    const fifthMeme = await Meme.query().insert({
      title: "Scumbag Steve",
      image:
        "https://i.kym-cdn.com/photos/images/original/000/097/356/No-bro-Its-spelled-liberry.jpg",
      userId: firstUser.id,
    });
    const sixthMeme = await Meme.query().insert({
      title: "When You're Allowed to Merge Without EE Approval",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWjQZFQorqOQrIBzHcgqbtobw7bGN24EMsQ&usqp=CAU",
      userId: fourthUser.id,
    });
    const seventhMeme = await Meme.query().insert({
      title: "Confused Pooh",
      image: "https://i.imgflip.com/4492sc.jpg",
      userId: secondUser.id,
    });
    const eighthMeme = await Meme.query().insert({
      title: "Tappity Tappity",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4hpR5DranfYmZtsfPfGzXmWpkqmfcRRrNng&usqp=CAU",
      userId: thirdUser.id,
    });
    const ninthMeme = await Meme.query().insert({
      title: "Objection, Your Honor",
      image: "https://i.redd.it/37es1vwc5dha1.png",
      userId: fourthUser.id,
    });
  }
}

export default MemeSeeder;
