import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class IDObject extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "id",
            type: "integer",
            format: "int64"
        }
    ];
}
