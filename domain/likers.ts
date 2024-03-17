import Store from "@/liquid-store/store/SyncStore";
import Proxy from "@/liquid-store/proxy/Proxy";

import { likerSchema } from "./schema/Liker";

class Likers extends Store {}

Likers.proxy = new Proxy({ name: "liker", schema: likerSchema });

export default new Likers();
