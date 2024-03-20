import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
    // No-op to skip console errors.
});
const dom = new JSDOM(``, { virtualConsole });

const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
    if (!params.find((p) => p.toString().includes(jsDomCssError))) {
        originalConsoleError(...params);
    }
};
