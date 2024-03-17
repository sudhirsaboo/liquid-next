import { APIConstants } from "@/liquid-store/constants/Config";
 
// Put all three here as was giving circular dependency error
// uncaught typeerror: class extends value undefined is not a constructor or null

/**
 * Created by ssaboo on 3/23/16.
 */
export default class Model {
    id: any;
    cover: Upload | number;
    avatar: Upload | number;
    file: any;
    user: any;
    static schema: any;
    displayName: string;
    constructor(object: any) {
        (<any>Object).assign(this, object);
    }

    setCover(cover: any) {
        this.cover = cover;
    }

    /* Helper that depends on props*/
    static getPost(props, entityName) {
        const { filter, entities } = props;
        if (entities[entityName] === null) {
            return null;
        }
        // Router-V6 Check mark - Potentaily Broken 
        const post = entities[entityName][filter.query.id];
        if (post === null) {
            return null;
        }
        return post;
    }

    getOwner(props: any) {
        const { entities } = props;
        let user = {};
        if (entities.users && this.user) {
            user = entities.users[this.user];
        }
        return user;
    }

    getCover(props: any, type: any) {
        if (this.file) {
            return this.file.preview;
        }
        if (this.cover && this.cover instanceof Upload && this.cover.file) {
            return this.cover.file.preview;
        }
        if (this.cover && this.cover instanceof Upload && this.cover.url) {
            return APIConstants.API_ROOT_URL + this.cover.url;
        }
        let cover = null;
        if (props && this.cover && typeof this.cover === "number") {
            const { entities } = props;
            cover = entities.uploads[this.cover];
        } else {
            cover = this.cover;
        }
        if (cover && cover.getUrl) {
            cover = cover.getUrl(type, { id: this.id, type });
        }
        if (cover && cover.includes && cover.includes("http")) {
            return cover;
        } else {
            return APIConstants.API_ROOT_URL + cover;
        }
    }

    getCoverO(props: any) {
        let cover = null;

        // If cover is id, lookup
        if (props && this.cover && typeof this.cover === "number") {
            const { entities } = props;
            cover = entities.uploads[this.cover];
        } else {
            // else cover is object
            cover = this.cover;
        }
        return cover;
    }

    getAvatar(props?: any, type?: any) {
        if (this.file) {
            return this.file.preview;
        }
        if (this.avatar && this.avatar instanceof Upload && this.avatar.url) {
            return APIConstants.API_ROOT_URL + this.avatar.url;
        }
        let avatar = null;
        if (props && this.avatar && typeof this.avatar === "number") {
            const { entities } = props;
            avatar = entities.uploads[this.avatar];
        } else {
            avatar = this.avatar;
        }
        if (avatar && avatar instanceof Object) {
            avatar = new Upload(avatar);
        }
        if (avatar && avatar instanceof Upload) {
            avatar = avatar.getUrl(type);
        }
        if (avatar && avatar.includes("http")) {
            return avatar;
        } else {
            return APIConstants.API_ROOT_URL + avatar;
        }
    }
}
export  class ServerUpload extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "ext",
            type: "string",
            format: ""
        },
        {
            name: "fileName",
            type: "string",
            format: ""
        },
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
            name: "srcPath",
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
            name: "url",
            type: "string",
            format: ""
        },
        {
            name: "path",
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
            name: "contentType",
            type: "string",
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
            name: "user",
            model: "User"
        }
    ];
}

export class Upload  extends ServerUpload {
    url: string;
    video: boolean;
    awsUrl: string;
    ext: string;
    constructor(props: any) {
        super(props);
    }

    getUrl(size = "small") {
        if (this.file) {
            return this.file.preview;
        }
        // AWS URL
        if (this.awsUrl) {
            return this.awsUrl + `/${size}/${this.id}.${this.ext}`;
        }
        // Facebook
        if (this.url && this.url.includes("facebook")) {
            return this.url;
        }
        if (this.url) {
            return this.url + `?test&s=${size}`;
        }
        return `${APIConstants.UPLOAD_URL}/${this.id}?s=${size}`;
    }
}
