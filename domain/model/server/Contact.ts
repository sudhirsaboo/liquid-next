import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Contact extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "birthday",
            type: "date",
            format: "DateTime"
        },
        {
            name: "lastName",
            type: "string",
            format: ""
        },
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
            name: "firstName",
            type: "string",
            format: ""
        },
        {
            name: "createdDate",
            type: "string",
            format: ""
        },
        {
            name: "phone",
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
            name: "fax",
            type: "string",
            format: ""
        },
        {
            name: "email",
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
            name: "createdDate",
            model: "DateTime"
        }
    ];
}
