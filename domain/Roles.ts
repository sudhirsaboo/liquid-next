import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema } from "./schema/Role";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

class roles extends Store {
    constructor() {
        super();
    }
}

roles.proxy = new Proxy({ name: "role", schema });

export default new roles();
