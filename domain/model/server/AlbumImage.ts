import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class AlbumImage extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "createdBy",
            type: "string",
            format: ""
        },
        {
            name: "organization",
            type: "string",
            format: ""
        },
        {
            name: "id",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "createdBy",
            model: "User"
        },
        {
            name: "organization",
            model: "Organization"
        }
    ];
}
