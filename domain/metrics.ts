import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";

import { metrics } from "./schema/User";

class Metrics extends Store {}

Metrics.proxy = new Proxy({ name: "metric", schema: metrics });

export default new Metrics();
