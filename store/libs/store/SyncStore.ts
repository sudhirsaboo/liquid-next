import { APIConstants } from "../constants/Config";

import SyncSend from "./SyncSend";
import Cookies from "js-cookie";

class SyncStore extends SyncSend {
    model: any;
    static proxy: any;

    constructor() {
        super();
    }

    getProxy() {
        return this.constructor["proxy"];
    }

    create(...args) {
        const proxy = this.getProxy();
        const schema = proxy.getSchema();
        const model = schema.model;
        if (!model) {
            console.log("DEV: no model check schema");
            return null;
        }
        return new model(...args);
    }
    createFromArray(array) {
        return array.map(item => {
            return this.create(item);
        });
    }

    getName() {
        return this.constructor["proxy"].getEntityName();
    }

    load(playlist?, filter?, context?) {
        const myfilter = (<any>Object).assign({}, filter);
        return this.fetchDataIfNeeded(playlist, myfilter, context);
    }
    async loadPlain(playlist?, filter?, context?) {
        const myfilter = (<any>Object).assign({}, filter);
        return this.fetchDataIfNeededPlain(playlist, myfilter, context);
    }

    search(playlist, filter) {
        const myfilter = (<any>Object).assign({}, filter);
        myfilter.parent = null;
        myfilter.action = "search";
        // Router-V6 Check mark - Potentaily Broken 
        myfilter.user = filter.query.id;

        return this.fetchDataIfNeeded(playlist, myfilter);
    }

    next(playlist, filter) {
        const myfilter = (<any>Object).assign({}, filter);
        return this.fetchDataIfNeeded(playlist, myfilter);
    }

    removeOne = (context, object) => async (dispatch, getState) => {
        const { authed } = getState();

        let playlist = null;
        if (context && context.playlist) {
            playlist = context.playlist;
        } else {
            const { id } = authed.user;
            console.log(
                "DEV: please set playlist in context - defaulting to users/{id}"
            );
            context.playlist = `/users/${id}`;
        }

        const filter = {};
        let accessToken = authed.accessToken;
        if (!accessToken) {
            accessToken = Cookies.get("accessToken");
        }
        return dispatch(
            this.syncDelete(accessToken, playlist, object.id, filter, object)
        );
    };

    removeOneMem(context, object) {
        return dispatch => {
            dispatch(this.deleteOne(context.playlist, context.filter, object));
        };
    }

    edit() {
        return;
    }
    update(context, object) {
        return this.insert(context, object);
    }

    fillPlaylist(context, authed) {
        /// let playlist = null;
        if (context && context.playlist) {
            // playlist = context.playlist;
        } else {
            console.log(
                "DEV: please set playlist in context - defaulting to users/{id}"
            );
            context.playlist = `/users/${authed.user.id}`;
        }
        return;
    }
    // - needed for overrides
    // eslint-disable-next-line
    insert = (context, object, filter?) => async (dispatch, getState) => {
        const { authed } = getState();
        const { id } = authed.user;
        let playlist = null;
        if (context && context.playlist) {
            playlist = context.playlist;
        } else {
            console.log(
                "DEV: please set playlist in context - defaulting to users/{id}"
            );
            context.playlist = `/users/${id}`;
        }

        if (context && context.for && context.for.action)
            playlist = context.for.action;

        if (object.form) object = object.form;
        object.user = id;
        let accessToken = authed.accessToken;
        if (!accessToken) {
            accessToken = Cookies.get("accessToken");
        }
        return dispatch(
            this.syncNew(accessToken, playlist, null, context, object)
        );
    };

    insertMem = (context, item) => async dispatch => {
        const playlist = context.playlist;
        const filter = context.filter;

        let action;
        if (item.id) {
            action = this.patch(playlist, filter, item);
            dispatch(action);
            Promise.resolve(action);
        } else {
            action = this.addNew(playlist, filter, item);
            const id = action.entityIds[0];
            const object = action.entities.references[id];
            context?.addToList.push(object);
            dispatch(action);
            Promise.resolve(action);
        }
    };

    static getServerUrl() {
        return APIConstants.API_BASE_URL;
    }

    getSchema() {
        return this.getProxy().getSchema();
    }

    getDataFromState(state) {
        const schema = this.getSchema();
        if (!schema.getKey) {
            console.log(
                "Sync Store error: no schema, check Actions Proxy Schema Definition (ex actions/Program js"
            );
            return null;
        }
        return state[schema.getKey()];
    }

    getActionAppender() {
        if (this.getProxy && this.getProxy().getActionAppender) {
            return this.getProxy().getActionAppender();
        } else if (this.getProxy) {
            return this.getProxy().getName();
        }
    }

    getCollection(json) {
        if (this.getProxy && this.getProxy().getCollection) {
            return this.getProxy().getCollection(json, this.model);
        }
    }

    transformResponse(json) {
        return json;
    }
}
export default SyncStore;
