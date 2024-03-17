import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema } from "./schema/Organization";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

class organizations extends Store {
    getFeatured(type) {
        const playlist = `featured/${type}`;
        const filter = { object: "organizations", action: "featured", type };
        return this.fetchDataIfNeeded(playlist, filter);
    }
}

organizations.proxy = new Proxy({ name: "organization", schema });

export default new organizations();
