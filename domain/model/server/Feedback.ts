import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Feedback extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "minus",
            type: "string",
            format: ""
        },
        {
            name: "questions",
            type: "string",
            format: ""
        },
        {
            name: "consider",
            type: "string",
            format: ""
        },
        {
            name: "plus",
            type: "string",
            format: ""
        }
    ];
}
