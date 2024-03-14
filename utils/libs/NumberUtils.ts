export default class NumberUtils {
    static format(value, n, x, s, c) {
        if (!value.toFixed) return value;

        const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
            num = value.toFixed(Math.max(0, ~~n));

        return (c ? num.replace(".", c) : num).replace(
            new RegExp(re, "g"),
            "$&" + (s || ",")
        );
    }

    static formatCurrency(value, n, x, s, c) {
        return "$" + NumberUtils.format(value, n, x, s, c);
    }
}

/*
12345678.9.format(2, 3, '.', ',');  // "12.345.678,90"
123456.789.format(4, 4, ' ', ':');  // "12 3456:7890"
12345678.9.format(0, 3, '-');       // "12-345-679"
 */
