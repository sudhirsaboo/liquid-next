import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as nock from "nock";

import * as sinon from "sinon";
import { expect } from "../../../test/expect";
import { APIConstants } from "@/liquid-store/constants/Config";import Albums from "../../actions/albums";

const mockAlbums = require("./data/albums100.json");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let sinonSandbox;
beforeEach(() => {
    APIConstants.API_ROOT_URL = "http://example.com";
    sinonSandbox = sinon.createSandbox();
});
afterEach(() => {
    sinonSandbox.restore();
});
describe("Albums Store", () => {
    it("Should Not Fetch  Data if on last page.3", function() {
        const store = mockStore({
            albums: {
                "/albums": {
                    isFetching: false,
                    items: [100],
                    page: {
                        number: 0,
                        size: 20,
                        totalElements: 1,
                        totalPages: 1
                    }
                }
            }
        });
        const playlist = "/albums";
        const filter = { parent: "/albums" };

        return store
            .dispatch(Albums.fetchDataIfNeeded(playlist, filter))
            .then(() => {
                expect(store.getActions()).to.deep.equal([]);
            });
    });

    it("Should Not Fetch  Data if fetching already.", function() {
        const store = mockStore({
            albums: {
                "/albums": {
                    isFetching: true,
                    items: [],
                    page: null
                }
            }
        });
        const playlist = "/albums";
        const filter = { parent: "/albums" };

        return store
            .dispatch(Albums.fetchDataIfNeeded(playlist, filter))
            .then(() => {
                expect(store.getActions()).to.deep.equal([]);
            });
    });

    it("Should   Fetch  Data if first time.", function() {
        nock("http://example.com")
            .get("/service/albums?&page=0")
            .reply(200, mockAlbums);

        const store = mockStore({
            albums: {}
        });
        const playlist = "/albums";
        const filter = { parent: "/albums" };

        const expectedActions = require("./data/albums100.actions.json");
        return store
            .dispatch(Albums.fetchDataIfNeeded(playlist, filter))
            .then(() => {
                //console.log(JSON.stringify(expectedActions[1]));
                // Need to stringify as actions contain classes like Album but json doesnt
                expect(JSON.stringify(store.getActions(), null, 2)).to.equal(
                    JSON.stringify(expectedActions, null, 2)
                );
            });
    });

    it("Remove One.", function() {
        nock("http://example.com")
            .delete("/service/albums/100")
            .reply(200, {});
        const store = mockStore({
            authed: { accessToken: "mytoken" }
        });
        const context = { playlist: "/user/1" };

        const object = {
            id: 100,
            user: 100
        };

        const expectedActions = [
            {
                type: "DELETE_ENTITY",
                entity: "ALBUMS",
                playlist: "/user/1",
                entityIds: [100]
            }
        ];
        return store.dispatch(Albums.removeOne(context, object)).then(() => {
            //console.log(JSON.stringify(store.getActions(), null, 2));
            expect(JSON.stringify(store.getActions(), null, 2)).to.equal(
                JSON.stringify(expectedActions, null, 2)
            );
        });
    });

    it("Update One.", function() {
        nock("http://example.com")
            .intercept("/service/albums/100", "PATCH")
            .reply(200, {
                id: 100,
                name: "albumname"
            });
        const store = mockStore({
            authed: { accessToken: "mytoken", user: { id: 100 } }
        });
        const context = { playlist: "/user/1" };

        const object = {
            id: 100,
            user: 100
        };

        const expectedActions = [
            {
                type: "PATCH_ENTITY",
                entity: "ALBUMS",
                item: {
                    id: 100,
                    user: 100
                },
                id: 100,
                filter: {
                    playlist: "/user/1",
                    entityPath: "albums"
                },
                playlist: "/user/1"
            }
        ];
        return store.dispatch(Albums.insert(context, object)).then(() => {
            //console.log(JSON.stringify(store.getActions(), null, 2));
            expect(JSON.stringify(store.getActions(), null, 2)).to.equal(
                JSON.stringify(expectedActions, null, 2)
            );
        });
    });
});
