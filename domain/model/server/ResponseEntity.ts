import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class ResponseEntity extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "body",
            type: "string",
            format: ""
        },
        {
            name: "statusCode",
            type: "string",
            format: ""
        }
    ];
}
