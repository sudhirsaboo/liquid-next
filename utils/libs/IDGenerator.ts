function* idMaker(pre) {
    let index = 10000;
    while (true) {
        yield pre + index++;
    }
}

const gen = {
    cartitem: idMaker("cartitem"),
    cart: idMaker("cart"),
    comment: idMaker("comment"),
    post: idMaker("ui-post"),
    upload: idMaker("ui-upload"),
    album: idMaker("album"),
    field: idMaker("field"),
    missing: idMaker("missing"),
    reference: idMaker("reference")
};

export default gen;
