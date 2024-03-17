import { Schema, arrayOf } from "@/liquid-store/normalizr";

const editor = new Schema("editor");
const user = new Schema("users");
const item = new Schema("editor_items");

editor.define({
    user
});

editor.define({
    items: arrayOf(item)
});

export const editorSchema = editor;
/**
 * Created by ssaboo on 3/21/16.
 */
