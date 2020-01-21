export function deepClone (target) {
    const baseTypes = ["string", "number", "function", "undefined", "symbol", "boolean"];
    let copy = null;
    if (Object.prototype.toString.call(target) === "[object Array]") {
        copy = [];
        target.forEach(ele => {
            if (baseTypes.includes(typeof ele) || ele === null) {
                copy.push(ele);
            } else {
                copy.push(deepClone(ele));
            }
        });
    }
    if (Object.prototype.toString.call(target) === "[object Object]") {
        copy = {};
        Object.keys(target).forEach(key => {
            if (baseTypes.includes(typeof target[key]) || target[key] === null) {
                copy[key] = target[key];
            } else {
                copy[key] = deepClone(target[key]);
            }
        });
    }
    return copy;
}