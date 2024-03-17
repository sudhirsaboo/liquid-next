import { Schema } from "@/liquid-store/normalizr";
import Organization from "../model/Organization";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

const _schema = new Schema("organizations");
_schema.model = Organization;
Organization.schema = _schema;

_schema.define({});

export const schema = _schema;
