import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class ActedProjection extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "image",
            type: "string",
            format: ""
        },
        {
            name: "createdDate",
            type: "date",
            format: "DateTime"
        },
        {
            name: "user",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "image",
            model: "ActorProjection"
        },
        {
            name: "user",
            model: "ActorProjection"
        }
    ];
}
