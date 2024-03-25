import  * as types from "@/liquid-store/constants/ActionTypes";

abstract class Action {
    //TS
    abstract getActionAppender();
    abstract getProxy();
    //TS

    doRequestData(playlist, filter) {
        let type = types["REQUEST_" + this.getActionAppender()];
        if (!type) type = "REQUEST_ENTITY";
        let entity = this.getActionAppender();
        if (!entity && filter && filter.object)
            entity = filter.object.toUpperCase();
        if (!playlist) playlist = this.getPlaylist();
        
        const data =  {
            type,
            entity,
            playlist,
            filter
        };
        console.log(data);
        return data;
    }

    doReceiveData(entities, entityIds, playlist, filter, page?) {
        let type = types["RECEIVE_" + this.getActionAppender()];
        if (!type) type = "RECEIVE_ENTITY";
        let entity = this.getActionAppender();
        if (!entity && filter && filter.object)
            entity = filter.object.toUpperCase();
        if (!playlist) playlist = this.getPlaylist();

        const data =  {
            type,
            entity,
            playlist, // category param
            filter,
            entityIds,
            entities,
            page
        };
        console.log(data);
        return data;
    }

    doPatchData(playlist, filter, item) {
        let type = types["PATCH_" + this.getActionAppender()];
        if (!type) type = "PATCH_ENTITY";
        let entity = this.getActionAppender();
        if (!entity && filter && filter.object)
            entity = filter.object.toUpperCase();
        if (!playlist) playlist = this.getPlaylist();

        return {
            type,
            entity,
            item,
            id: item.id,
            filter,
            playlist // category param
        };
    }

    doReceiveDataItem(entities, entityIds, playlist, filter, page) {
        return {
            type: types["RECEIVE_ITEM_" + this.getActionAppender()],
            playlist, // category param
            filter,
            entityIds,
            entities,
            page
        };
    }

    doReceiveError(error) {
        return {
            type: types.RECEIVE_ERRORS,
            error
        };
    }

    doDeleteData(entityIds, playlist) {
        const entity = this.getActionAppender();
        if (!playlist) playlist = this.getPlaylist();

        return {
            type: "DELETE_ENTITY",
            entity,
            playlist, // category param
            entityIds
        };
    }

    doDeleteData3(entity, playlist) {
        if (!playlist) playlist = this.getPlaylist();

        return {
            type: "DELETE_ENTITY",
            entity,
            playlist // category param
        };
    }

    getPlaylist() {
        return this.getProxy()
            .getSchema()
            .getKey();
    }

    doEditData(filter) {
        let type = types["EDIT_" + this.getActionAppender()];
        if (!type) type = "EDIT_ENTITY";
        let entity = this.getActionAppender();
        if (!entity && filter && filter.object)
            entity = filter.object.toUpperCase();

        return {
            type,
            entity,
            filter
        };
    }

    doReplaceId(uiid, id, playlist) {
        return {
            type: types["REPLACE_ID_" + this.getActionAppender()],
            playlist, // category param
            uiid,
            id
        };
    }

    doPublishChanges(entities) {
        let type = types["PUBLISH_" + this.getActionAppender()];
        if (!type) type = "PUBLISH_ENTITY";
        const entity = this.getActionAppender().toLowerCase();

        return {
            type,
            entity,
            entities
        };
    }
    doPublishEntity(id) {
        let type = types["PUBLISH_" + this.getActionAppender()];
        if (!type) type = "PUBLISH_ENTITY";
        const entity = this.getActionAppender().toLowerCase();

        return {
            type,
            id,
            entity
        };
    }

    doRemoveUnlikedProperties(data) {
        return {
            type: types["REMOVE_UNLIKED_" + this.getActionAppender()],
            data
        };
    }

    doSetActed(item, action, toggle) {
        return {
            type: "SET_ACTED",
            action: action.action,
            collection: action.collection,
            toggle,
            id: action.id
        };
    }
}
export default Action;
