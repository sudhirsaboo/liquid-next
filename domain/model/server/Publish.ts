import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Publish extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [];

    static hasMany = [
        {
            name: "images",
            model: "Image"
        }
    ];
}
