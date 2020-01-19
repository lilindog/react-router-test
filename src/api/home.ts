import request from '../utils/request';
import request2 from "../utils/request2";
import { useDevAgentId } from "../utils/utils";

/**
 * 充电柜二维码扫描请求接口 
 */
export function qrcodeScan (data: any): any {
    return request2({
        url: "/qrcode/chargingBox/scan",
        method: "POST",
        data
    });
}