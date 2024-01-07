'use strict';

class Filter {
    constructor({ wrapper, header, filter_elem }) {
        this.wrapper = wrapper;
        this.header = header;
        this.filter = filter_elem;
        this.list = null;
    }

    defaultMode() {
        let str = ` <div class="search">
                        <h2>${this.header}</h2>
                        <div class="search__wrap"><span>&#9660;</span></div>
                    </div> `;
        this.wrapper.insertAdjacentHTML('afterbegin', str);
        this.search = this.wrapper.querySelector('.search');
    }

    clickMenu(e) {
        if (this.list && this.list.style.display === 'block') {
            this.closeMenu();
        } else {
            if (e.target.matches('.search__wrap') || e.target.matches('.search__wrap span')) {
                this.createList();
            }
        }
    }

    closeMenu() {
        if (this.list && this.list.style.display === 'block') {
            this.list.style.display = 'none';
        }
    }

    createList() {
        let str = `<div class="filter"></div>`;
        this.wrapper.insertAdjacentHTML('beforeend', str);
        this.list = this.wrapper.querySelector('.filter');
        this.createListElements();
    }

    createListElements() {
        let str = '';
        this.filter.forEach((element) => {
            str += this.createListElement(element);
        });
        this.list.innerHTML = str;
    }

    createListElement(element) {
        return `<div class="filter__item">${element.title}</div>`;
    }

    init() {
        console.dir(this);
        this.defaultMode();
        this.search.addEventListener('click', this.clickMenu.bind(this));
    }
}
