import { Schema } from "@/liquid-store/normalizr";
import ProgramQuestionnaire from "../model/ProgramQuestionnaire";
import { schema as Organization } from "./Organization";
import { schema as Program } from "./Program";
import { schema as User } from "./User";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

const _schema = new Schema("programquestionnaires");
_schema.model = ProgramQuestionnaire;
ProgramQuestionnaire.schema = _schema;

_schema.define({
    organization: Organization,
    program: Program,
    user: User
});

export const schema = _schema;
