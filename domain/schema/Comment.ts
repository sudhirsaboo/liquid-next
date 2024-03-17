/**
 * Created by ssaboo on 3/21/16.
 */
import { Schema } from "@/liquid-store/normalizr";
import { schema as user } from "./User";
const comment = new Schema("comments");

comment.define({
    fromUser: user
});

export const commentSchema = comment;
