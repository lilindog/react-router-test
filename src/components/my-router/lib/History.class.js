import Event from "./Events.class";

class History extends Event{
 
    constructor () {
        super();
        this._init();
    }

    _init () {
        window.addEventListener('popstate', () => {
            this.emit("change", null);
        });
    }

    push ({path}) {
        window.history.pushState(null, null, path);
        this.emit("push", null);
    }

    goBack () {
        window.history.back();
        this.emit("back", null);
    }
}

const history = new History();

export default history;