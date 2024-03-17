import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class UserFriends extends Model {
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
            name: "pk",
            type: "string",
            format: ""
        }
    ];

    static hasOne = [
        {
            name: "createdBy",
            model: "IUser"
        },
        {
            name: "pk",
            model: "UserFriendsPK"
        }
    ];
}
