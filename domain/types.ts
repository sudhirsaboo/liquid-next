import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema } from "./schema/Type";

class Types extends Store {
    load(playlist, filter) {
        filter.action = "search";
        return this.fetchDataIfNeeded(playlist, filter);
    }
}

Types.proxy = new Proxy({ name: "type", schema });

export default new Types();
