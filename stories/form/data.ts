export const post = {
    organization: {
        displayName: "IStrokes Studio",
        name: "ISTROKES",
        id: "5",
    },
    user: 68,
    cover: 400,
    start: "2024-02-28T18:30:00.000+0000",
    end: "2024-03-30T18:30:00.000+0000",
    displayName: null,
    version: 1,
    name: "test",
    id: 307,
    description: "test",
    statement: "HARD",
    technical: 7,
    copyright : {
        super1:false,
        super2:false,
        super3:false,
    },
    fee: 100,
    tags: ["test1", "test2"],
};
export const entities = {
    organizations: {
        "5": {
            cover: null,
            parent: null,
            displayName: "IStrokes Studio",
            version: 1,
            name: "ISTROKES",
            id: 5,
        },
        "51": {
            cover: null,
            parent: null,
            displayName: "IStrokes Studio 2",
            version: 1,
            name: "ISTROKES 2",
            id: 51,
        },
    },
};
export const organizations = {
    organizations: {
        isFetching: false,
        items: [5, 51],
        page: {
            size: 20,
            totalElements: 1,
            totalPages: 1,
            number: 0,
        },
    },
};