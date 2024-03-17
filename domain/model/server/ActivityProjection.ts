import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class ActivityProjection extends Model {
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
            name: "organization",
            type: "string",
            format: ""
        },
        {
            name: "name",
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
            name: "organization",
            model: "IDNameProjection"
        }
    ];

    static hasMany = [
        {
            name: "roles",
            model: "Role"
        }
    ];
}
