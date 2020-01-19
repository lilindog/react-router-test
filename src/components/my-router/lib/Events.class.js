export default class Event {
    constructor () {
        this._events = {
            "change": [],
            "push": [],
            "back": []
        }
    }
    emit (eventname, data) {
        const events = this._events;
        if (!events[eventname]) throw `emit "${eventname}" 没有声明`;
        events[eventname].forEach(cb => cb && cb(data));
    }
    on (eventname, cb) {
        const events = this._events;
        if (!events[eventname]) throw `on "${eventname}" 没有声明`;
        events[eventname].push(cb);
    }
}