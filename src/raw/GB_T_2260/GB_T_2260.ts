import assert from "assert";
import type {DataRaw} from "../types";
import {short_county, short_prefecture, short_province} from "../utils.js";

function check_unique(array: [string, string | null][]) {
    const t = array.map(v => v[1]);
    for (let i = 0; i < t.length; i++) {
        if (t[i] !== null && t[i] !== '') {
            const p1 = t.indexOf(t[i])
            const p2 = t.lastIndexOf(t[i])
            if (p1 !== p2) {
                return [array[p1][0], array[p2][0]];
            }
        }
    }
    return null;
}

export const handle = (raw : string) => {
    const rule = /^([0-9]{2})([0-9]{2})([0-9]{2})\t(.+?)$/;

    const data: DataRaw = {};

    raw.split('\n').filter(v => {
        return v.length;
    }).map(v => {
        const result = rule.exec(v);
        if (!result) throw `"${v}" 无法匹配规则`;
        return [result[4], result[1], result[2], result[3]];
    }).sort((v1, v2) => {
        if (v1[1] > v2[1]) {
            return 1;
        } else if (v1[1] < v2[1]) {
            return -1;
        } else {
            if (v1[2] > v2[2]) {
                return 1;
            } else if (v1[2] < v2[2]) {
                return -1;
            } else {
                if (v1[3] > v2[3]) {
                    return 1;
                } else if (v1[3] < v2[3]) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }).forEach(result => {
        if (result[2] === '00' && result[3] === '00') { // 省级行政区
            data[result[1]] = {
                name: result[0],
                short: short_province(result[0]),
                children: {},
            }
        } else if (result[3] === '00') { // 地级行政区
            const [short, suffix] = short_prefecture(result[0]);
            data[result[1]].children[result[2]] = {
                name: result[0],
                short: short,
                suffix: suffix,
                children: {},
            }
        } else { // 县级行政区
            if (!Object.keys(data[result[1]].children).includes(result[2])) {
                if (result[2] === '90') {
                    data[result[1]].children[result[2]] = {
                        name: '省辖县',
                        short: '',
                        suffix: null,
                        children: {},
                    }
                } else if (result[1] === '23') {
                    if (result[2] == '11') {
                        assert(result[0] === "绥芬河市", `${result}`)
                        const [short, suffix] = short_prefecture('绥芬河市');
                        data[result[1]].children[result[2]] = {
                            name: '绥芬河市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '11' || result[1] === '12' || result[1] === '31' || result[1] === '50') {
                    if (result[2] == '01') {
                        assert(
                            result[0] === "东城区"
                            || result[0] === "和平区"
                            || result[0] === "黄浦区"
                            || (
                                result[0] === "万县区"
                                || result[0] === "万州区"
                            )
                            , `${result}`)
                        data[result[1]].children[result[2]] = {
                            name: '市辖区',
                            short: '',
                            suffix: null,
                            children: {},
                        }
                    } else if (result[2] == '02') {
                        assert(
                            (
                                result[0] === "昌平县"
                                || result[0] === "大兴县"
                                || result[0] === "密云县"
                            ) || (
                                result[0] === "宁河县"
                                || result[0] === "蓟县"
                            ) || (
                                result[0] === "上海县"
                                || result[0] === "南汇县"
                                || result[0] === "崇明县"
                            ) || (
                                result[0] === "长寿县"
                                || result[0] === "綦江县"
                                || result[0] === "潼南县"
                                || result[0] === "梁平县"
                                || result[0] === "城口县"
                            )
                            , `${result}`)
                        data[result[1]].children[result[2]] = {
                            name: '县',
                            short: '',
                            suffix: null,
                            children: {},
                        }
                    } else if (result[2] == '03') {
                        assert(result[0] === "江津市", `${result}`)
                        data[result[1]].children[result[2]] = {
                            name: '县级市',
                            short: '',
                            suffix: null,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '32') {
                    if (result[2] == '12') {
                        assert(result[0] === "泰州市", `${result}`)
                        const [short, suffix] = short_prefecture('泰州市');
                        data[result[1]].children[result[2]] = {
                            name: '泰州市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else if (result[2] == '13') {
                        assert(result[0] === "常熟市", `${result}`)
                        const [short, suffix] = short_prefecture('常熟市');
                        data[result[1]].children[result[2]] = {
                            name: '常熟市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '34') {
                    if (result[2] == '09') {
                        assert(result[0] === "黄山市", `${result}`)
                        const [short, suffix] = short_prefecture('黄山市');
                        data[result[1]].children[result[2]] = {
                            name: '黄山市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '35') {
                    if (result[2] == '05') {
                        assert(result[0] === "永安市", `${result}`)
                        const [short, suffix] = short_prefecture('永安市');
                        data[result[1]].children[result[2]] = {
                            name: '永安市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '36') {
                    if (result[2] == '05') {
                        assert(result[0] === "井冈山", `${result}`)
                        data[result[1]].children[result[2]] = {
                            name: '管理局',
                            short: '',
                            suffix: null,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '37') {
                    if (result[2] == '09') {
                        assert(result[0] === "威海市", `${result}`)
                        const [short, suffix] = short_prefecture('威海市');
                        data[result[1]].children[result[2]] = {
                            name: '威海市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '41') {
                    if (result[2] == '21') {
                        assert(result[0] === "安阳市", `${result}`)
                        const [short, suffix] = short_prefecture('安阳市');
                        data[result[1]].children[result[2]] = {
                            name: '安阳市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '42') {
                    if (result[2] == '09') {
                        assert(result[0] === "随州市", `${result}`)
                        const [short, suffix] = short_prefecture('随州市');
                        data[result[1]].children[result[2]] = {
                            name: '随州市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else if (result[2] == '10') {
                        assert(result[0] === "老河口市", `${result}`)
                        const [short, suffix] = short_prefecture('老河口市');
                        data[result[1]].children[result[2]] = {
                            name: '老河口市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else if (result[2] == '29') {
                        assert(result[0] === "神农架林区", `${result}`)
                        const [short, suffix] = short_prefecture('神农架林区');
                        data[result[1]].children[result[2]] = {
                            name: '神农架林区',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '44') {
                    if (result[2] == '10') {
                        assert(result[0] === "潮州市", `${result}`)
                        const [short, suffix] = short_prefecture('潮州市');
                        data[result[1]].children[result[2]] = {
                            name: '潮州市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '46') {
                    if (result[2] == '00') {
                        data[result[1]].children[result[2]] = {
                            name: '省辖县',
                            short: '',
                            suffix: null,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '61') {
                    if (result[2] == '04') {
                        assert(result[0] === "咸阳市", `${result}`)
                        const [short, suffix] = short_prefecture('咸阳市');
                        data[result[1]].children[result[2]] = {
                            name: '咸阳市',
                            short: short,
                            suffix: suffix,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else if (result[1] === '63') {
                    if (result[2] == '24') {
                        assert(result[0] === "河南蒙古族自治县", `${result}`)
                        data[result[1]].children[result[2]] = {
                            name: '省辖县',
                            short: '',
                            suffix: null,
                            children: {},
                        }
                    } else {
                        throw `${result} 无地级数据`
                    }
                } else {
                    throw `${result} 无地级数据`
                }
            }
            const [short, suffix] = short_county(result[0], data[result[1]].short, data[result[1]].children[result[2]].short)
            data[result[1]].children[result[2]].children[result[3]] = {
                name: result[0],
                short: short,
                suffix: suffix,
            }
        }
    });

    for (let province; province = check_unique(Object.keys(data).map((province) => {
        for (let prefecture; prefecture = check_unique(Object.keys(data[province].children).map((prefecture) => {
            for (let county; county = check_unique(Object.keys(data[province].children[prefecture].children).map((county) => {
                return [county, data[province].children[prefecture].children[county].short];
            })), county != null;) {
                if (!data[province].children[prefecture].children[county[0]].short!.endsWith(data[province].children[prefecture].children[county[0]].suffix!)) {
                    data[province].children[prefecture].children[county[0]].short = data[province].children[prefecture].children[county[0]].short! + data[province].children[prefecture].children[county[0]].suffix!;
                }
                if (!data[province].children[prefecture].children[county[1]].short!.endsWith(data[province].children[prefecture].children[county[1]].suffix!)) {
                    data[province].children[prefecture].children[county[1]].short = data[province].children[prefecture].children[county[1]].short! + data[province].children[prefecture].children[county[1]].suffix!;
                }
            }
            return [prefecture, data[province].children[prefecture].short];
        })), prefecture != null;) {
            if (!data[province].children[prefecture[0]].short!.endsWith(data[province].children[prefecture[0]].suffix!)) {
                data[province].children[prefecture[0]].short = data[province].children[prefecture[0]].short! + data[province].children[prefecture[0]].suffix!;
            }
            if (!data[province].children[prefecture[1]].short!.endsWith(data[province].children[prefecture[1]].suffix!)) {
                data[province].children[prefecture[1]].short = data[province].children[prefecture[1]].short! + data[province].children[prefecture[1]].suffix!;
            }
        }
        return [province, data[province].short];
    })), province != null;) {
        throw `${data[province[0]].short} 重复`;
    }

    Object.keys(data).forEach(province => {
        Object.keys(data[province].children).forEach(prefecture => {
            delete data[province].children[prefecture].suffix;
            Object.keys(data[province].children[prefecture].children).forEach(county => {
                delete data[province].children[prefecture].children[county].suffix;
            })
        })
    })

    return data;
}
