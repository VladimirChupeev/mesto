export default class Section {
    constructor({renderer},containerSelector){
this._renderer = renderer;
this._container = document.querySelector(containerSelector);
    }
    renderer(items){
        items.forEach(item => {this._renderer(item)
            
        });
    }
    addItemPrepend(element){
    
        this._container.prepend(element);
    }
    
    addItemAppend(element){
    
        this._container.append(element);
    }
}