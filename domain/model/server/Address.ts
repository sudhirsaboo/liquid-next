import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Address extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "country",
            type: "string",
            format: ""
        },
        {
            name: "city",
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
            name: "county",
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
            name: "zipcode",
            type: "string",
            format: ""
        },
        {
            name: "createdDate",
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
            name: "state",
            type: "string",
            format: ""
        },
        {
            name: "region",
            type: "string",
            format: ""
        },
        {
            name: "line2",
            type: "string",
            format: ""
        },
        {
            name: "user",
            type: "string",
            format: ""
        },
        {
            name: "line1",
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
            name: "lastModifiedDate",
            model: "DateTime"
        },
        {
            name: "createdDate",
            model: "DateTime"
        },
        {
            name: "user",
            model: "User"
        }
    ];
}
