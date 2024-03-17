import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class ImageUserPK extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "user",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "user",
            model: "User"
        }
    ];
}
