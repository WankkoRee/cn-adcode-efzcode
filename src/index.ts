import untypedDataDeprecated from './data/data.deprecated.json'
import untypedDataNow from './data/data.now.json'
import type {Data, DataCounty, DataPrefecture, DataProvince} from "./types";

const dataDeprecated: Data<boolean> = untypedDataDeprecated;
const dataNow: Data<undefined> = untypedDataNow;

export const getWithDeprecated = (code: string): [
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
            province = dataDeprecated[result[1]] ?? null;
            if (province) {
                if (result[2]) {
                    prefecture = province.children[result[2]] ?? null;
                } else if (result[4]) {
                    prefecture = province.children[result[4]] ?? null;
                }
                if (prefecture) {
                    if (result[3]) {
                        county = prefecture.children[result[3]] ?? null;
                    }
                    if (result[5]) {
                        county = prefecture.children[result[5]] ?? null;
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

export const getNotDeprecated = (code: string): [
    DataProvince<undefined> | null,
    DataPrefecture<undefined> | null,
    DataCounty<undefined> | null,
] => {
    const result = /^(\d{2})(?:(\d{2})?(\d{2})?|(\d{3})?(\d{3})?)$/.exec(code);
    let province: DataProvince<undefined> = null;
    let prefecture: DataPrefecture<undefined> = null;
    let county: DataCounty<undefined> = null;
    if (result) {
        if (result[1]) {
            province = dataNow[result[1]] ?? null;
            if (province) {
                if (result[2]) {
                    prefecture = province.children[result[2]] ?? null;
                } else if (result[4]) {
                    prefecture = province.children[result[4]] ?? null;
                }
                if (prefecture) {
                    if (result[3]) {
                        county = prefecture.children[result[3]] ?? null;
                    }
                    if (result[5]) {
                        county = prefecture.children[result[5]] ?? null;
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

export const listWithDeprecated = (): Data<boolean> => {
    return dataDeprecated;
}

export const listNotDeprecated = (): Data<undefined> => {
    return dataNow;

}

export default {
    getWithDeprecated,
    getNotDeprecated,
    listWithDeprecated,
    listNotDeprecated,
}
