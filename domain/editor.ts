/**
 * Created by ssaboo on 2/29/16.
 */
import Store from "@/liquid-store/store/SyncStore";
import Proxy from "@/liquid-store/proxy/Proxy";
import  types from "@/liquid-store/constants/ActionTypes";
import { editorSchema } from "./schema/Editor";

class Editor extends Store {
    addItem(id) {
        return (dispatch, getState) => {
            const { entities } = getState();
            return dispatch(
                this.addDataItemOverride("editor", id, entities.properties[id])
            );
        };
    }
    removeItem(id) {
        return (dispatch, getState) => {
            const { entities } = getState();
            return dispatch(
                this.removeDataItem("editor", id, entities.properties[id])
            );
        };
    }

    addDataItemOverride(playlist: any, id: any, entity: any) {
        const entityIds = [];
        entityIds.push(id);

        const entities = { properties: {} };
        entities.properties[id] = entity;
        entities.properties[id].aaaa = "aaaa";

        return {
            type: types.RECEIVE_PROPERTIES,
            playlist,
            entityIds,
            entities
        };
    }

    removeDataItem(playlist, id, entity) {
        const entityIds = [];
        entityIds.push(id);

        const entities = { properties: {} };
        entities.properties[id] = entity;

        return {
            type: "DELETE_ENTITY",
            playlist,
            entityIds,
            entities
        };
    }
}
Editor.proxy = new Proxy({ name: "editor", schema: editorSchema });

export function selectPortfolio(id) {
    return {
        type: types.SELECT_PORTFOLIO_EDITOR,
        id
    };
}
export default new Editor();
