import Store from "@/liquid-store/store/SyncStore";
import Proxy from "@/liquid-store/proxy/Proxy";

import { commentSchema } from "./schema/Comment";

class Comments extends Store {
    insert = (playlist, filter, object) => async (dispatch, getState) => {
        const { authed } = getState();

        object.fromUser = authed.user.id;
        return dispatch(
            this.syncNew(authed.accessToken, playlist, null, filter, object)
        );
    };
}

Comments.proxy = new Proxy({ name: "comment", schema: commentSchema });

export default new Comments();
