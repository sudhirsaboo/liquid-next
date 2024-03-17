import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Link extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "templated",
            type: "boolean",
            format: ""
        },
        {
            name: "rel",
            type: "string",
            format: ""
        },
        {
            name: "href",
            type: "string",
            format: ""
        }
    ];
}
