import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema } from "./schema/Category";

class Categories extends Store {}

Categories.proxy = new Proxy({ name: "category", schema });

export default new Categories();
