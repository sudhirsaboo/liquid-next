import Store from "@/liquid-store/store/SyncStore";
import Proxy from "@/liquid-store/proxy/Proxy";
import { cartSchema } from "./schema/Cart";
import IDGenerator from "@/liquid-utils/IDGenerator";
import CartModel from "./model/Cart";

class Cart extends Store {
    addItem(playlist, carts, item) {
        let cart = carts.cart10000;

        if (!cart) {
            cart = new CartModel(null);
            cart.initialize();
        }
        cart.addItem(item);

        const type = "cart";
        item.id = IDGenerator.cartitem.next().value;

        cart.calculateTotal();

        return this.addDataItem(playlist, cart.id, cart, type);
    }
}

Cart.proxy = new Proxy({ name: "cart", schema: cartSchema });

export default new Cart();
