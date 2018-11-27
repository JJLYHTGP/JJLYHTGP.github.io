export default class DomElement {
    element: HTMLElement;

    constructor(public tagName) {
        this.element = document.createElement(tagName); 
    }

    setEleClass(...classNames) {
        classNames.forEach((className) => this.element.classList.add(className));
    }

    appendChild(child: HTMLElement) {
        this.element.appendChild(child);
    }

    setEleStyle(style) {
        for (const key of style) {
            this.element.style[key] = style[key];
        }
    }

    getElement() {
        return this.element;
    }
}
