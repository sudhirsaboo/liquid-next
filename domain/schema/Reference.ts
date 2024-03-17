import { Schema } from "@/liquid-store/normalizr";
import Reference from "../model/Reference";

const reference = new Schema("references");
reference.model = Reference;
Reference.schema = reference;

reference.define({});

export const referenceSchema = reference;
/**
 * Created by ssaboo on 5/15/16.
 */
