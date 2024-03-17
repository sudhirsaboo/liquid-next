import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class UserProfile extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "coverId",
            type: "integer",
            format: "int64"
        },
        {
            name: "displayName",
            type: "string",
            format: ""
        },
        {
            name: "description",
            type: "string",
            format: ""
        }
    ];
}
