import { TextDecoder, TextEncoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const enzyme = require("enzyme");
import Adapter from "@cfaester/enzyme-adapter-react-18";

enzyme.configure({ adapter: new Adapter() });

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
    console.error("Sudhir");
});
virtualConsole.sendTo(console, { omitJSDOMErrors: true });
const window = new JSDOM(
    `
    <!DOCTYPE html>
    <script>console.log("hello world");</script>`,
    { virtualConsole }
).defaultView;

const dom = new JSDOM(``, { virtualConsole });
global.dom = dom;

const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
    if (!params.find((p) => p.toString().includes(jsDomCssError))) {
        originalConsoleError(...params);
    }
};
