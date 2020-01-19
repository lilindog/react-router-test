"use strict"

/**
 * 存储类， 来这里统一声明key， 方便统一管理 
 */

import keys from "./keys";

class Storage {

	constructor () {
		this._types1 = [Number, String, Boolean];
		this._types2 = [Object, Array];
		this._allowTypes = [...this._types1, ...this._types2];
		Object.keys(keys).forEach(key => {
			let item = keys[key];
			if (!this._allowTypes.includes(item)) {
				this._throw(`${key} 野鸡类型，请定义合法范围的类型！`);
			}
		});
		this._keys = keys;
	}

	/**
	 * 获取key的值
	 * 
	 * @param {String}  key
	 * @return {*}
	 */
	get (key) {
		if (this._keys[key]) {
			const res = localStorage.getItem(key);
			if (!res) return;
			try {
				return JSON.parse(res);
			} catch(err) {
				this._throw(err);
			}
		} else {
			this._throw(`get "${key}" 野鸡key！`);
		}
	}

	/**
	 * 设置key
	 * 
	 * @param {String}  key
	 * @param {*} value
	 */
	set (key, value) {
		if (this._keys[key]) {	
			this._checkType(key, value);
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch(err) {
				this._throw(err);
			}
		} else {
			this._throw(`set "${key}" 野鸡key！`);
		}
	}

	/**
	 * 检查key是否存在
	 */
	has () {
		if (this._keys[key]) {
			if (localStorage.getItem(key)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	/**
	 * 删除指定key 
	 */
	del (key) {
		if (this._keys[key]) {
			localStorage.removeItem(key);
		} else {
			this._throw(`del "${key}" 野鸡key！`);
		}
	}

	/**
	 * 清空左右声明的key 
	 */
	clear () {
		this._keys.forEach(key => {
			localStorage.removeItem(key);
		});
	}

	/**
	 * 校验类型
	 * 不合法报错，合法不做反应
	 * 
	 * @param {String} key
	 * @param {*} value 
	 */
	_checkType (key, value) {
		const type = this._keys[key];
		if (this._types1.includes(type)) {
			if (typeof value !== type.name.toLowerCase()) this._throw(`${key} 类型错误！`);
		}
		if (this._types2.includes(type)) {
			if (!(value instanceof type)) this._throw(`${key} 类型错误！`);
		}
	}

	/**
	 * 抛错
	 * 
	 * @param {String} str
	 */
	_throw (str) {
		if (!str) return;
		throw new Error(`[Storage 报错]：${str}`);
	}
}

export default new Storage;