export default class EntitySchema {
    _key: any;
    _getId: any;
    _idAttribute: any;
    model: any;
    user: any;

    constructor(key, options = { idAttribute: null }) {
        if (!key || typeof key !== "string") {
            throw new Error("A string non-empty key is required");
        }

        this._key = key;

        const idAttribute = options.idAttribute || "id";
        this._getId =
            typeof idAttribute === "function"
                ? idAttribute
                : x => x[idAttribute];
        this._idAttribute = idAttribute;
    }

    getKey() {
        return this._key;
    }

    getId(entity) {
        return this._getId(entity);
    }

    getIdAttribute() {
        return this._idAttribute;
    }

    define(nestedSchema) {
        for (const key in nestedSchema) {
            if (nestedSchema.hasOwnProperty(key)) {
                this[key] = nestedSchema[key];
            }
        }
    }
}
