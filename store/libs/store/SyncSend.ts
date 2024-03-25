import { normalize, arrayOf } from "../normalizr";
// import  fetch from "isomorphic-fetch";
import IDGenerator from "@liquid101/util/IDGenerator";

import { APIConstants } from "../constants/Config";

import SyncAction from "./SyncAction";
import Cookies from "js-cookie";

abstract class SyncSend extends SyncAction {
    //TS
    // abstract deleteState();
    abstract getSchema();
    abstract getCollection(json, playlist?, filter?);
    abstract getDataFromState(state, playlist?, filter?);
    abstract transformResponse(json);
    //TS

    getAccessToken(accessToken) {
        if (!accessToken) accessToken = Cookies.get("accessToken");
        return accessToken;
    }

    getPage(json) {
        if (json.page) {
            return json.page;
        } else if (json.pageable) {
            return {
                size: json.pageable.pageSize,
                number: json.pageable.pageNumber
            };
        }
    }

    // THUNK
    fetchDataIfNeeded = (playlist, filter, context?) => async (
        dispatch,
        getState
    ) => {
        const data = this.getDataFromState(getState(), playlist, filter);

        if (this.shouldFetchData(data, playlist, filter, context)) {
            const nextUrl = this.getProxy().getNextUrl(data, playlist, filter);
            if (nextUrl) {
                return dispatch(this.fetchData(nextUrl, playlist, filter));
            }
        }
        return;
    };

    // Thunk
    fetchDataForcedUser = (playlist, filter) => async (dispatch, getState) => {
        const data = this.getDataFromState(getState(), playlist, filter);
        const nextUrl = this.getProxy().getNextUrl(data, playlist, filter);
        if (nextUrl) {
            return dispatch(this.fetchData(nextUrl, playlist, filter));
        }
        return;
    };
    // Thunk
    deleteData2 = playlist => async dispatch => {
        dispatch(this.doDeleteData3("ALBUMRATINGS", playlist));
    };
    // Thunk
    fetchData = (url, playlist, filter) => async dispatch => {
        // eslint-disable-next-line
        const me = this;

        const accessToken = Cookies.get("accessToken");
        const headers = new Headers();
        if (accessToken)
            headers.append("Authorization", "Bearer " + accessToken);

        dispatch(me.doRequestData(playlist, filter));
        return fetch(url, {
            mode: "cors",
            credentials: "include",
            headers
        })
            .then(response => response.json())
            .then(tjson => me.transformResponse(tjson))
            .then(json => {
                const collection = me.getCollection(json, playlist, filter);
                if (!collection) {
                    console.log(
                        "DEV: failed to collect the API response -   check the return format or override the getCollection Method"
                    );
                    // possibly no data // notification;
                    dispatch(
                        me.doReceiveData(
                            null,
                            null,
                            playlist,
                            filter,
                            this.getPage(json)
                        )
                    );
                    return json;
                }

                // Putting ID if absent
                collection.map((item, index) => {
                    if (item.user == null) item.user = {};
                    if (item.id == null) {
                        item.id = IDGenerator.missing.next().value;
                        const page = this.getPage(json);
                        if (page) {
                            const max = Math.min(
                                (page.number + 1) * page.size,
                                page.totalElements
                            );
                            item.id = max - index;
                        }
                        if (filter && filter.for && filter.for.id)
                            item.id = filter.for.id;
                        console.log(
                            "DEV :Id need to be present from the server. Add it in RestConfigurationAdapter.java"
                        );
                    }
                });

                const normalized = normalize(
                    collection,
                    arrayOf(me.getSchema())
                );

                const entityIds = normalized.result.reduce((arr, id) => {
                    if (arr.indexOf(id) === -1) {
                        arr.push(id);
                    }
                    return arr;
                }, []);

                dispatch(
                    me.doReceiveData(
                        normalized.entities,
                        entityIds,
                        playlist,
                        filter,
                        this.getPage(json)
                    )
                );
            })
            .catch(error => {
                throw error;
            });
    };

