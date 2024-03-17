import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class ProgramSubmissionProjection extends Model {
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
            name: "name",
            type: "string",
            format: ""
        },
        {
            name: "rating",
            type: "string",
            format: ""
        },
        {
            name: "id",
            type: "string",
            format: ""
        },
        {
            name: "program",
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
            name: "questionnaire",
            model: "ProgramQuestionnaire"
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
            name: "user",
            model: "UserProjection"
        }
    ];

    static hasMany = [
        {
            name: "references",
            model: "ProgramReference"
        }
    ];
}
