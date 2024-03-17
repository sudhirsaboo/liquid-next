import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Organization extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "address",
            type: "string",
            format: ""
        },
        {
            name: "lastModifiedDate",
            type: "string",
            format: ""
        },
        {
            name: "displayName",
            type: "string",
            format: ""
        },
        {
            name: "admin",
            type: "string",
            format: ""
        },
        {
            name: "description",
            type: "string",
            format: ""
        },
        {
            name: "version",
            type: "integer",
            format: "int64"
        },
        {
            name: "createdDate",
            type: "string",
            format: ""
        },
        {
            name: "contact",
            type: "string",
            format: ""
        },
        {
            name: "ldescription",
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
            type: "integer",
            format: "int64"
        },
        {
            name: "user",
            type: "string",
            format: ""
        },
        {
            name: "status",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "address",
            model: "Address"
        },
        {
            name: "lastModifiedDate",
            model: "DateTime"
        },
        {
            name: "admin",
            model: "User"
        },
        {
            name: "createdDate",
            model: "DateTime"
        },
        {
            name: "contact",
            model: "Contact"
        },
        {
            name: "user",
            model: "User"
        }
    ];

    static hasMany = [
        {
            name: "suborgs",
            model: "Organization"
        },
        {
            name: "users",
            model: "User"
        },
        {
            name: "subOrgs",
            model: "Organization"
        }
    ];
}
