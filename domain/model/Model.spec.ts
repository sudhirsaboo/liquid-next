import * as expect from "expect";
import {Upload} from "./Model";
import Album from "./Portfolio";
import { APIConstants } from "../../constants/Config";

describe("Async Test", () => {
    it("should always pass", function() {
        expect(true).toEqual(true);
    });

    it("Just uploaded Album Cover displays", () => {
        const album: Album = new Album({});
        album.cover = new Upload({});
        album.cover.file = {
            preview:
                "blob:http://localhost:3000/e19b788d-5bd5-424a-a4cf-45eacdd79526"
        };
        const url = album.getCover({}, "large");
        expect(url).toEqual(album.cover.file.preview);
    });

    it("Saved Album Cover displays for AWS Links", () => {
        const uploadJSON = {
            awsUrl: "https://artulous.s3-us-west-1.amazonaws.com",
            contentType: "image/jpeg",
            displayName: null,
            ext: "JPG",
            id: 1,
            name: null,
            url: "api/upload/1",
            version: 2,
            video: false
        };
        const upload = new Upload(uploadJSON);
        const entities = { uploads: { 1: upload } };

        const album: Album = new Album({});
        album.cover = 1;
        const url = album.getCover({ entities }, "large");
        expect(url).toEqual(
            "https://artulous.s3-us-west-1.amazonaws.com/large/1.JPG"
        );
    });

    it("Saved Album Cover displays for Artulous Links", () => {
        const uploadJSON = {
            awsUrl: null,
            contentType: "image/jpeg",
            displayName: null,
            ext: "JPG",
            id: 1,
            name: null,
            url: "api/upload/1",
            version: 2,
            video: false
        };
        const upload = new Upload(uploadJSON);
        const entities = { uploads: { 1: upload } };

        const album: Album = new Album({});
        album.cover = 1;
        APIConstants.API_ROOT_URL = "artulous-prod-v2/";
        const url = album.getCover({ entities }, "large");
        expect(url).toEqual("artulous-prod-v2/api/upload/1?test&s=large");
    });
});
