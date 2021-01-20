
class UserModel {
    constructor(parseUser) {
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("emailAddrr");
        this.role = parseUser.get("role");
        this.img = typeof parseUser.get("img") === 'undefined' ? "" : parseUser.get("img").url();
        this.building = parseUser.get("building");
    }
}

export default UserModel;