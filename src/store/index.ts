import { createStore, combineReducers } from "redux";

/**
 * ！！！
 * 
 * 1. 注意， 在定义reducer时候， action type必须使用类似命名空间的定义方式。
 *    如： user 下的 SET_USER 动作， 请使用 user/SET_USER 这样的方式来定义。
 * 
 * 2. 在reducer中，必须要有一个默认返回值，可以为null， 但不能为undefined。 因为初始化的时候需要这个默认返回值。
 */

/**
 * 信息状态 
 */
import message from "./reducer/message";

/**
 * user信息 
 */
import user from "./reducer/user";

export default createStore(combineReducers({
    message,
    user
}));