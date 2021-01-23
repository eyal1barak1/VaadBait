
class CommentModel {
    constructor(parseComment) {
        this.id = parseComment.id;
        this.text = parseComment.get("text");
        this.done = parseComment.get("done");
        this.userFname = parseComment.get("userFname");
        this.userLname = parseComment.get("userLname");
        this.img = parseComment.get("img");
    }
}

export default CommentModel;