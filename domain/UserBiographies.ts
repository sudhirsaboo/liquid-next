import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";

import { userBiographies } from "./schema/User";

class UserBiographies extends Store {}

UserBiographies.proxy = new Proxy({
    name: "userBiographies",
    schema: userBiographies
});

export default new UserBiographies();
/**
 * Created by ssaboo on 4/17/16.
 */
