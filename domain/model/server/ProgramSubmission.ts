import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class ProgramSubmission extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "questionnaire",
            type: "string",
            format: ""
        },
        {
            name: "lastModifiedDate",
            type: "string",
            format: ""
        },
        {
            name: "album",
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
            name: "program",
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
            name: "questionnaire",
            model: "ProgramQuestionnaire"
        },
        {
            name: "lastModifiedDate",
            model: "DateTime"
        },
        {
            name: "album",
            model: "Album"
        },
        {
            name: "program",
            model: "Program"
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

    static hasMany = [
        {
            name: "references",
            model: "ProgramReference"
        }
    ];
}
