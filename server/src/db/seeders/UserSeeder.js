import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
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
      userName: "justin",
      email: "fakeemail3@gmail.com",
      cryptedPassword: "1234",
    });
    const fourthUser = await User.query().insert({
      userName: "nyck",
      email: "fakeemail4@gmail.com",
      cryptedPassword: "1234",
    });
  }
}

export default UserSeeder;
