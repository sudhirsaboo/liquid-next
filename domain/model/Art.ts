import Model from "./server/Image";

export default class Art extends Model {
    liked: boolean = false;

    constructor(props) {
        super(props);
    }

    like(toggle) {
        this.liked = toggle;
    }
    unlike(toggle) {
        this.liked = toggle;
    }
}
