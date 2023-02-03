/* eslint-disable no-console */
import { connection } from "../boot.js"

import UserSeeder from "./seeders/UserSeeder.js"
import MemeSeeder from "./seeders/MemeSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"

class Seeder {
  static async seed() {
    
    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("Seeding memes...")
    await MemeSeeder.seed()

    console.log("Seeding reviews...")
    await ReviewSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
