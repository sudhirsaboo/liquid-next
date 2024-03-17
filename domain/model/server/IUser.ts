import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class IUser extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "displayName",
            type: "string",
            format: ""
        },
        {
            name: "name",
            type: "string",
            format: ""
        },
        {
            name: "viewsCount",
            type: "integer",
            format: "int64"
        },
        {
            name: "id",
            type: "string",
            format: ""
        }
    ];
}
