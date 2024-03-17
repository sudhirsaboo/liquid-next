import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";

import { schema } from "./schema/User";
import User from "./model/User";

class Users extends Store {
    toggleFollow(post) {
        const context = {
            collection: "metrics",
            field: "followedByMe",
            on: "follow",
            off: "unfollow"
        };
        return this.toggleAction(context, post);
    }

    getFeatured() {
        const playlist = "featured";
        const filter = { object: "art/user", action: "featured" };
        return this.fetchDataIfNeeded(playlist, filter);
    }

    getFriends() {
        return (dispatch, getState) => {
            const { authed } = getState();
            if (authed && authed.user && authed.user.id) {
                const { id } = authed.user;
                const playlist = `users/${id}`;
                const filter = { id, action: "friends" };
                return dispatch(this.fetchDataIfNeeded(playlist, filter));
            }
        };
    }
}

Users.proxy = new Proxy({ name: "user", schema });
Users["model"] = User;

export default new Users();
