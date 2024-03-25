import { Schema } from "@/liquid-store/normalizr";
import AlbumRating from "../model/AlbumRating";
import { schema as Organization } from "./Organization";
import { schema as User } from "./User";
import { schema as Album } from "./Portfolio";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

const _schema = new Schema("albumratings");
_schema.model = AlbumRating;
//@ts-ignore
AlbumRating.schema = _schema;

_schema.define({
    organization: Organization,
    user: User,
    entity: Album
});

export const schema = _schema;
