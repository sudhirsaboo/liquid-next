import { Schema } from "@/liquid-store/normalizr";
import Type from "../model/Type";
import { schema as Organization } from "./Organization";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

const _schema = new Schema("types");
_schema.model = Type;
//@ts-ignore
Type.schema = _schema;

_schema.define({
    organization: Organization
});

export const schema = _schema;
