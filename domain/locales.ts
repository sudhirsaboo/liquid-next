import  types from "@/liquid-store/constants/ActionTypes";

export function updateLocale(locale) {
    return {
        type: types.RECEIVE_LOCALE,
        locale
    };
}
export function updateMessages(msg) {
    return {
        type: types.RECEIVE_MESSAGES,
        msg
    };
}
export async function loadMessages(locale) {
    return reactIntlLocaleData[locale]();
}
declare let require: any;

const reactIntlLocaleData = {
    fr: () =>
        require.ensure(
            [],
            require => {
                const frData = require("../translations/locales/fr.json");
                return frData;
            },
            "fr"
        ),
    en: () =>
        require.ensure(
            [],
            require => {
                const enData = require("../translations/locales/en.json");
                return enData;
            },
            "en"
        )
};
