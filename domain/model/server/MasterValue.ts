import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class MasterValue extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "parentTypeID",
            type: "string",
            format: ""
        },
        {
            name: "startAtPrice",
            type: "string",
            format: ""
        },
        {
            name: "grandParentTypeID",
            type: "string",
            format: ""
        },
        {
            name: "description",
            type: "string",
            format: ""
        },
        {
            name: "typeID",
            type: "string",
            format: ""
        },
        {
            name: "parentValue",
            type: "string",
            format: ""
        },
        {
            name: "value",
            type: "string",
            format: ""
        },
        {
            name: "grandParentValue",
            type: "string",
            format: ""
        }
    ];

    static hasMany = [
        {
            name: "values",
            model: "NamedObject"
        }
    ];
}
