/**
 * Created by ssaboo on 3/21/16.
 */
import { Schema } from "@/liquid-store/normalizr";

const liker = new Schema("likers");

liker.define({});

export const likerSchema = liker;
