import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema } from "./schema/ProgramReference";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

class programreferences extends Store {}

programreferences.proxy = new Proxy({
    name: "programreference",
    schema: schema
});

export default new programreferences();
