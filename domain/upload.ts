/**
 * Created by ssaboo on 4/1/16.
 */
import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema as UploadSchema } from "./schema/Upload";

import axios from "axios";
class Uploads extends Store {
    // Thunk
    upload = (type, files, view, store?, callback?) => async (
        dispatch,
        getState
    ) => {
        if (!store ) store = this;

        const { authed } = getState();
        const { user } = authed;
        const playlist = `/users/${user.id}/art`;

        const uploads : any[] = [];
        if (!type) type = "UNKNOWN";

        if (files && files.length) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const post = new UploadSchema.model({
                    phantom: true,
                    progress: 0,
                    file
                });

                uploads.push(post);

                const config = {
                    onUploadProgress: function(evt) {
                        post.progress = (evt.loaded / evt.total) * 100;
                        view.forceUpdate();
                    }
                };
                const data = new FormData();
                data.append("file", file);
                data.append("TYPE", type);
                axios
                    .post(store.getProxy().getUploadUrl(), data, config)
                    .then(function(response) {
                        const json: any = response.data;
                        post.id = json.id;
                        delete post.phantom;
                        post.cover = json.cover;

                        if (callback) callback();
                        if (view.selectOneDo) view.selectOneDo(post);

                        dispatch(store.addNew(playlist, null, post));
                    })
                    .catch(function() {
                        post.error = "failed";
                        post.type = "danger";
                        view.forceUpdate();
                    });
            }
        }
        return uploads;
    };
}
Uploads.proxy = new Proxy({ name: "upload", schema: UploadSchema });

export default new Uploads();
