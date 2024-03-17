/**
 * Created by ssaboo on 3/23/16.
 */

export default class Entities {
    constructor(object) {
        (<any>Object).assign(this, object);
    }

    /* Helper that depends on props*/
    static getPost(props, entityName) {
        const { entities, match } = props;
        if (!entities[entityName]) {
            return null;
        }
        const post = entities[entityName][match.id];

        if (post === null) {
            return null;
        }
        return post;
    }
}
