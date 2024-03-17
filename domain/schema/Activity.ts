import { Schema } from "@/liquid-store/normalizr";
import Activity from "../model/Activity";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

const _schema = new Schema("activities");
_schema.model = Activity;
Activity.schema = _schema;

_schema.define({});

export const schema = _schema;
