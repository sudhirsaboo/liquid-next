import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Category extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
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
            name: "description",
            type: "string",
            format: ""
        },
        {
            name: "avatar",
            type: "string",
            format: ""
        },
        {
            name: "version",
            type: "integer",
            format: "int64"
        },
        {
            name: "cover",
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
            type: "integer",
            format: "int64"
        },
        {
            name: "status",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            // Added Manually dont remove
            name: "parent",
            model: "Organization"
        },
        {
            name: "lastModifiedDate",
            model: "DateTime"
        },
        {
            name: "avatar",
            model: "Upload"
        },
        {
            name: "cover",
            model: "Upload"
        },
        {
            name: "createdDate",
            model: "DateTime"
        },
        {
            name: "organization",
            model: "Organization"
        }
    ];

    static hasMany = [
        {
            name: "subcagtegories",
            model: "Category"
        }
    ];
}
