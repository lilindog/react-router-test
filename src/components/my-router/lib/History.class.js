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
        const oldPathname = location.pathname;
        window.history.pushState(null, null, path);
        this.emit("push", oldPathname);
    }

    goBack () {
        const oldPathname = location.pathname;
        window.history.back();
        this.emit("back", oldPathname);
    }
}

const history = new History();

export default history;