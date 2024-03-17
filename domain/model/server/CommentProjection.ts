import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class CommentProjection extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "fromUser",
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
            name: "id",
            type: "string",
            format: ""
        },
        {
            name: "text",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "fromUser",
            model: "UserProjection"
        }
    ];
}
