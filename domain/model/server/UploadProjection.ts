import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class UploadProjection extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "displayName",
            type: "string",
            format: ""
        },
        {
            name: "name",
            type: "string",
            format: ""
        },
        {
            name: "id",
            type: "string",
            format: ""
        },
        {
            name: "url",
            type: "string",
            format: ""
        }
    ];
}
