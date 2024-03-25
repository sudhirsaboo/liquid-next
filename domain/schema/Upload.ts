import { Schema } from "@/liquid-store/normalizr";
import Upload from "../model/Upload";

const upload = new Schema("uploads");
upload.model = Upload;
//@ts-ignore
Upload.schema = upload;

upload.define({});

export const schema = upload;
/**
 * Created by ssaboo on 4/1/16.
 */
