// import { push, goBack } from 'redux-router';
import { push, replace , go} from "@lagunovsky/redux-react-router";

import { constructUrl } from "../utils/RouteUtils";

export function navigateTo(route) {
    /* let query = '';
    if(route.query) query = route.query;

    let path = route;
    if(route.path) path = route.path;
    */
    const url = constructUrl(route);

    return dispatch => {
        return dispatch(push(url));
    };
}

export function navigateToTab(route) {
    const url = constructUrl(route);

    return dispatch => {
        return dispatch(replace(url));
    };
}
 
export function back() {
    return dispatch => {
        return dispatch(go(-1));
    };
}
 