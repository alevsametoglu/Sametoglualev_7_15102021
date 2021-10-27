export default class DropdownButton {
    el;
    onItemClick;
    constructor(text, color, items, onItemClick, onTagListInputChange) {
        this.onItemClick = onItemClick;
        this.el = document.createElement('div');
        this.el.classList.add('btn-group');
        this.el.innerHTML = `
        <button
        type="button"
        class="btn btn-${color} dropdown-toggle filter-tag"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">${text}</button>
        `;
        const dropdownMenuEl = document.createElement('div');
        dropdownMenuEl.classList.add('dropdown-menu');
        // dropdownMenuEl.style.background = `red !important`;

        const searchTagInput = document.createElement('input');
        searchTagInput.classList.add('form-control');
        searchTagInput.classList.add('search-tag-input');
        searchTagInput.setAttribute('type', 'text');
        searchTagInput.setAttribute('placeholder', 'Recherche un ingredient');
        searchTagInput.addEventListener('keyup', (e) => {
            onTagListInputChange(e.target.value.trim());
        });
        dropdownMenuEl.appendChild(searchTagInput);

        this.el.appendChild(dropdownMenuEl);

        this.updateOptionList(items);
    }

    updateOptionList(items) {
        const dropdownMenuEl = this.el.querySelector('div.dropdown-menu');
        dropdownMenuEl.querySelectorAll('.dropdown-item').forEach((element) => element.remove());
        items.forEach((item) => {
            const dropdownItemEl = document.createElement('a');
            dropdownItemEl.classList.add('dropdown-item');
            dropdownItemEl.innerHTML = item;
            dropdownItemEl.addEventListener('click', () => this.onItemClick(item));
            dropdownMenuEl.appendChild(dropdownItemEl);
        });
    }
}
