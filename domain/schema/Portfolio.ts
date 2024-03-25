import { Schema } from "@/liquid-store/normalizr";
import { schema as user } from "./User";
import { schema as upload } from "./Upload";
import Album from "../model/Portfolio";

const album = new Schema("albums");
album.model = Album;
//@ts-ignore
Album.schema = album;

album.define({
    user,
    cover: upload
});

export const schema = album;
