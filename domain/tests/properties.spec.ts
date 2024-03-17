import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as nock from "nock";

import * as sinon from "sinon";
import { expect } from "../../../test/expect";
import { APIConstants } from "@/liquid-store/constants/Config";

import Upload from "../../actions/model/Upload";
import Model from "../../actions/model/Model";

import Properties from "../../actions/properties";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Needed for Avoiding cyclic Module import Error
/* eslint-disable */
const upload = new Upload({});
const model = new Model({});
/* eslint-enable */

let sinonSandbox;
beforeEach(() => {
    APIConstants.API_ROOT_URL = "http://example.com";
    sinonSandbox = sinon.createSandbox();
});
afterEach(() => {
    sinonSandbox.restore();
});
describe("Arts Store", () => {
    it("Like Art", function() {
        nock("http://example.com")
            .intercept("/api/art/images/100/like", "POST")
            .reply(200);
        const store = mockStore({
            authed: { accessToken: "mytoken", user: { id: 100 } }
        });

        const object = {
            id: 100,
            liked: false
        };

        const expectedActions = [
            {
                type: "SET_ACTED",
                action: "like",
                collection: "properties",
                toggle: true,
                id: 100
            }
        ];
        return store.dispatch(Properties.toggleLike(object)).then(() => {
            //console.log(JSON.stringify(store.getActions(), null, 2));
            expect(JSON.stringify(store.getActions(), null, 2)).to.equal(
                JSON.stringify(expectedActions, null, 2)
            );
        });
    });

    it("UnLike Art", function() {
        nock("http://example.com")
            .intercept("/api/art/images/100/unlike", "POST")
            .reply(200);
        const store = mockStore({
            authed: { accessToken: "mytoken", user: { id: 100 } }
        });

        const object = {
            id: 100,
            liked: true
        };

        const expectedActions = [
            {
                type: "SET_ACTED",
                action: "unlike",
                collection: "properties",
                toggle: false,
                id: 100
            }
        ];
        return store.dispatch(Properties.toggleLike(object)).then(() => {
            //console.log(JSON.stringify(store.getActions(), null, 2));
            expect(JSON.stringify(store.getActions(), null, 2)).to.equal(
                JSON.stringify(expectedActions, null, 2)
            );
        });
    });
});
