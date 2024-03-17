/**
 * Created by ssaboo on 4/28/16.
 */
/**
 * Created by ssaboo on 4/1/16.
 */
import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema as programs } from "./schema/Program";

class Programs extends Store {}

Programs.proxy = new Proxy({ name: "program", schema: programs });

export default new Programs();
