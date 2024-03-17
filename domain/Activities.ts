import Proxy from "@/liquid-store/proxy/Proxy";
import Store from "@/liquid-store/store/SyncStore";
import { schema } from "./schema/Activity";

/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */
import { APIConstants } from "@/liquid-store/constants/Config";
const url = APIConstants.API_BASE_URL;

class Activities extends Store {
    // added because PATCH Was not saving roles.
    publish(context, row) {
        return (dispatch, getState) => {
            const { authed } = getState();
            const entity = "properties";
            const entities = { [entity]: {} };

            dispatch(this.doPublishChanges(entities));

            return dispatch(
                this.syncNew(
                    authed.accessToken,
                    context.playlist,
                    null,
                    context,
                    row
                )
            );
        };
    }

    addRoleActivities(context, roles) {
        return () => {
            const headers = new Headers();
            headers.append(
                "Accept",
                "application/json, text/javascript, */*; q=0.01"
            );
            headers.append("Content-Type", "application/nohal+json");
            const accessToken = this.getAccessToken(null);
            if (accessToken)
                headers.append("Authorization", "Bearer " + accessToken);

            // let body = Object.assign({}, request);
            let body = roles;
            body = JSON.stringify(body);

            return fetch(`${url}/addRoleActivities`, {
                method: "post",
                headers,
                body,
                credentials: "include"
            });
        };
    }
}

Activities.proxy = new Proxy({ name: "activity", schema });

export default new Activities();
