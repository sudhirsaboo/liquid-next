export default class FormatUtils {
    static addCommas(i) {
        if (i === null || i === undefined) {
            return;
        }
        return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static titleCase(str) {
        let newstr = str.split(" ");
        for (let i = 0; i < newstr.length; i++) {
            newstr[i] =
                newstr[i].charAt(0).toUpperCase() +
                newstr[i].substring(1).toLowerCase();
        }
        newstr = newstr.join(" ");
        return newstr;
    }

    static camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    static isVowel(c) {
        return ["a", "e", "i", "o", "u"].indexOf(c.toLowerCase()) !== -1;
    }

    static title(name, action, data?) {
        if (!action) {
            if (data && data.id) {
                action = "Edit";
            } else action = "Create";
        }

        name = this.titleCase(name);

        let label = "a";
        if (this.isVowel(name[0])) label += "n";

        label = `${action} ${label} ${name}`;
        return label;
    }
}
