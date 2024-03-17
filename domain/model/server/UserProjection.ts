import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class UserProjection extends Model {
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
            name: "avatar",
            type: "string",
            format: ""
        },
        {
            name: "id",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "avatar",
            model: "Upload"
        }
    ];

    static hasMany = [
        {
            name: "roles",
            model: "Role"
        }
    ];
}
