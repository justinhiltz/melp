class VoteSerializer{
    static async getSummary(votes) {
        let voteCount = votes.reduce((accumulator, currentValue) => accumulator + currentValue.vote, 0)
        return voteCount
      }
}

export default VoteSerializer