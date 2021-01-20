
class CommentModel {
    debugger;
    constructor(parseComment) {
        this.id = parseComment.id;
        this.text = parseComment.get("text");
        this.done = parseComment.get("done");
        this.userFname = parseComment.get("userFname");
        this.userLname = parseComment.get("userLname");
    }
}

export default CommentModel;