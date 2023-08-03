import assert from "assert";

export type Data = {
    [key: string]: {
        name: string,
        short: string,
        children: {
            [key: string]: {
                name: string,
                short: string | null,
                suffix?: string | null,
                children: {
                    [key: string]: {
                        name: string,
                        short: string | null,
                        suffix?: string | null,
                    },
                },
            },
        },
    },
}

function check_unique(array: [string, string | null][]) {
    const t = array.map(v => v[1]);
    for (let i = 0; i < t.length; i++) {
        if (t[i] !== null) {
            const p1 = t.indexOf(t[i])
            const p2 = t.lastIndexOf(t[i])
            if (p1 !== p2) {
                return [array[p1][0], array[p2][0]];
            }
        }
    }
    return null;
}

function short_province(value: string) {
    const rule = /^(.{2,3}?)(省|市|(?:壮族|回族|维吾尔)?自治区|特别行政区)$/;
    const short_name = rule.exec(value);
    if (short_name) {
        return short_name[1];
    } else {
        return "TODO";
    }
}

function short_prefecture(value: string) {
    const rule = /^(.{0,4}?)(?:(?:(?:各|壮|满|回|苗|彝|藏|侗|瑶|白|黎|傣|畲|水|佤|羌|土|怒)族|(?:维吾尔|土家|蒙古|布依|朝鲜|哈尼|哈萨克|傈僳|仡佬|东乡|高山|拉祜|纳西|仫佬|锡伯|柯尔克孜|达斡尔|景颇|毛南|撒拉|布朗|塔吉克|阿昌|普米|鄂温克|基诺|德昂|保安|俄罗斯|裕固|乌孜别克|门巴|鄂伦春|独龙|塔塔尔|赫哲|珞巴)族?)*)?((?:自治)?(?:市|地区|林区|行政区|盟|州))$/;
    const short_name = rule.exec(value);
    if (short_name) {
        return [short_name[1], short_name[2]];
    } else {
        return ["TODO", "TODO"];
    }
}

function short_county(value: string, province: string, prefecture: string | null) {
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

export const handle = (raw : string) => {
    const rule = /^([0-9]{2})([0-9]{2})([0-9]{2})\t(.+?)$/;

    const data: Data = {};

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
                        short: null,
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
                            || (result[0] === "万县区" || result[0] === "万州区")
                            , `${result}`)
                        data[result[1]].children[result[2]] = {
                            name: '市辖区',
                            short: null,
                            suffix: null,
                            children: {},
                        }
                    } else if (result[2] == '02') {
                        assert(
                            (result[0] === "昌平县" || result[0] === "大兴县" || result[0] === "密云县")
                            || (result[0] === "宁河县" || result[0] === "蓟县")
                            || (result[0] === "上海县" || result[0] === "南汇县" || result[0] === "崇明县")
                            || (result[0] === "长寿县" || result[0] === "綦江县" || result[0] === "潼南县" || result[0] === "梁平县")
                            , `${result}`)
                        data[result[1]].children[result[2]] = {
                            name: '县',
                            short: null,
                            suffix: null,
                            children: {},
                        }
                    } else if (result[2] == '03') {
                        assert(result[0] === "江津市", `${result}`)
                        data[result[1]].children[result[2]] = {
                            name: '县级市',
                            short: null,
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
                            short: null,
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
                            short: null,
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
                            short: null,
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
