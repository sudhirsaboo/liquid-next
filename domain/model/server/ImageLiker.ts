import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class ImageLiker extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "createdDate",
            type: "date",
            format: "DateTime"
        },
        {
            name: "pk",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "pk",
            model: "ImageUserPK"
        }
    ];
}
