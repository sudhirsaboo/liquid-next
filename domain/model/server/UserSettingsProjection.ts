import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class UserSettingsProjection extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "firstName",
            type: "string",
            format: ""
        },
        {
            name: "lastName",
            type: "string",
            format: ""
        },
        {
            name: "displayName",
            type: "string",
            format: ""
        },
        {
            name: "loginName",
            type: "string",
            format: ""
        },
        {
            name: "name",
            type: "string",
            format: ""
        },
        {
            name: "upgradeType",
            type: "integer",
            format: "int32"
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
        },
        {
            name: "email",
            type: "string",
            format: ""
        },
        {
            name: "username",
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
}
