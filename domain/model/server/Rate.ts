import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Rate extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "feedback",
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
            type: "integer",
            format: "int64"
        }
    ];

    static hasOne = [
        {
            name: "feedback",
            model: "Feedback"
        },
        {
            name: "rating",
            model: "Rating"
        }
    ];
}
