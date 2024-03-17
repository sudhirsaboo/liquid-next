import Store from "@/liquid-store/store/SyncStore";
import Proxy from "@/liquid-store/proxy/Proxy";
import { propertySchema } from "./schema/Property";

import { APIConstants } from "@/liquid-store/constants/Config";

import UploadStore from "./upload";
import axios from "axios";
const url = APIConstants.API_BASE_URL;

class Properties extends Store {
    async view(id) {
        try {
            await axios.post(`${url}/art/${id}/view`);
        } catch (e) {}
    }

    upload(files, view) {
        return UploadStore.upload("ART", files, view, this);
    }

    getName() {
        return "Art";
    }

    getUploadUrl() {
        return APIConstants.UPLOAD_URL;
    }

    toggleLike(post) {
        const context = {
            collection: "properties",
            field: "liked",
            on: "like",
            off: "unlike"
        };
        return this.toggleAction(context, post);
    }
    getFeatured() {
        const playlist = "featured";
        const filter = { by: "featured" };
        return this.fetchDataIfNeeded(playlist, filter);
    }

    publish(request) {
        return (dispatch, getState) => {
            const { authed, edities } = getState();
            const { user } = authed;

            const entity = "properties";

            const entities = { [entity]: {} };

            request.images.forEach(item => {
                // Edit
                if (edities && edities[entity] && edities[entity][item.id]) {
                    entities[entity][item.id] = edities[entity][item.id];
                    Object.assign(entities[entity][item.id], item);
                }
                // Newly Created
                else {
                    const newPost = this.create(item);
                    entities[entity][item.id] = newPost;
                    newPost.user = user.id;
                }
            });

            dispatch(this.doPublishChanges(entities));
            return this.publishSend(dispatch, request, authed);
        };
    }

    publishSend(dispatch, request, authed) {
        const headers = new Headers();
        headers.append(
            "Accept",
            "application/hal+json, text/javascript, *!/!*; q=0.01"
        );
        headers.append("Content-Type", "application/json");

        // No cover is send via publish as send by upload call
        request.images.forEach(post => {
            delete post.cover;

            this.constructor["convertLinkToHAL"](post);
            if (post.category && post.category.id)
                alert("Dev : Category :HAL Conversion failed.");
        });

        const context = {
            url: `${url}/publish`,
            storeSync: false,
            playlist: null
        };
        this.fillPlaylist(context, authed);

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

Properties.proxy = new Proxy({ name: "property", schema: propertySchema });
Properties.proxy.getEntitiesPath = function() {
    return "art/images";
};

Properties.proxy.getUploadUrl = function() {
    return `${url}/art/data`;
};
export default new Properties();
