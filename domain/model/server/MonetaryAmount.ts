import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class MonetaryAmount extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "currency",
            type: "string",
            format: ""
        },
        {
            name: "value",
            type: "integer",
            format: "double"
        }
    ];
}
