import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema } from "./schema/ProgramSubmission";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

class programsubmissions extends Store {}

programsubmissions.proxy = new Proxy({ name: "programsubmission", schema });

export default new programsubmissions();
