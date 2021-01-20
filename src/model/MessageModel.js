
class MessageModel {
    constructor(parseMessage) {
        this.id = parseMessage.id;
        this.title = parseMessage.get("title");
        this.details = parseMessage.get("details");
        this.priority = parseMessage.get("priority");
        this.building = parseMessage.get("building");
        this.isRead = parseMessage.get("isRead");
        this.img = parseMessage.get("img").url();
        this.date = parseMessage.get("date");
    }
}

export default MessageModel;