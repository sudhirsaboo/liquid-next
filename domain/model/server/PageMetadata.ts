import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class PageMetadata extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "number",
            type: "integer",
            format: "int64"
        },
        {
            name: "size",
            type: "integer",
            format: "int64"
        },
        {
            name: "totalPages",
            type: "integer",
            format: "int64"
        },
        {
            name: "totalElements",
            type: "integer",
            format: "int64"
        }
    ];
}
