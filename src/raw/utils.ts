import type {Data, DataZone} from "../types";
import type {DataRaw} from "./types";
import {DataClassifications, DataPrefectures} from "../types";

export function deprecated(data: Data<DataPrefectures | DataClassifications>, flag: string) {
    Object.entries(data).forEach(([province, {name, short, children}]) => {
        if (!data[province].deprecated) {
            data[province].deprecated = flag;
        }
        Object.entries(children).forEach(([prefecture, {name, short, children}]) => {
            if (!data[province].children[prefecture].deprecated) {
                data[province].children[prefecture].deprecated = flag;
            }
            Object.entries(children).forEach(([county, {name, short}]) => {
                if (!data[province].children[prefecture].children[county].deprecated) {
                    data[province].children[prefecture].children[county].deprecated = flag;
                }
            })
        })
    })
}

export function update(data: Data<DataPrefectures | DataClassifications>, newData: DataRaw, flag: string) {
    deprecated(data, flag);
    Object.entries(newData).forEach(([province, {name, short, children}]) => {
        if (!data[province]) {
            data[province] = {
                name: name,
                short: short,
                deprecated: null,
                children: {},
            }
        } else {
            data[province].name = name;
            data[province].short = short;
            data[province].deprecated = null;
        }
        Object.entries(children).forEach(([prefecture, {name, short, children}]) => {
            if (!data[province].children[prefecture]) {
                data[province].children[prefecture] = {
                    name: name,
                    short: short,
                    deprecated: null,
                    children: {},
                }
            } else {
                data[province].children[prefecture].name = name;
                data[province].children[prefecture].short = short;
                data[province].children[prefecture].deprecated = null;
            }
            Object.entries(children).forEach(([county, {name, short, parent}]) => {
                if (!data[province].children[prefecture].children[county]) {
                    data[province].children[prefecture].children[county] = {
                        name: name,
                        short: short,
                        deprecated: null,
                        ... parent && {parent: parent},
                    }
                } else {
                    data[province].children[prefecture].children[county].name = name;
                    data[province].children[prefecture].children[county].short = short;
                    data[province].children[prefecture].children[county].deprecated = null;
                    if (parent)
                        (data[province].children[prefecture].children[county] as DataZone).parent = parent;
                }
            })
        })
    })
}

export function short_province(value: string) {
    const rule = /^(.{2,3}?)(省|市|(?:壮族|回族|维吾尔)?自治区|特别行政区)$/;
    const short_name = rule.exec(value);
    if (short_name) {
        return short_name[1];
    } else {
        return "TODO";
    }
}

export function short_prefecture(value: string) {
    const rule = /^(.{0,4}?)(?:(?:(?:各|壮|满|回|苗|彝|藏|侗|瑶|白|黎|傣|畲|水|佤|羌|土|怒)族|(?:维吾尔|土家|蒙古|布依|朝鲜|哈尼|哈萨克|傈僳|仡佬|东乡|高山|拉祜|纳西|仫佬|锡伯|柯尔克孜|达斡尔|景颇|毛南|撒拉|布朗|塔吉克|阿昌|普米|鄂温克|基诺|德昂|保安|俄罗斯|裕固|乌孜别克|门巴|鄂伦春|独龙|塔塔尔|赫哲|珞巴)族?)*)?((?:自治)?(?:市|地区|林区|行政区|盟|州))$/;
    const short_name = rule.exec(value);
    if (short_name) {
        return [short_name[1], short_name[2]];
    } else {
        return ["TODO", "TODO"];
    }
}

export function short_county(value: string, province: string, prefecture: string | null) {
    const rule = /^(.{0,6}?)(?:(?:(?:各|壮|满|回|苗|彝|藏|侗|瑶|白|黎|傣|畲|水|佤|羌|土|怒)族|(?:维吾尔|土家|蒙古|布依|朝鲜|哈尼|哈萨克|傈僳|仡佬|东乡|高山|拉祜|纳西|仫佬|锡伯|柯尔克孜|达斡尔|景颇|毛南|撒拉|布朗|塔吉克|阿昌|普米|鄂温克|基诺|德昂|保安|俄罗斯|裕固|乌孜别克|门巴|鄂伦春|独龙|塔塔尔|赫哲|珞巴)族?)*)?((?:自治)?(?:县|镇|市|(?:工农|矿|林|市|新|回族|达斡尔族)?区|(?:前|中|后)*(?:联合)?旗))$/;
    const short_name = rule.exec(value);
    if (short_name) {
        if (value.endsWith('旗')) {
            return [null, short_name[2]];
        } else if (short_name[1].length === 0){ // 无名
            if (value === short_name[2]) { // 真无名
                return [short_name[2], '']
            } else if (value.endsWith(short_name[2])) { // 有中缀
                let short = value.slice(0, value.length-short_name[2].length)
                if (short.endsWith("族")) {
                    short = short.slice(0, short.length-1);
                }
                return [short, short_name[2]]
            } else {
                return ["TODO", short_name[2]];
            }
        } else if (short_name[1].length === 1){ // 单名
            if (short_name[2] === '林区') {
                return [short_name[1] + '林', '区'];
            } else if (short_name[2] === '新区') {
                return [short_name[1] + '新', '区'];
            } else {
                return [short_name[1] + short_name[2], short_name[2]];
            }
        } else if (short_name[1] === province || short_name[1] === prefecture) { // 与上级重名
            return [short_name[1] + short_name[2], short_name[2]];
        } else {
            return [short_name[1], short_name[2]];
        }
    } else if (value === '井冈山') {
        return [value, '管理局'];
    } else {
        return ["TODO", "TODO"];
    }
}

export function short_zone(value: string) {
    const rule = /^(.{0,13}?)(?:航空|航天|农业)?(?:经济|新|高新|高)?(?:技术)?(?:产业|工业)?(开发|园|示范|台商投资)区$/;
    const short_name = rule.exec(value);
    if (short_name) {
        return [short_name[1], short_name[2]];
    } else {
        return ["TODO", "TODO"];
    }
}
