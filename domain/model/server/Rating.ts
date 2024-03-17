import Model from "../Model";
/**
 * Copyright SimplyJargon
 * Created by ssaboo .

 */

export default class Rating extends Model {
    constructor(props) {
        super(props);
    }

    static fields = [
        {
            name: "technical",
            type: "string",
            format: ""
        },
        {
            name: "content",
            type: "string",
            format: ""
        },
        {
            name: "craftsmanship",
            type: "string",
            format: ""
        }
    ];
}
