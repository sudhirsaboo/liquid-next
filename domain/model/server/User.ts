import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class User extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "friends_count",
            type: "integer",
            format: "int64"
        },
        {
            name: "lastName",
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
            name: "enabled",
            type: "boolean",
            format: ""
        },
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
            name: "uploadLimitExpiry",
            type: "date",
            format: "DateTime"
        },
        {
            name: "uploadLimit",
            type: "integer",
            format: "int32"
        },
        {
            name: "contact",
            type: "string",
            format: ""
        },
        {
            name: "loginName",
            type: "string",
            format: ""
        },
        {
            name: "id",
            type: "integer",
            format: "int64"
        },
        {
            name: "email",
            type: "string",
            format: ""
        },
        {
            name: "accountNonLocked",
            type: "boolean",
            format: ""
        },
        {
            name: "credentialsNonExpired",
            type: "boolean",
            format: ""
        },
        {
            name: "viewsCount",
            type: "integer",
            format: "int64"
        },
        {
            name: "avatar",
            type: "string",
            format: ""
        },
        {
            name: "version",
            type: "integer",
            format: "int64"
        },
        {
            name: "authorities",
            type: "string",
            format: ""
        },
        {
            name: "invitePending",
            type: "boolean",
            format: ""
        },
        {
            name: "firstName",
            type: "string",
            format: ""
        },
        {
            name: "inviteAccepted",
            type: "boolean",
            format: ""
        },
        {
            name: "createdBy",
            type: "string",
            format: ""
        },
        {
            name: "upgradeExpiry",
            type: "date",
            format: "DateTime"
        },
        {
            name: "followers_count",
            type: "integer",
            format: "int64"
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
            name: "passwordExpiryDate",
            type: "date",
            format: "DateTime"
        },
        {
            name: "upgradeType",
            type: "integer",
            format: "int32"
        },
        {
            name: "art_count",
            type: "integer",
            format: "int64"
        },
        {
            name: "accountNonExpired",
            type: "boolean",
            format: ""
        },
        {
            name: "status",
            type: "string",
            format: ""
        },
        {
            name: "username",
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
            name: "contact",
            model: "Contact"
        },
        {
            name: "avatar",
            model: "Upload"
        },
        {
            name: "authorities",
            model: "Collection«GrantedAuthority»"
        },
        {
            name: "createdBy",
            model: "User"
        },
        {
            name: "organization",
            model: "Organization"
        }
    ];

    static hasMany = [
        {
            name: "roles",
            model: "Role"
        },
        {
            name: "friends",
            model: "UserFriends"
        },
        {
            name: "followers",
            model: "UserFriends"
        }
    ];
}
