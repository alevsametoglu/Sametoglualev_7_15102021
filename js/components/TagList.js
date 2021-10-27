import Tag from './Tag.js';

export default class TagList {
    el;
    tagColor = 'primary';
    selectedTags = [];
    onTagListChanged;

    constructor(color, onTagListChanged) {
        this.el = document.createElement('div');
        this.el.classList.add('tag-list');
        this.tagColor = color;
        this.onTagListChanged = onTagListChanged;
    }

    addTag(text) {
        this.selectedTags.push(text);
        const tag = new Tag(text, this.tagColor, (text) => this.onTagItemClose(text));
        this.el.appendChild(tag.el);
        this.onTagListChanged();
    }

    onTagItemClose(text) {
        const index = this.selectedTags.indexOf(text);
        if (index !== -1) this.selectedTags.splice(index, 1);
        this.onTagListChanged();
    }
}
