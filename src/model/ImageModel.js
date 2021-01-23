
class ImageModel {
    constructor(parseImage) {
        this.id = parseImage.id;
        this.name = parseImage.get("name");
        this.img = parseImage.get("img");
    }
}

export default ImageModel;
