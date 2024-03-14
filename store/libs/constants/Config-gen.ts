let env = "dev";
if (process.env.NODE_ENV == "production") {
    env = "prod";
}
export const ENVConstants = {
    ENV: env,
    API_ROOT_URL: process.env.NEXT_PUBLIC_API_ROOT_URL
};
