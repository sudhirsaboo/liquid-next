import  Cookies from "js-cookie";

import  types from "@/liquid-store/constants/ActionTypes";
import { AUTHED_PLAYLIST_SUFFIX } from "../constants/PlaylistConstants";
import { APIConstants } from "@/liquid-store/constants/Config";

import { navigateTo } from "../actions/router";
import UsersStore from "../actions/users";

import { login } from "../utils/Login";
import Authed from "./model/Authed";

const COOKIE_PATH = "accessToken";
import  fetch from "isomorphic-fetch";

function authUser(accessToken) {
    return dispatch => {
        dispatch(fetchAuthedUser(accessToken));
    };
}

export function demoLogin() {
    return dispatch => {
        const user = { loginname: "nphadmin", password: "nphadmin" };
        const success = function(data) {
            dispatch(loggedIn(data));
        };

        const error = function() {
            return;
        };

        login(user).then(success, error);
    };
}

function fetchAuthedUser(accessToken) {
    // eslint-disable-next-line
    const me = this;
    return dispatch => {
        const headers = new Headers();
        headers.append(
            "Accept",
            "application/json, text/javascript, */*; q=0.01"
        );
        if (accessToken)
            headers.append("Authorization", "Bearer " + accessToken);

        fetch(APIConstants.SIGNIN_URL, {
            method: "get",
            headers,
            mode: "cors",
            credentials: "include"
        })
            .then(response => {
                if (response.status > 299 && response.status != 401) {
                    throw response;
                }
                if (response.status === 401) {
                    Cookies.remove(COOKIE_PATH);
                }
                return response;
            })
            .then(response => {
                return response.json();
            })
            .then(json => {
                // if(!json || !json.id) dispatch(demoLogin());
                const authed = new Authed(json);
                return authed;
            }) // for demo only
            .then(json => {
                dispatch(receiveAuthedUserPre(null, json));
            })

            .catch(err => {
                // dispatch(demoLogin()); // for demo only
                if (err.json) {
                    err.json().then(function(json) {
                        dispatch(receiveError({ err, body: json }));
                    });
                } else {
                    dispatch(receiveError({ err, body: err }));
                }
            });
    };
}

function receiveError(error) {
    return {
        type: types.RECEIVE_ERRORS,
        error
    };
}
export function initAuth() {
    return dispatch => {
        const accessToken = Cookies.get(COOKIE_PATH);
        // //        if (accessToken) {
        return dispatch(authUser(accessToken));
        // //    }
    };
}

// Sudhir Saboo
export function loggedIn(data) {
    if (!data) data = {};
    return dispatch => {
        if (data.access_token) {
            Cookies.set(COOKIE_PATH, data.access_token);
        }
        dispatch(authUser(data.access_token));
    };
}

export function logoutUser() {
    return (dispatch, getState) => {
        Cookies.remove(COOKIE_PATH);

        fetch(APIConstants.SIGNOUT_URL, {
            method: "get",
            credentials: "include"
        }).catch(err => {
            throw err;
        });

        const { authed, entities } = getState();

        const playlists = authed.playlists.map(playlistId => {
            return (
                entities.playlists[playlistId].title + AUTHED_PLAYLIST_SUFFIX
            );
        });

        dispatch(navigateTo({ path: "/" }));

        return dispatch(resetAuthed(playlists));
    };
}

function receiveAccessToken(accessToken) {
    return {
        type: types.RECEIVE_ACCESS_TOKEN,
        accessToken
    };
}

function receiveAuthedUserPre(accessToken, user) {
    return dispatch => {
        if (accessToken) {
            dispatch(receiveAccessToken(accessToken));
        }

        if (user.id) {
            dispatch(receiveAuthedUser(user));
        } else {
            dispatch(receiveAuthedUser(null));
        }
        dispatch(UsersStore.getFriends());
    };
}

function receiveAuthedUser(user) {
    return {
        type: types.RECEIVE_AUTHED_USER,
        user
    };
}

function resetAuthed(playlists) {
    return {
        type: types.RESET_AUTHED,
        playlists
    };
}

export function getSocialLoginUrl(type) {
    return `${APIConstants.SIGNIN_URL2}/${type}`;
}
