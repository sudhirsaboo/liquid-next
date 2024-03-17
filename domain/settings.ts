/**
 * Created by ssaboo on 4/12/16.
 */
import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";

import { settings } from "./schema/User";

class Settings extends Store {}

Settings.proxy = new Proxy({ name: "settings", schema: settings });

export default new Settings();
