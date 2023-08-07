import untypedData from './data/data.json'
import type {Data, DataCounty, DataPrefecture, DataProvince} from "./types";

const data: Data<boolean> = untypedData;

export const get = (code: string, deprecated: boolean = true): [
    DataProvince<boolean> | null,
    DataPrefecture<boolean> | null,
    DataCounty<boolean> | null,
] => {
    const result = /^(\d{2})(?:(\d{2})?(\d{2})?|(\d{3})?(\d{3})?)$/.exec(code);
    let province: DataProvince<boolean> = null;
    let prefecture: DataPrefecture<boolean> = null;
    let county: DataCounty<boolean> = null;
    if (result) {
        if (result[1]) {
            province = data[result[1]];
            if (!province || (!deprecated && province.deprecated)) {
                province = null;
            }
            if (province) {
                if (result[2]) {
                    prefecture = province.children[result[2]];
                } else if (result[4]) {
                    prefecture = province.children[result[4]];
                }
                if (!prefecture || (!deprecated && prefecture.deprecated)) {
                    prefecture = null;
                }
                if (prefecture) {
                    if (result[3]) {
                        county = prefecture.children[result[3]];
                    }
                    if (result[5]) {
                        county = prefecture.children[result[5]];
                    }
                    if (!county || (!deprecated && county.deprecated)) {
                        county = null;
                    }
                }
            }
        }
    }
    return [
        province,
        prefecture,
        county,
    ];
}

export default {
    get,
}
