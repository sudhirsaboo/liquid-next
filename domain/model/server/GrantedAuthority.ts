import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class GrantedAuthority extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "authority",
            type: "string",
            format: ""
        }
    ];
}
