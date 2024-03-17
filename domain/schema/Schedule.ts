import { Schema } from "@/liquid-store/normalizr";
import { schema as user } from "./User";
import { schema as upload } from "./Upload";
import Schedule from "../model/Schedule";

const schedule = new Schema("schedules");
schedule.model = Schedule;
Schedule.schema = schedule;

schedule.define({
    user,
    cover: upload
});

export const schema = schedule;
/**
 * Created by ssaboo on 4/1/16.
 */
