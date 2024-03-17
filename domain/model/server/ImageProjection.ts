import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class ImageProjection extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "year",
            type: "string",
            format: ""
        },
        {
            name: "displayName",
            type: "string",
            format: ""
        },
        {
            name: "caption",
            type: "string",
            format: ""
        },
        {
            name: "description",
            type: "string",
            format: ""
        },
        {
            name: "medium",
            type: "string",
            format: ""
        },
        {
            name: "liked",
            type: "boolean",
            format: ""
        },
        {
            name: "cover",
            type: "string",
            format: ""
        },
        {
            name: "affiliationLevel",
            type: "string",
            format: ""
        },
        {
            name: "referenceNumber",
            type: "string",
            format: ""
        },
        {
            name: "licenceType",
            type: "string",
            format: ""
        },
        {
            name: "id",
            type: "string",
            format: ""
        },
        {
            name: "licenceAdapt",
            type: "boolean",
            format: ""
        },
        {
            name: "views",
            type: "integer",
            format: "int64"
        },
        {
            name: "likes",
            type: "integer",
            format: "int64"
        },
        {
            name: "licenceShareAlike",
            type: "boolean",
            format: ""
        },
        {
            name: "affiliationName",
            type: "string",
            format: ""
        },
        {
            name: "licenceComUse",
            type: "boolean",
            format: ""
        },
        {
            name: "size",
            type: "string",
            format: ""
        },
        {
            name: "commentsCount",
            type: "integer",
            format: "int64"
        },
        {
            name: "affiliationType",
            type: "string",
            format: ""
        },
        {
            name: "name",
            type: "string",
            format: ""
        },
        {
            name: "category",
            type: "string",
            format: ""
        },
        {
            name: "waterMark",
            type: "boolean",
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
            name: "affiliationLevel",
            model: "ICode"
        },
        {
            name: "affiliationType",
            model: "TypeProjection"
        },
        {
            name: "category",
            model: "CategoryProjection"
        },
        {
            name: "user",
            model: "UserProjection"
        }
    ];

    static hasMany = [
        {
            name: "tags",
            model: ""
        },
        {
            name: "itemLicense",
            model: "ItemLicense"
        }
    ];
}
