export default class SearchInput {
    el;
    constructor(placeHolder, onChange) {
        this.el = document.createElement('div');
        this.el.classList.add('input-group');
        this.el.classList.add('search-input');

        const searchInputEl = document.createElement('input');
        searchInputEl.classList.add('form-control');
        searchInputEl.setAttribute('type', 'text');
        searchInputEl.setAttribute('placeholder', placeHolder);
        searchInputEl.addEventListener('keyup', (e) => {
            onChange(e.target.value);
        });
        this.el.appendChild(searchInputEl);

        const searchIcon = document.createElement('div');
        searchIcon.classList.add('input-group-append');
        searchIcon.innerHTML = `<span class="input-group-text" id="basic-addon2">
        <i class="fas fa-search"></i> </span>`;
        this.el.appendChild(searchIcon);
    }
}
