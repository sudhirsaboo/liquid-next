/**
 * Created by ssaboo on 4/1/16.
 */
import Store from "@/liquid-store/store/SyncStore";

class Errors extends Store {
    deleteAll() {
        return {
            type: "CLEAR_ERRORS"
        };
    }
}

export default new Errors();
