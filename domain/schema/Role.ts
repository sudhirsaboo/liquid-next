import { Schema } from "@/liquid-store/normalizr";
import Role from "../model/Role";
import { schema as User } from "./User";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

const _schema = new Schema("roles");
_schema.model = Role;
Role.schema = _schema;

_schema.define({
    user: User
});

export const schema = _schema;