    patch(playlist, filter, item) {
        if (!item.id) {
            console.log("Error: No ID to patch");
            return;
        }
        return this.doPatchData(playlist, filter, item);
    }

    addNew(playlist, filter, item) {
        const type = this.getProxy().getEntityName();
        return this.addDataItem(playlist, filter, item, type);
    }

    addDataItem(playlist: any, filter: any, item: any, type: any) {
        if (!item || !item.id) {
            item.phantom = true;
            if (IDGenerator[type]) item.id = IDGenerator[type].next().value;
        }
        // eslint-disable-next-line
        const me = this;

        const collection : any[]= [];
        collection.push(item);

        const normalized = normalize(collection, arrayOf(me.getSchema()));
        const entityIds = normalized.result.reduce((arr, id) => {
            if (arr.indexOf(id) === -1) {
                arr.push(id);
            }
            return arr;
        }, []);
        return this.doReceiveData(
            normalized.entities,
            entityIds,
            playlist,
            filter
        );
    }

    deleteOne(playlist, filter, item) {
        const entityIds: any[] = [];
        item.markedForDelete = true;
        entityIds.push(item.id);
        return this.doDeleteData(entityIds, playlist);
    }

    shouldFetchData(data, playlist, filter, context?) {
        if (data == null) return true;
        if (playlist == null) {
            const src =
                data[
                    this.getProxy()
                        .getSchema()
                        .getKey()
                ];
            if (src && (src.items.length > 0 || src.isFetching)) {
                console.log("No fetch needed as fetching or present");
                return false;
            }
        } else {
            const active = data[playlist];
            if (active && !active.page) {
                console.log("No fetch needed as no pagination 1");
                return false;
            }
            // ratings if load and no paginatino then return from 1st page.
            if (
                context &&
                context.pagination === false &&
                active &&
                active.page &&
                active.page.number === 0
            ) {
                return false;
            }
            if (active && active.isFetching) {
                console.log("No fetch needed as fetching " + playlist);
                return false;
            }
            if (
                active &&
                active.page &&
                active.page.number + 1 == active.page.totalPages
            ) {
                console.log("No fetch needed as as last page ");
                return false;
            }
            if (active && active.page.totalElements === 0) {
                console.log("No fetch needed as no elements ");
                return false;
            }
        }

        return true;
    }

    // Thunk
    // Returns async
    replaceIdStore = (uuid, id, playlist) => async (dispatch, getState) => {
        const entity = this.getProxy().getEntitiesName();
        const { entities } = getState();
        const object = entities[entity][uuid];
        entities[entity][id] = object;
        object.id = id;
        delete object.phantom;
        delete entities[entity][uuid];
        dispatch(this.doReplaceId(uuid, id, playlist));
    };

    /* HAL Conversion - Make id to hal for server - TODO Generalize*/
    static convertLinkToHAL(entity) {
        if (!entity.constructor.hasOne) {
            console.log(
                "DEV: use Store.create . No Rlations  . Cant convet to HAL"
            );
            return;
        }
        // hasOne
        for (const link of entity.constructor.hasOne) {
            if (link) {
                const pLink = entity[link.name];
                let pLinkName = null;
                if (pLink != null) {
                    if (
                        pLink != null &&
                        pLink.constructor &&
                        pLink.constructor.schema
                    ) {
                        pLinkName = pLink.constructor.schema.getKey();
                        const linkEntity = entity[link.name];
                        // if an existing entity
                        if (linkEntity.id && !linkEntity.phantom) {
                            entity[
                                link.name
                            ] = `${APIConstants.API_BASE_URL}/${pLinkName}/${linkEntity.id}`; // set uri
                        }
                        // if  no id or phantom
                        else {
                            delete linkEntity.id; // need to remove phantom ids
                            // entity[link.name] = linkEntity;
                            delete entity[link.name]; // delete empty objects for ex upload affiliation type was being send as {} causing server side problems
                            console.log(
                                "DEV: No id for hal conversion. possible that trying to sync item that is not in permission, Fix server Side"
                            );
                        }
                    } else {
                        console.log("DEV: No schema for hal conversion.");
                    }
                }
            }
        }
        // hasMany
        if (entity.constructor.hasMany) {
            for (const link of entity.constructor.hasMany) {
                if (link) {
                    const pLinkArray = entity[link.name];
                    let pLinkName = null;
                    console.log(pLinkArray);
                    if (!pLinkArray) return entity;

                    entity[link.name] = [];

                    pLinkArray.forEach(pLink => {
                        if (
                            pLink != null &&
                            pLink.constructor &&
                            pLink.constructor.schema
                        ) {
                            pLinkName = pLink.constructor.schema.getKey();

                            if (pLink.id && !pLink.phantom) {
                                entity[link.name].push(
                                    `${APIConstants.API_BASE_URL}/${pLinkName}/${pLink.id}`
                                );
                            } // set uri
                            else {
                                delete pLink.id; // need to remove phantom ids

                                entity[link.name].push(pLink);
                            }
                        } else {
                            // IDObject ex : publish image.album
                            entity[link.name].push(pLink);

                            console.log(
                                "DEV: no schema convertion to hal failed. Make sure array is not just object but of proper class, use new or Store.create not {}"
                            );
                        }
                    });
                }
            }
        }
        return entity;
    }

