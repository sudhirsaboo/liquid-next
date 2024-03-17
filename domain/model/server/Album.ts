import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Album extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "lastModifiedDate",
            type: "string",
            format: ""
        },
        {
            name: "displayName",
            type: "string",
            format: ""
        },
        {
            name: "description",
            type: "string",
            format: ""
        },
        {
            name: "version",
            type: "integer",
            format: "int64"
        },
        {
            name: "cover",
            type: "string",
            format: ""
        },
        {
            name: "createdDate",
            type: "string",
            format: ""
        },
        {
            name: "ldescription",
            type: "string",
            format: ""
        },
        {
            name: "organization",
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
            type: "integer",
            format: "int64"
        },
        {
            name: "user",
            type: "string",
            format: ""
        },
        {
            name: "status",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "lastModifiedDate",
            model: "DateTime"
        },
        {
            name: "cover",
            model: "Upload"
        },
        {
            name: "createdDate",
            model: "DateTime"
        },
        {
            name: "organization",
            model: "Organization"
        },
        {
            name: "user",
            model: "User"
        }
    ];

    static hasMany = [
        {
            name: "images",
            model: "AlbumImage"
        },
        {
            name: "feedbacks",
            model: "AlbumFeedback"
        },
        {
            name: "ratings",
            model: "AlbumRating"
        }
    ];
}
