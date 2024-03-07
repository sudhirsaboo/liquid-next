export function constructUrl(route) {
    if (!route.path) return route;
    const { path, query } = route;

    let result = path;
    if (path && path.join) result = path.join("/");
    let queryArr : string[] = [];
    if (query && typeof query === "object") {
        queryArr = Object.keys(query)
            .sort()
            .filter(key => query[key] !== null)
            .map(key => `${key}=${query[key]}`);
    }

    if (queryArr.length > 0) {
        result += "?" + queryArr.join("&");
    }

    return result;
}