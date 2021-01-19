
class CommentModel {
    debugger;
    constructor(parseComment) {
        this.id = parseComment.id;
        this.title = parseComment.get("title");
        this.details = parseComment.get("details");
        this.priority = parseComment.get("priority");
        this.building = parseComment.get("building");
        this.isRead = parseComment.get("isRead");
        this.img = parseComment.get("img");
        this.date = parseComment.get("date");
    }
}

export default CommentModel;