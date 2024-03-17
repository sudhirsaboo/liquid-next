/**
 * Created by ssaboo on 4/1/16.
 */
import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema as schedules } from "./schema/Schedule";

class Schedules extends Store {
    constructor() {
        super();
    }
}

Schedules.proxy = new Proxy({ name: "schedule", schema: schedules });

export default new Schedules();
