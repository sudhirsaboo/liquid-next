import { Schema } from "@/liquid-store/normalizr";
import Cart from "../model/Cart";

const cart = new Schema("cart");
cart.model = Cart;
Cart.schema = cart;
const user = new Schema("users");
// let item = new Schema('cart_items');
// item.model = CartItem;

cart.define({
    user
});

/*
cart.define({
    items: arrayOf(item)
});
*/

export const cartSchema = cart;
