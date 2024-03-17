import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Image extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "albumName",
            type: "string",
            format: ""
        },
        {
            name: "salesCount",
            type: "integer",
            format: "int64"
        },
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
            name: "publishDate",
            type: "date",
            format: "DateTime"
        },
        {
            name: "rating",
            type: "integer",
            format: "int64"
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
            name: "privacy",
            type: "boolean",
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
            name: "forSaleDate",
            type: "date",
            format: "DateTime"
        },
        {
            name: "licenceType",
            type: "string",
            format: ""
        },
        {
            name: "ratingsCount",
            type: "integer",
            format: "int64"
        },
        {
            name: "id",
            type: "integer",
            format: "int64"
        },
        {
            name: "licenceAdapt",
            type: "boolean",
            format: ""
        },
        {
            name: "likes",
            type: "integer",
            format: "int64"
        },
        {
            name: "accessCount",
            type: "integer",
            format: "int32"
        },
        {
            name: "forSale",
            type: "boolean",
            format: ""
        },
        {
            name: "lastModifiedDate",
            type: "string",
            format: ""
        },
        {
            name: "published",
            type: "integer",
            format: "int32"
        },
        {
            name: "comment_status",
            type: "integer",
            format: "int32"
        },
        {
            name: "licenceShareAlike",
            type: "boolean",
            format: ""
        },
        {
            name: "version",
            type: "integer",
            format: "int64"
        },
        {
            name: "createdDate",
            type: "string",
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
        },
        {
            name: "status",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "cover",
            model: "Upload"
        },
        {
            name: "affiliationLevel",
            model: "Type"
        },
        {
            name: "lastModifiedDate",
            model: "DateTime"
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
            name: "affiliationType",
            model: "Type"
        },
        {
            name: "category",
            model: "Category"
        },
        {
            name: "user",
            model: "User"
        }
    ];

    static hasMany = [
        {
            name: "albums",
            model: "IDObject"
        },
        {
            name: "ratings",
            model: "ImageRating"
        },
        {
            name: "likers",
            model: "ImageLiker"
        },
        {
            name: "comments",
            model: "ImageComment"
        },
        {
            name: "tags",
            model: ""
        },
        {
            name: "viewers",
            model: ""
        },
        {
            name: "itemLicense",
            model: "ItemLicense"
        }
    ];
}
