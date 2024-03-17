import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class UserForAdminProjection extends Model {
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
        }
    ];

    static hasOne = [
        {
            name: "organization",
            model: "OrgProjection"
        },
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
