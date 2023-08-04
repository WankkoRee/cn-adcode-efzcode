import untypedData from './data/GB_T_2260.json'
import {DataMini, DataMiniPrefecture,  DataMiniProvince, DataMiniCounty} from './raw/raw'

const data: DataMini = untypedData;

export const get = (code: string, deprecated: boolean = true): [
    DataMiniProvince | null,
    DataMiniPrefecture | null,
    DataMiniCounty | null,
] => {
    if (code.length >= 2) {
        const province = data[code.substring(0, 2)];
        if (province && (!deprecated && !province.deprecated || deprecated)) {
            if (code.length == 4 || code.length == 6) { // adcode
                const prefecture = province.children[code.substring(2, 4)];
                if (prefecture && (!deprecated && !prefecture.deprecated || deprecated)) {
                    if (code.length == 6) {
                        const county = prefecture.children[code.substring(4, 6)];
                        if (county && (!deprecated && !county.deprecated || deprecated)) {
                            return [
                                province,
                                prefecture,
                                county,
                            ]
                        }
                    }
                    return [
                        province,
                        prefecture,
                        null,
                    ]
                }
            } else if (code.length == 5 || code.length == 8) { // efzcode
                // todo
            }
            return [
                province,
                null,
                null,
            ]
        }
    }
    return [
        null,
        null,
        null,
    ];
}

export default {
    get,
}
