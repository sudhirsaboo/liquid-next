import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Program extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "shareable",
            type: "boolean",
            format: ""
        },
        {
            name: "venue",
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
            name: "capacity",
            type: "integer",
            format: "int32"
        },
        {
            name: "cover",
            type: "string",
            format: ""
        },
        {
            name: "password",
            type: "string",
            format: ""
        },
        {
            name: "logo",
            type: "string",
            format: ""
        },
        {
            name: "currency",
            type: "string",
            format: ""
        },
        {
            name: "end",
            type: "date",
            format: "DateTime"
        },
        {
            name: "id",
            type: "integer",
            format: "int64"
        },
        {
            name: "requirements",
            type: "string",
            format: ""
        },
        {
            name: "lastModifiedDate",
            type: "string",
            format: ""
        },
        {
            name: "showRemaining",
            type: "boolean",
            format: ""
        },
        {
            name: "format",
            type: "string",
            format: ""
        },
        {
            name: "start",
            type: "date",
            format: "DateTime"
        },
        {
            name: "version",
            type: "integer",
            format: "int64"
        },
        {
            name: "url",
            type: "string",
            format: ""
        },
        {
            name: "schedule",
            type: "string",
            format: ""
        },
        {
            name: "inviteOnly",
            type: "boolean",
            format: ""
        },
        {
            name: "createdDate",
            type: "string",
            format: ""
        },
        {
            name: "listed",
            type: "boolean",
            format: ""
        },
        {
            name: "organizer",
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
            name: "category",
            type: "string",
            format: ""
        },
        {
            name: "online_event",
            type: "boolean",
            format: ""
        },
        {
            name: "subcategory",
            type: "string",
            format: ""
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
            name: "venue",
            model: "Venue"
        },
        {
            name: "cover",
            model: "Upload"
        },
        {
            name: "logo",
            model: "Upload"
        },
        {
            name: "lastModifiedDate",
            model: "DateTime"
        },
        {
            name: "format",
            model: "ProgramFormat"
        },
        {
            name: "schedule",
            model: "Schedule"
        },
        {
            name: "createdDate",
            model: "DateTime"
        },
        {
            name: "organizer",
            model: "Organizer"
        },
        {
            name: "organization",
            model: "Organization"
        },
        {
            name: "category",
            model: "ProgramCategory"
        },
        {
            name: "subcategory",
            model: "ProgramCategory"
        },
        {
            name: "user",
            model: "User"
        }
    ];
}
