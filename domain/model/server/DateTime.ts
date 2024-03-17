import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class DateTime extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "beforeNow",
            type: "boolean",
            format: ""
        },
        {
            name: "equalNow",
            type: "boolean",
            format: ""
        },
        {
            name: "chronology",
            type: "string",
            format: ""
        },
        {
            name: "millis",
            type: "integer",
            format: "int64"
        },
        {
            name: "afterNow",
            type: "boolean",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "chronology",
            model: "Chronology"
        }
    ];
}
