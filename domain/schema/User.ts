/* eslint-disable */
/**
 * Created by ssaboo on 3/21/16.
 **/
import { Schema } from "@/liquid-store/normalizr";
import { schema as upload } from "./Upload";
import User from "../model/User";
import UserBiography from "../model/UserBiography";

const user = new Schema("users");
const metric = new Schema("metrics");
const setting = new Schema("settings");
const userBiography = new Schema("userBiographies");

user.model = User;
User.schema = user;

metric.model = User;
setting.model = User;
userBiography.model = UserBiography;

metric.define({
    cover: upload
});

user.define({
    metrics: metric,
    cover: upload,
    avatar: upload
});
setting.define({
    cover: upload,
    avatar: upload
});

userBiography.define({
    user
});

export const schema = user;
export const metrics = metric;
export const settings = setting;
export const userBiographies = userBiography;
