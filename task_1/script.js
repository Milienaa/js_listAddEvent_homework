'use strict'

class Filter {
    constructor({wrapper, header, filter_elem}){
        this.wrapper = wrapper;
        this.header = header;
        this.filter = filter_elem;
        this.list = null;
    }

    createHeader() {
        let str = `<h2>${this.header}</h2>`;
        this.wrapper.insertAdjacentHTML('afterbegin',str);
    }

    createList() {
        let str = `<ul class="filter"></ul>`;
        this.wrapper.insertAdjacentHTML('beforeend',str);
        this.list = root.querySelector('.filter');
        this.createListElements();

    }

    createListElements() {
        let str = '';
        this.filter.forEach(element => {
            str += this.createListElement(element);
        });
        this.list.innerHTML = str;
    }

    createListElement(element) {
        return  `<li class="${this.defineSelectElement(element.status)}">
                        <span class="filter__checkbox"></span>
                        <span class="filter__text">${element.title}</span>
                    </li>`
    }

    defineSelectElement(status) {
        if(status) {
            return 'filter__item filter__item--select';
        } else {
            return 'filter__item';
        }
    }

    selectElement(e) {
        let tmp = e.target.closest('.filter__item');
        if(tmp) {
            let i = [...this.list.children].indexOf(tmp);
            this.filter.forEach((element, index) => {
                if(index === i && element.status === false){
                    element.status = true;
                } else if (index === i && element.status === true) {
                    element.status = false;
                }
            })
            console.log(this.filter);
            this.createListElements();
        }
    }

    init() {
        console.dir(this);
        this.createHeader();
        this.createList();
        root.addEventListener('click', this.selectElement.bind(this));
    }
}