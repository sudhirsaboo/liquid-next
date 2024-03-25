import Model from "./Model";
export default class Cart extends Model {
    user: number = 0;
    subtotal: number = 0;
    total: number = 0;
    itemCount: number = 0;
    items: Array<any> = [];

    constructor(props) {
        super(props);
    }

    initialize() {
        this.id = "cart10000";
        this.user = 1;
        this.subtotal = 0;
        this.total = 0;
        this.itemCount = 0;
        this.items = [];
    }

    addItem(item) {
        this.items = this.items.concat(item);
    }

    calculateTotal() {
        this.subtotal = parseFloat(
            this.items.reduce((pre, cur) => {
                return parseFloat(cur.Item.startAtPrice) + pre;
            }, 0)
        );

        this.total = this.subtotal;
        this.itemCount = this.items.length;
    }
}
