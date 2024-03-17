import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class AlbumProjection extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "cover",
            type: "string",
            format: ""
        },
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
            name: "user",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "cover",
            model: "UploadProjection"
        },
        {
            name: "user",
            model: "UserProjection"
        }
    ];
}
