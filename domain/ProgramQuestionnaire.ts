import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema } from "./schema/ProgramQuestionnaire";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

class programquestionnaires extends Store {}

programquestionnaires.proxy = new Proxy({
    name: "programquestionnaire",
    schema: schema
});

export default new programquestionnaires();
