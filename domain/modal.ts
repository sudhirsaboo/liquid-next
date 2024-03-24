import  types from "@/liquid-store/constants/ActionTypes";

export function changeModal(modal = "modal", props?, Card?) {
    return {
        type: types.CHANGE_MODAL,
        modal,
        Card,
        props
    };
}

export function showLogin(showLogin = true) {
    return {
        type: "SHOW_LOGIN",
        showLogin
    };
}
