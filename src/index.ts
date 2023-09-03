import { Map as ImmutableMap } from 'immutable'

import untypedData from './data/data.json'
import type {
    Data,
    DataProvince,
    DataPrefectures, DataClassifications, DataPrefecture, DataClassification,
    DataCounty, DataZone,
} from "./types";

function paddingLeft(s: string, l: number, c: string) {
    if (l - s.length <= 0) return s;
    return c.charAt(0).repeat(l - s.length) + s;
}

class Region {
    private readonly level: 0 | 1 | 2 | 3;
    private readonly codeS: string;
    private readonly codeI: number;
    private readonly name: string;
    private readonly short: string | null;
    private readonly deprecated: string | null;
    private readonly ended: boolean;

    constructor(level: 0 | 1 | 2 | 3, code: string, name: string, short: string | null, deprecated: string | null, ended: boolean) {
        this.level = level;
        this.codeS = code;
        this.codeI = Number(code);
        this.name = name;
        this.short = short;
        this.deprecated = deprecated;
        this.ended = ended;
    }

    getLevel() {
        return this.level;
    }
    getCodeString(): string {
        return this.codeS;
    }
    getCodeInteger(): number {
        return this.codeI;
    }
    getName() {
        return this.name;
    }
    getShortName() {
        return this.short ?? this.name;
    }
    isDeprecated() {
        return !!this.deprecated;
    }
    isEnded() {
        return this.ended;
    }
}

export class County extends Region {
    private readonly parent: Prefecture;

    constructor(code: string, data: DataCounty | DataZone, parent: Prefecture) {
        super(3, code, data.name, data.short, data.deprecated, data.ended);
        this.parent = parent;
    }

    getFullCodeString(): string {
        return this.getParent().getFullCodeString() + this.getCodeString();
    }
    getFullCodeInteger(): number {
        return Number(this.getFullCodeString());
    }

    getFullName(separator: string = ' '): string {
        return this.getParent().getFullName(separator) + separator + this.getName();
    }
    getFullShortName(separator: string = ' '): string {
        return this.getParent().getFullShortName(separator) + separator + this.getShortName();
    }

    getParent() {
        return this.parent;
    }
}

export class Prefecture extends Region {
    private readonly children: ImmutableMap<string, County>;
    private readonly childrenNotDeprecated: ImmutableMap<string, County>;
    private readonly parent: Province;

    constructor(code: string, data: DataPrefecture | DataClassification, parent: Province) {
        super(2, code, data.name, data.short, data.deprecated, data.ended);
        this.parent = parent;
        this.children = ImmutableMap(Object.entries(data.children).map(
            ([code, data]) =>
                [code, new County(code, data, this)]
        )).sort((a, b) =>
            a.getCodeInteger() > b.getCodeInteger() ? 1 : a.getCodeInteger() < b.getCodeInteger() ? -1 : 0
        );
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    getFullCodeString(): string {
        return this.getParent().getFullCodeString() + this.getCodeString();
    }
    getFullCodeInteger(): number {
        return Number(this.getFullCodeString());
    }

    getFullName(separator: string = ' '): string {
        return this.getParent().getFullName(separator) + separator + this.getName();
    }
    getFullShortName(separator: string = ' '): string {
        return this.getParent().getFullShortName(separator) + separator + this.getShortName();
    }

    listChildren(includeDeprecated: boolean = false) {
        return this.getChildren(includeDeprecated).toIndexedSeq().toArray();
    }
    private getChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getParent() {
        return this.parent;
    }
    getChild(code: string | number, couldBeDeprecated: boolean = true): County | null {
        if (typeof code === "string") {
            if (code.length === 2 || code.length === 6) {
                return this.getChildren(couldBeDeprecated).get(code) ?? null;
            }
            throw `县级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2 && ${code.length} != 6`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99 || 100000 <= code && code <= 299999) {
                    return this.getChildren(couldBeDeprecated).get(paddingLeft(String(code), 2, '0')) ?? this.getChildren(couldBeDeprecated).get(paddingLeft(String(code), 6, '0')) ?? null;
                }
                throw `县级行政区代码 ${code} 不符合预期: (0 > ${code} || ${code} > 99) && (100000 > ${code} || ${code} > 299999)`;
            }
            throw `县级行政区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `县级行政区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
}

export class Province extends Region {
    private readonly children: ImmutableMap<string, Prefecture>;
    private readonly childrenNotDeprecated: ImmutableMap<string, Prefecture>;

    constructor(code: string, data: DataProvince<DataPrefectures | DataClassifications>) {
        super(1, code, data.name, data.short, data.deprecated, data.ended);
        this.children = ImmutableMap(Object.entries(data.children).map(
            ([code, data]) =>
                [code, new Prefecture(code, data, this)]
        )).sort((a, b) =>
            a.getCodeInteger() > b.getCodeInteger() ? 1 : a.getCodeInteger() < b.getCodeInteger() ? -1 : 0
        );
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    getFullCodeString(): string {
        return this.getCodeString();
    }
    getFullCodeInteger(): number {
        return this.getCodeInteger();
    }

    getFullName(_: string = ' '): string {
            return this.getName();
    }
    getFullShortName(_: string = ' '): string {
            return this.getShortName();
    }

    listChildren(includeDeprecated: boolean = false) {
        return this.getChildren(includeDeprecated).toIndexedSeq().toArray();
    }
    private getChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getChild(code: string | number, couldBeDeprecated: boolean = true): Prefecture | null {
        if (typeof code === "string") {
            if (code.length === 2 || code.length === 4) {
                return this.getChildren(couldBeDeprecated).get(code) ?? null;
            }
            throw `地级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2 && ${code.length} != 4`;
        } else if (typeof code === "number") {
            if (0 <= code && code <= 99 || 100 <= code && code <= 9999) {
                return this.getChildren(couldBeDeprecated).get(paddingLeft(String(code), 2, '0')) ?? this.getChildren(couldBeDeprecated).get(paddingLeft(String(code), 4, '0')) ?? null;
            }
            throw `地级行政区代码 ${code} 不符合预期: (0 > ${code} || ${code} > 99) && (100 > ${code} || ${code} > 9999)`;
        }
        throw `地级行政区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`;
    }
}

class China extends Region {
    private readonly children: ImmutableMap<string, Province>;
    private readonly childrenNotDeprecated: ImmutableMap<string, Province>;

    constructor(data: Data<DataPrefectures | DataClassifications>) {
        super(0, "", "中华人民共和国", "中国", null, false);
        this.children = ImmutableMap(Object.entries(data).map(
            ([code, data]) =>
                [code, new Province(code, data)]
        )).sort((a, b) =>
            a.getCodeInteger() > b.getCodeInteger() ? 1 : a.getCodeInteger() < b.getCodeInteger() ? -1 : 0
        );
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    listChildren(includeDeprecated: boolean = false) {
        return this.getChildren(includeDeprecated).toIndexedSeq().toArray();
    }
    private getChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getChild(code: string | number, couldBeDeprecated: boolean = true): Province | null {
        if (typeof code === "string") {
            if (code.length === 2) {
                return this.getChildren(couldBeDeprecated).get(code) ?? null;
            }
            throw `省级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.getChildren(couldBeDeprecated).get(paddingLeft(String(code), 2, '0')) ?? null;
                }
                throw `省级行政区代码 ${code} 不符合预期: 0 > ${code} || ${code} > 99`;
            }
            throw `省级行政区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `省级行政区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
}

export default new China(untypedData as Data<DataPrefectures | DataClassifications>);
