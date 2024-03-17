import { Schema } from "@/liquid-store/normalizr";
import ProgramSubmission from "../model/ProgramSubmission";
import { schema as Album } from "./Portfolio";
import { schema as Organization } from "./Organization";
import { schema as User } from "./User";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

const _schema = new Schema("programSubmissions");
_schema.model = ProgramSubmission;
ProgramSubmission.schema = _schema;

_schema.define({
    //       questionnaire: ProgramQuestionnaire, no need to normalize
    album: Album,
    organization: Organization,
    user: User
});

export const schema = _schema;
