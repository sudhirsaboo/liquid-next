import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema as ratings } from "./schema/AlbumRating";

class Ratings extends Store {
    getCollection(json) {
        return json.content;
    }
}

Ratings.proxy = new Proxy({
    name: "rating",
    schema: ratings,
    Paths: {
        load: "/service",
        insert: "/service",
        delete: "/service",
        edit: "/service"
    }
});
export default new Ratings();
