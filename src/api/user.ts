/*
 * @Author: hua
 * @Date: 2019-12-23 10:26:09
 * @description: 
 * @LastEditors  : hua
 * @LastEditTime : 2019-12-23 13:30:20
 */

import request from '../utils/request';
import { useDevAgentId } from "../utils/utils";

//获取微信公众号授权跳转地址
export function getWxAuthUrl(data) {
    useDevAgentId(data);
    return request({
        url: '/account/weixinJSOAuth/getAuthUrl',
        method: 'get',
        params: data
    })
}

//微信授权
export function weixinJSOAuth(data) {
    useDevAgentId(data);
    return request({
        url: '/account/weixinJSOAuth/auth',
        method: 'post',
        data: data
    });
}

//获取wxjssdk config
export function getSdkConfig (weixinAccountId: string): any {
    const data = {
        weixinAccountId,
        url: location.href
    }
    return request({
        url: "/weixin/jssdk/getConfig",
        method: "GET",
        params: data
    });
}

//发送绑定手机验证码
export function sendCaptcha (data: any): any {
    useDevAgentId(data);
    return request({
        url: "/account/OAuthBind/sendSms",
        method: "POST",
        data
    });
}

//绑定手机号
export function bindPhone (data: any): any {
    useDevAgentId(data);
    return request({
        url: "/account/OAuthBind/bind",
        method: "POST",
        data
    });
}