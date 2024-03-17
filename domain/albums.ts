import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { APIConstants } from "@/liquid-store/constants/Config";
import { schema as albums } from "./schema/Portfolio";

class Albums extends Store {
    byImage = id => async dispatch => {
        const playlist = `/image|${id}`;
        const filter = { parent: `image/${id}` };
        return dispatch(this.fetchDataIfNeeded(playlist, filter));
    };

    byUser = (userid = null) => async (dispatch, getState) => {
        const { authed } = getState();
        if (authed && !userid) {

            const { id } = authed.user;
            console.log("Fetching albums for user " + id)
            const playlist = `/users/${id}`;
            const filter = { parent: `users/${id}` };
            dispatch(this.fetchDataIfNeeded(playlist, filter));
        }
        else{
            console.log("Fetching albums for user " + userid)
            const playlist = `/users/${userid}`;
            const filter = { parent: `users/${userid}` };
            dispatch(this.fetchDataIfNeeded(playlist, filter));
         
        }
    };

    publish = request => async (dispatch, getState) => {
        request.phantom = true;
        const { authed } = getState();
        await this.publishSend(dispatch, request, authed);
        dispatch(this.doPublishEntity(request.id));
    };

    publishSend(dispatch, request, authed) {
        const headers = new Headers();
        headers.append(
            "Accept",
            "application/json, text/javascript, *!/!*; q=0.01"
        );
        headers.append("Content-Type", "application/json");

        const context = {
            url: `${url}/service/albums/${request.id}/publish`,
            storeSync: false,
            playlist: null
        };

        return dispatch(
            this.syncNew(
                authed.accessToken,
                context.playlist,
                null,
                context,
                request
            )
        );
    }
}

const url = APIConstants.API_ROOT_URL;

Albums.proxy = new Proxy({
    name: "portfolio",
    schema: albums,
    Paths: {
        load: "/service",
        insert: "/service",
        delete: "/api",
        edit: "/api"
    }
});

export default new Albums();
