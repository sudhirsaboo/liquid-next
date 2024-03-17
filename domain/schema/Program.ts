/**
 * Created by ssaboo on 4/28/16.
 */
import { Schema } from "@/liquid-store/normalizr";
import { schema as user } from "./User";
import { schema as upload } from "./Upload";
import Program from "../model/Program";

const program = new Schema("programs");
program.model = Program;
Program.schema = program;

program.define({
    user,
    cover: upload
});

export const schema = program;
/**
 * Created by ssaboo on 4/1/16.
 */
