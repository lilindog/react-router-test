export function deepClone (target) {
    const baseTypes = ["string", "number", "function", "undefined", "symbol", "boolean"];
    let copy = null;
    if (Object.prototype.toString.call(target) === "[object Array]") {
        copy = [];
        target.forEach(ele => {
            if (baseTypes.includes(typeof ele) || ele === null || (ele instanceof RegExp)) {
                copy.push(ele);
            } else {
                copy.push(deepClone(ele));
            }
        });
    }
    if (Object.prototype.toString.call(target) === "[object Object]") {
        copy = {};
        Object.keys(target).forEach(key => {
            if (baseTypes.includes(typeof target[key]) || target[key] === null || (target[key] instanceof RegExp)) {
                copy[key] = target[key];
            } else {
                copy[key] = deepClone(target[key]);
            }
        });
    }
    return copy;
}