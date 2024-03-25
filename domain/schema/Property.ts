import { Schema } from "@/liquid-store/normalizr";
import Art from "../model/Art";
import { schema as upload } from "./Upload";
import { schema as user } from "./User";

const property = new Schema("properties");
property.model = Art;
//@ts-ignore
Art.schema = property;

const comment = new Schema("comments");

property.define({
    user,
    cover: upload,
    comment
});

export const propertySchema = property;
