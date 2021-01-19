
class VoteModel {
    constructor(parseVote) {
        this.id = parseVote.id;
        this.title = parseVote.get("title");
        this.details = parseVote.get("details");
        this.options = parseVote.get("options");
        this.building = parseVote.get("building");
        this.endDate = parseVote.get("endDate");
        this.voteStatus = parseVote.get("voteStatus");
        this.result = parseVote.get("result");
        this.votesPieData = parseVote.get("votesPieData");
    }
}

export default VoteModel;