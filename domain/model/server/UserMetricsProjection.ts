import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class UserMetricsProjection extends Model {
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
            name: "followedByMe",
            type: "boolean",
            format: ""
        },
        {
            name: "displayName",
            type: "string",
            format: ""
        },
        {
            name: "followers_count",
            type: "integer",
            format: "int64"
        },
        {
            name: "name",
            type: "string",
            format: ""
        },
        {
            name: "viewsCount",
            type: "integer",
            format: "int64"
        },
        {
            name: "description",
            type: "string",
            format: ""
        },
        {
            name: "avatar",
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
            name: "cover",
            model: "UploadProjection"
        },
        {
            name: "avatar",
            model: "Upload"
        }
    ];
}
