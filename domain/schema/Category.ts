import { Schema } from "@/liquid-store/normalizr";
import Category from "../model/Category";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

const _schema = new Schema("categories");
_schema.model = Category;
Category.schema = _schema;

_schema.define({
    // organization: Organization  dont have a look up
});

export const schema = _schema;
