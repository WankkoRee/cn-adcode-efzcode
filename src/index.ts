import untypedData from './data/GB_T_2260.json'
import {Data, DataCounty, DataPrefecture, DataProvince} from "./raw/utils";

const data: Data<boolean> = untypedData;

export const get = (code: string, deprecated: boolean = true): [
    DataProvince<boolean> | null,
    DataPrefecture<boolean> | null,
    DataCounty<boolean> | null,
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