    // Thunk Returns Promise
    syncNew = (accessToken, playlist, id, filter, item) => async dispatch => {
        const headers = new Headers();
        headers.append(
            "Accept",
            "application/json, text/javascript, */*; q=0.01"
        );
        headers.append("Content-Type", "application/json"); // required

        accessToken = this.getAccessToken(accessToken);
        if (accessToken)
            headers.append("Authorization", "Bearer " + accessToken);

        let method = "post";
        let objectid = null;

        if (item.id && !item.phantom) {
            method = "PATCH";
            objectid = item.id;
            delete item.version;
        }
        if (item.method) {
            method = item.method;
        }

        let url = this.getProxy().addUrl(objectid, filter);
        if (filter.url) url = filter.url;

        let body : string = "";
        if (item.body) {
            body = item.body;
        } else {
            let clone = new item.constructor();
            clone = (<any>Object).assign(clone, item);
            if (Array.isArray(clone)) {
                clone.forEach(item => {
                    this.constructor["convertLinkToHAL"](item);
                });
            } else {
                this.constructor["convertLinkToHAL"](clone);
            }

            body = JSON.stringify(clone);
        }
        let response;
        try {
            response = await fetch(url, {
                method,
                headers,
                body,
                credentials: "include"
            });
        } catch (args: any) {
            let json = null;
            if (args.json) json = await args.json();
            dispatch(this.doReceiveError({ args, body: json }));
            return;
        }
        if (response.status > 299) {
            throw response;
        }
        const serverItem = await response.json();
        if (serverItem.id) {
            item.id = serverItem.id;
        }
        if (item.coverId) {
            item.cover = item.coverId;
            delete item.coverId;
        }
        if (!playlist) {
            playlist = filter.playlist;
        }
        if (filter.storeSync != false) {
            if (method == "PATCH") {
                dispatch(this.patch(playlist, filter, item));
            } else {
                dispatch(this.addNew(playlist, filter, item));
            }
        }
        return;
    };
    // Thunk Returns Promise
    syncDelete = (
        accessToken,
        playlist,
        id,
        filter,
        item
    ) => async dispatch => {
        const headers = new Headers();
        headers.append(
            "Accept",
            "application/json, text/javascript, */*; q=0.01"
        );
        accessToken = this.getAccessToken(accessToken);
        if (accessToken)
            headers.append("Authorization", "Bearer " + accessToken);

        if (!item.id) return;

        const url = this.getProxy().addUrl(item.id);
        let response;
        try {
            response = await fetch(url, {
                method: "delete",
                headers,
                credentials: "include"
            });
        } catch (err: any) {
            let json = null;
            if (err.json) {
                json = await err.json();
            }
            dispatch(this.doReceiveError({ err, body: json }));
            return;
        }
        if (response?.status > 299) {
            throw response;
        }
        let serverItem = null;
        if (response.bodyUsed) {
            serverItem = await response.json();
        }
        dispatch(this.deleteOne(playlist, filter, item));
        return serverItem;
    };

