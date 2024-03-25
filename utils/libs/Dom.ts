// @ts-nocheck 
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
