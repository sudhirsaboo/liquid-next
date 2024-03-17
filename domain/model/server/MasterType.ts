import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class MasterType extends Model {
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
            name: "description",
            type: "string",
            format: ""
        },
        {
            name: "typeID",
            type: "string",
            format: ""
        }
    ];
}
