export default class DropdownButton {
    el;
    constructor(id, text, colorClass, dropdownMenuClass, items, onItemClick) {
        this.el = document.createElement('div');
        this.el.classList.add('btn-group');
        this.el.innerHTML = `
        <button
        type="button"
        class="btn ${colorClass} dropdown-toggle filter-tag"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">${text}</button>
        `;
        const dropdownMenuEl = document.createElement('div');
        dropdownMenuEl.classList.add('dropdown-menu');
        dropdownMenuEl.classList.add(dropdownMenuClass);

        items.forEach((item) => {
            const dropdownItemEl = document.createElement('a');
            dropdownItemEl.classList.add('dropdown-item');
            dropdownItemEl.innerHTML = item;
            dropdownItemEl.addEventListener('click', () => {
                onItemClick(id, item);
            });
            dropdownMenuEl.appendChild(dropdownItemEl);
        });

        this.el.appendChild(dropdownMenuEl);
    }
}