    // Thunk
    toggleAction = (context, post) => async (dispatch, getState) => {
        const action = {
            toggle: null,
            collection: context.collection,
            id: post.id
        };

        if (post[context.field]) {
            (<any>Object).assign(action, {
                action: context.off,
                toggle: false
            });
        } else {
            (<any>Object).assign(action, { action: context.on, toggle: true });
        }
        const { authed } = getState();

        return dispatch(
            this.syncAction(
                authed.accessToken,
                null,
                post.id,
                action,
                action.toggle,
                null
            )
        );
    };

    // Thunk
    syncAction = (
        accessToken,
        playlist,
        id,
        filter,
        toggle,
        item
    ) => async dispatch => {
        const headers = new Headers();
        headers.append(
            "Accept",
            "application/json, text/javascript, */*; q=0.01"
        );
        headers.append("Content-Type", "application/json"); // required
        accessToken = this.getAccessToken(accessToken);
        if (accessToken)
            headers.append("Authorization", "Bearer " + accessToken);

        const method = "post";

        const url = this.getProxy().url(id, filter);

        let body;
        if (item && item.body) body = item.body;
        else body = JSON.stringify(item);
        let response;
        try {
            response = await fetch(url, {
                method,
                headers,
                body,
                credentials: "include"
            });
        } catch (err: any) {
            let json = null;
            if (err.json) {
                json = await err.json();
            }
            dispatch(this.doReceiveError({ err, body: json }));
            throw { err, body: json };
        }

        if (response.status > 299) {
            throw response;
        }
        let serverItem = null;
        if (response.bodyUsed) {
            serverItem = await response.json();
        }
        dispatch(this.doSetActed(item, filter, toggle));

        return serverItem;
    };

    fetchDataIfNeededPlain = async (playlist, filter, context?) => {
            const nextUrl = this.getProxy().getNextUrl(null, playlist, filter);
            if (nextUrl) {
                return this.fetchDataPlain(nextUrl, playlist, filter);
            }
        return;
    };
    fetchDataPlain = async (url, playlist, filter) =>  {
        // eslint-disable-next-line
        const me = this;

        const accessToken = Cookies.get("accessToken");
        const headers = new Headers();
        if (accessToken)
            headers.append("Authorization", "Bearer " + accessToken);

        me.doRequestData(playlist, filter);
        return fetch(url, {
            mode: "cors",
            credentials: "include",
            headers
        })
            .then(response => response.json())
            .then(tjson => me.transformResponse(tjson))
            .then(json => {
                const collection = me.getCollection(json, playlist, filter);
                if (!collection) {
                    console.log(
                        "DEV: failed to collect the API response -   check the return format or override the getCollection Method"
                    );
                    // possibly no data // notification;
                         me.doReceiveData(
                            null,
                            null,
                            playlist,
                            filter,
                            this.getPage(json)
                        )
                
                    return json;
                }

                // Putting ID if absent
                collection.map((item, index) => {
                    if (item.user == null) item.user = {};
                    if (item.id == null) {
                        item.id = IDGenerator.missing.next().value;
                        const page = this.getPage(json);
                        if (page) {
                            const max = Math.min(
                                (page.number + 1) * page.size,
                                page.totalElements
                            );
                            item.id = max - index;
                        }
                        if (filter && filter.for && filter.for.id)
                            item.id = filter.for.id;
                        console.log(
                            "DEV :Id need to be present from the server. Add it in RestConfigurationAdapter.java"
                        );
                    }
                });

                const normalized = normalize(
                    collection,
                    arrayOf(me.getSchema())
                );

                const entityIds = normalized.result.reduce((arr, id) => {
                    if (arr.indexOf(id) === -1) {
                        arr.push(id);
                    }
                    return arr;
                }, []);

                    return me.doReceiveData(
                        normalized.entities,
                        entityIds,
                        playlist,
                        filter,
                        this.getPage(json)
                    )
            ;
            })
            .catch(error => {
                throw error;
            });
    }
}
export default SyncSend;
