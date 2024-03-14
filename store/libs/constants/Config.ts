import { ENVConstants } from "./Config-gen";
 
const API_ROOT_URL = ENVConstants.API_ROOT_URL + "/";

export const APIConstants = {
    API_ROOT_URL,
    API_BASE_URL: API_ROOT_URL + "api",
    UPLOAD_URL: API_ROOT_URL + "api/upload",
    DATA_URL: API_ROOT_URL + "api/art/data",
 };
