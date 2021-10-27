export default class Tag {
    el;
    constructor(text, color, onClose) {
        this.el = document.createElement('button');
        this.el.classList.add(`btn`);
        this.el.classList.add(`btn-${color}`);

        this.el.setAttribute('type', 'button');
        this.el.innerText = text;

        const closeButton = document.createElement('i');
        closeButton.classList.add('far');
        closeButton.classList.add('fa-times-circle');
        closeButton.addEventListener('click', () => {
            this.el.remove();
            onClose(text);
        });
        this.el.appendChild(closeButton);
    }
}
