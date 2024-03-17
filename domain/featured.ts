import { normalize, arrayOf } from "@/liquid-store/normalizr";
import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { propertySchema } from "./schema/Property";

class FeaturedProperties extends Store {
    getCollection(json) {
        return json.content;
    }

    getDataFromState(state) {
        const prop = state.properties;
        if (prop) {
            return prop.featured;
        }
        return null;
    }

    getFeatured() {
        const playlist = "featured";
        const filter = { action: "featured" };
        return this.fetchDataIfNeeded(playlist, filter);
    }

    // override from SyncSend
    fetchData = (url, playlist, filter) => async dispatch => {
        // eslint-disable-next-line
        const me = this;
        dispatch(me.doRequestData(playlist, filter));
        return fetch(url, {
            mode: "cors",
            credentials: "include"
        })
            .then(response => response.json())
            .then(tjson => me.transformResponse(tjson))
            .then(ojson => {
                const list = [];
                let allEntityIds = [];

                for (const key in ojson) {
                    const json = ojson[key];

                    const featured: any = {};

                    const collection = me.getCollection(json);
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

                    featured.entities = normalized.entities;
                    featured.entityIds = entityIds;
                    featured.playlist = playlist + "|" + key;
                    featured.page = json.page;
                    // featured.filter = json.page;
                    list.push(featured);

                    allEntityIds = allEntityIds.concat(entityIds);
                }

                dispatch(
                    me.doReceiveData(null, allEntityIds, playlist, filter, {
                        number: 0
                    })
                );

                list.forEach(item => {
                    dispatch(
                        me.doReceiveData(
                            item.entities,
                            item.entityIds,
                            item.playlist,
                            item.filter,
                            item.page
                        )
                    );
                });
            })

            .catch(error => {
                throw error;
            });
    };
}

FeaturedProperties.proxy = new Proxy({
    name: "property",
    schema: propertySchema
});
FeaturedProperties.proxy.getEntitiesPath = function() {
    return "art/images";
};

export default new FeaturedProperties();
