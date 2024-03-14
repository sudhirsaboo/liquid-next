export function addClass(className) {
    if (this.classList) {
        this.classList.add(className);
    } else if (!this.hasClass(className)) {
        const classes = this.className.split(" ");
        classes.push(className);
        this.className = classes.join(" ");
    }
    return this;
}

export function removeClass(className) {
    if (this.classList) {
        this.classList.remove(className);
    } else {
        const classes = this.className.split(" ");
        classes.splice(classes.indexOf(className), 1);
        this.className = classes.join(" ");
    }
    return this;
}

export function hasClass(cls) {
    return (" " + this.className + " ").indexOf(" " + cls + " ") > -1;
}

function collectionHas(a, b) {
    // helper function (see below)
    for (let i = 0, len = a.length; i < len; i++) {
        if (a[i] == b) return true;
    }
    return false;
}

export function findParentBySelector(elm, selector) {
    const all = document.querySelectorAll(selector);
    let cur = elm.parentNode;
    while (cur && !collectionHas(all, cur)) {
        // keep going up until you find a match
        cur = cur.parentNode; // go up
    }
    return cur; // will return null if not found
}
