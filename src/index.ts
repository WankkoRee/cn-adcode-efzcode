import { Map as ImmutableMap } from 'immutable'

import untypedData from './data/data.json'
import type {Data, DataCounty, DataPrefecture, DataProvince} from "./types";

const data = ImmutableMap(Object.fromEntries(Object.entries(untypedData as Data).map(
    ([code, data]) =>
        [code, new Prefecture(code, data, this)]
)));

const codeRule = /^(\d{2})(?:(\d{2})?(\d{2})?|(\d{3})?(\d{3})?|(\d{2})(\d{3})(\d{3}))$/;

class Region {
    private readonly level: 1 | 2 | 3;
    private readonly code: string;
    private readonly name: string;
    private readonly short: string | null;
    private readonly deprecated: string | null;

    constructor(level: 1 | 2 | 3, code: string, name: string, short: string | null, deprecated: string | null) {
        this.level = level;
        this.code = code;
        this.name = name;
        this.short = short;
        this.deprecated = deprecated;
    }

    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    getShortName() {
        return this.short;
    }
    isDeprecated() {
        return !!this.deprecated;
    }
}

class County extends Region {
    private readonly parent: Prefecture;

    constructor(code: string, data: DataCounty, parent: Prefecture) {
        super(3, code, data.name, data.short, data.deprecated);
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }
}

class Prefecture extends Region {
    private readonly children: ImmutableMap<string, County>;
    private readonly parent: Province;

    constructor(code: string, data: DataPrefecture, parent: Province) {
        super(2, code, data.name, data.short, data.deprecated);
        this.parent = parent;
        this.children = ImmutableMap(Object.fromEntries(Object.entries(data.children).map(
            ([code, data]) =>
                [code, new County(code, data, this)]
        )));
    }

    getChildren() {
        return this.children;
    }
    getParent() {
        return this.parent;
    }
}

class Province extends Region {
    private readonly children: ImmutableMap<string, Prefecture>;

    constructor(code: string, data: DataProvince) {
        super(1, code, data.name, data.short, data.deprecated);
        this.children = ImmutableMap(Object.fromEntries(Object.entries(data.children).map(
            ([code, data]) =>
                [code, new Prefecture(code, data, this)]
        )));
    }

    getChildren() {
        return this.children;
    }
}



export const getWithDeprecated = (code: string): [
        DataProvince<boolean> | null,
        DataPrefecture<boolean> | null,
        DataCounty<boolean> | null,
] => {
    const result = codeRule.exec(code);
    let province: DataProvince<boolean> | null = null;
    let prefecture: DataPrefecture<boolean> | null = null;
    let county: DataCounty<boolean> | null = null;
    if (result) {
        if (result[1]) {
            province = dataDeprecated[result[1]] ?? null;
            if (province) {
                if (result[2]) {
                    prefecture = province.children[result[2]] ?? null;
                } else if (result[4]) {
                    prefecture = province.children[result[4]] ?? null;
                } else if (result[7]) {
                    prefecture = province.children[result[7]] ?? null;
                }
                if (prefecture) {
                    if (result[3]) {
                        county = prefecture.children[result[3]] ?? null;
                    } else if (result[5]) {
                        county = prefecture.children[result[5]] ?? null;
                    } else if (result[8]) {
                        county = prefecture.children[result[8]] ?? null;
                    }
                }
                if (result[6]) {
                    prefecture = province.children[result[6]] ?? null;
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
    const result = codeRule.exec(code);
    let province: DataProvince<undefined> | null = null;
    let prefecture: DataPrefecture<undefined> | null = null;
    let county: DataCounty<undefined> | null = null;
    if (result) {
        if (result[1]) {
            province = dataNow[result[1]] ?? null;
            if (province) {
                if (result[2]) {
                    prefecture = province.children[result[2]] ?? null;
                } else if (result[4]) {
                    prefecture = province.children[result[4]] ?? null;
                } else if (result[7]) {
                    prefecture = province.children[result[7]] ?? null;
                }
                if (prefecture) {
                    if (result[3]) {
                        county = prefecture.children[result[3]] ?? null;
                    } else if (result[5]) {
                        county = prefecture.children[result[5]] ?? null;
                    } else if (result[8]) {
                        county = prefecture.children[result[8]] ?? null;
                    }
                }
                if (result[6]) {
                    prefecture = province.children[result[6]] ?? null;
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

export function list () {
    return data;
}

export default {
    get,
    list,
}
