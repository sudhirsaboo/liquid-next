declare let require: any;

const SideNav = require("./side-nav.json");

export default function getData(file) {
    if (file == "SideNav") {
        return SideNav.json;
    }
    return null;
}
