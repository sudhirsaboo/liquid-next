import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class ArtClass extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "classDay",
            type: "string",
            format: ""
        },
        {
            name: "endDate",
            type: "date",
            format: "DateTime"
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
            name: "title",
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
            name: "sortOrder",
            type: "integer",
            format: "int32"
        },
        {
            name: "name",
            type: "string",
            format: ""
        },
        {
            name: "location",
            type: "string",
            format: ""
        },
        {
            name: "startTime",
            type: "string",
            format: ""
        },
        {
            name: "endTime",
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
            name: "startDate",
            type: "date",
            format: "DateTime"
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
            name: "organization",
            model: "Organization"
        },
        {
            name: "user",
            model: "User"
        }
    ];
}
