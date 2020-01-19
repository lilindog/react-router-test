/**
 * user 全局状态 
 */

import storage from "../../utils/storage";

let user = storage.get("user");

export default function (state = user, {type, playload}) {
    switch (type) {
        case "user/SET_USER":
            storage.set("user", playload);
            user = storage.get("user");
            return user;
        break;
        case "user/DEL_USER":
            storage.del("user");
            user = storage.get("user");
            return user || null;
        break;
        default:
            return user || null;
    }
}