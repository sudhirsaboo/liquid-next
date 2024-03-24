import  moment from "moment";

export function getDaysAgo(date) {
    return moment(date).fromNow();
}
