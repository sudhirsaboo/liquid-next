import isObject from "lodash/isObject";

export default class UnionSchema {
    _itemSchema: any;
    _getSchema: any;

    constructor(itemSchema, options) {
        if (!isObject(itemSchema)) {
            throw new Error(
                "UnionSchema requires item schema to be an object."
            );
        }

        if (!options || !options.schemaAttribute) {
            throw new Error("UnionSchema requires schemaAttribute option.");
        }

        this._itemSchema = itemSchema;

        const schemaAttribute = options.schemaAttribute;
        this._getSchema =
            typeof schemaAttribute === "function"
                ? schemaAttribute
                : x => x[schemaAttribute];
    }

    getItemSchema() {
        return this._itemSchema;
    }

    getSchemaKey(item) {
        return this._getSchema(item);
    }
}
