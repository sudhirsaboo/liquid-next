import Model from "./server/User";
import { APIConstants } from "@/liquid-store/constants/Config";
export default class User extends Model {
    followedByMe: boolean = false;
    followers_count: number = 0;

    constructor(props) {
        super(props);
    }

    follow(toggle) {
        this.followedByMe = toggle;
        this.followers_count = this.followers_count + (toggle ? 1 : -1);
    }
    unfollow(toggle) {
        this.follow(toggle);
    }

    getAvatar(props, type) {
        const avatar = super.getAvatar(props, type);
        if (!avatar) return "/img/user.jpg";
        return avatar;
    }
    static getAvatarForNav(user) {
        if (user && user.userPic && user.userPic.startsWith("http")) {
            return user.userPic;
        } else if (user && user.userPic) {
            return APIConstants.API_ROOT_URL + user.userPic;
        }
        return "/img/user.jpg";
    }
}
