import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class OrgProjection extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "cover",
            type: "string",
            format: ""
        },
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
            name: "admin",
            type: "string",
            format: ""
        },
        {
            name: "id",
            type: "integer",
            format: "int64"
        }
    ];

    static hasOne = [
        {
            name: "cover",
            model: "UploadProjection"
        },
        {
            name: "admin",
            model: "UserProjection"
        }
    ];
}
