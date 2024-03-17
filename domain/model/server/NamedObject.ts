import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class NamedObject extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "startAtPrice",
            type: "string",
            format: ""
        },
        {
            name: "name",
            type: "string",
            format: ""
        },
        {
            name: "description",
            type: "string",
            format: ""
        },
        {
            name: "value",
            type: "string",
            format: ""
        }
    ];
}
