import Store from "@/liquid-store/store/SyncStore";
import Proxy from "@/liquid-store/proxy/Proxy";
import { referenceSchema } from "./schema/Reference";

class References extends Store {}

References.proxy = new Proxy({ name: "reference", schema: referenceSchema });

export default new References();
