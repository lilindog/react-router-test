/*
 * @Author: hua
 * @Date: 2019-12-09 07:24:50
 * @description: 
 * @LastEditors  : hua
 * @LastEditTime : 2019-12-23 13:39:27
 */
import md5 from 'md5';
import moment from 'moment';
import { parse } from 'querystring';
import { getSdkConfig, getWxAuthUrl, weixinJSOAuth } from "../api/user";
import store from "../store";

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// md5加密
export function md5Hash(value: string) {
  return md5(value);
}

// 格式化时间戳
export function formatTimestamp(val: any, format: string) {
  let f = 'YYYY-MM-DD HH:mm:ss';
  if (format) {
    f = format;
  }
  return moment.unix(val).format(f);
}

// 解析时间戳
export function parseTimestamp(val: any) {
  return moment.unix(val);
}

// 解析日期
export function parseDate(val: any) {
  return moment(val);
}

// 格式化日期
export function formatDate(val: any, format: string) {
  let f = 'YYYY-MM-DD HH:mm:ss';
  if (format) {
    f = format;
  }
  return moment(val).format(f);
}

export function isWeChart(){
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i).toString() == 'micromessenger'){
  　　return true;
  } else {
  　　return false;
  }
}


/**
 * 获取query指定字段 
 */
export function getQueryField(key:string, queryStr?:string): string {
  const params = new URLSearchParams(queryStr || location.search.slice(1));
  return params.get(key);
}

/**
 * 获取坐标（高德地图直接可用） 
 * 
 * @return {Array} [lng, lat]
 */
export async function getPosition () {
	// 获取微信位置
	const gps: number[] = await getWxPosition();
	// 转换微信获取的坐标
	const lnglat: number[] = await new Promise((resolve, reject) => {
		AMap.convertFrom(gps, "gps", (status, result) => {
			if (result.info === 'ok') {
				const {locations: [{lng, lat}]} = result;
				resolve([lng, lat]);
			} else {
				reject(result.info);
			}
		});
	});
	return lnglat;
}

/**
 * 获取微信坐标 
 * 
 * @return {Array} [lng, lat]
 */
export async function getWxPosition (type = "wgs84") {
	const lnglat: number[] = await new Promise((resolve, reject) => {
		wx.getLocation({
			type,
			success: res => resolve([res.longitude, res.latitude]),
			fail: err => reject(err)
		});
	});
	return lnglat;
}

/**
 * 扫码并返回结果
 * 
 * @return {String} 
 */
export async function scanCode () {
	const res: any = await new Promise((resolve, reject) => {
		wx.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: res => resolve(res),
			fail: err => reject(err)
		});
	});		
	return res;
}

/**
 * 调试模式下面使用env的agentid (打包环境会忽略)
 * 
 * @param {Object} data
 */
export function useDevAgentId (data) {
	if(_ENV_ && Reflect.has(_ENV_, "NODE_ENV") && _ENV_.NODE_ENV === "dev" && Reflect.has(_ENV_, "AGENTID")) {
        data['agentId'] = _ENV_.AGENTID;
    }
}

/**
 * 初始化wxsdk
 * 
 * @return {Promise} 
 */
export function initWxConfig () {
    return new Promise(async (resolve, reject) => {
        const {
            config: {
                timestamp,
                signature,
                nonceStr
            }
        } = await getSdkConfig("1");//临时传1
        wx.config({
            debug: !true, 
            appId: _ENV_.APP_ID, 
            timestamp: timestamp, 
            nonceStr: nonceStr, 
            signature: signature,
            jsApiList: [
                "getLocation",
                "openLocation",
                "scanQRCode",
            ] 
        });
        wx.ready(() => resolve());
        wx.error(err => reject(err));
    });
}

/**
 * 初始化登录 
 * 先看缓存里边的user信息，有则检测是否绑定手机， 没有则去绑定手机然后返回首页。
 * 如果缓存里边没有user信息，则获取query的code与state进行微信授权并持久化存储返回的user信息，若没有code、state,则发起授权，授权后带code、state跳回进行授权处理。
 * 
 * @return {Promise}
 */
export async function initLogin () {
    const user = store.getState().user;
    if (user)  {
        _WEBPACK_MODE_ === "development" && console.log(1);
        toBindPhone(user);
        return;
    }
    const code = getQueryField("code"), state = getQueryField("state");
    if(state && code){
        _WEBPACK_MODE_ === "development" && console.log(2);
        history.replaceState(null, null, "/");
        const res: any = await weixinJSOAuth({
            state, 
            code, 
            agentId: 1
        });
        store.dispatch({type: "user/SET_USER", playload: res});
        const user = store.getState().user;
        toBindPhone(user);
    } else {
        _WEBPACK_MODE_ === "development" && console.log(3);
        const res: any = await getWxAuthUrl({
            callbackUrl: "http://ChargingBox.wx.teny.tech",
            agentId: 1
		});
        window.location.href = res.url;
	}
	
	function toBindPhone (user: any) {
		//暂不强制绑定手机
		// if (!user.member) (this as any).props.history.push("/editPhone?title=绑定手机");
	}
}