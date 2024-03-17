/**
 * Created by ssaboo on 5/13/16.
 */
import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { Schema } from "@/liquid-store/normalizr";

class Wizard extends Store {
    save(type, playlist, object) {
        return {
            type: "SAVE_WIZARD",
            entity: type,
            playlist,
            entities: { [playlist]: object }
        };
    }
}

Wizard.proxy = new Proxy({ name: "wizard", schema: new Schema("wizard") });

export default new Wizard();
