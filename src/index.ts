import { Map as ImmutableMap } from 'immutable'

import untypedData from './data/data.json'
import type {Data, DataProvince, DataPrefecture, DataClassification, DataCounty, DataZone} from "./types";

class Region {
    private readonly level: 0 | 1 | 2 | 3;
    private readonly code: number;
    private readonly name: string;
    private readonly short: string | null;
    private readonly deprecated: string | null;

    constructor(level: 0 | 1 | 2 | 3, code: number, name: string, short: string | null, deprecated: string | null) {
        this.level = level;
        this.code = code;
        this.name = name;
        this.short = short;
        this.deprecated = deprecated;
    }

    getLevel() {
        return this.level;
    }
    getCode() {
        return this.code;
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
}

export class County extends Region {
    private readonly parent: Prefecture;

    constructor(code: number, data: DataCounty, parent: Prefecture) {
        super(3, code, data.name, data.short, data.deprecated);
        this.parent = parent;
    }

    getFullCode(): number {
        return this.getParent().getFullCode() * 100 + this.getCode();
    }

    getFullName(separator: string = ' '): string {
        if (this.getShortName() !== '') // 非需跳过层级 todo 待提取为属性
            return this.getParent().getFullName(separator) + separator + this.getName();
        else
            return this.getParent().getFullName(separator);
    }
    getFullShortName(separator: string = ' '): string {
        if (this.getShortName() !== '') // 非需跳过层级 todo 待提取为属性
            return this.getParent().getFullShortName(separator) + separator + this.getShortName();
        else
            return this.getParent().getFullShortName(separator);
    }

    getParent() {
        return this.parent;
    }
}

export class Zone extends Region {
    private readonly parent: Classification;

    constructor(code: number, data: DataZone, parent: Classification) {
        super(3, code, data.name, data.short, data.deprecated);
        this.parent = parent;
    }

    getFullCode(): number {
        return this.getParent().getFullCode() * 1000 + this.getCode();
    }

    getFullName(separator: string = ' '): string {
        if (this.getShortName() !== '') // 非需跳过层级 todo 待提取为属性
            return this.getParent().getFullName(separator) + separator + this.getName();
        else
            return this.getParent().getFullName(separator);
    }
    getFullShortName(separator: string = ' '): string {
        if (this.getShortName() !== '') // 非需跳过层级 todo 待提取为属性
            return this.getParent().getFullShortName(separator) + separator + this.getShortName();
        else
            return this.getParent().getFullShortName(separator);
    }

    getParent() {
        return this.parent;
    }
}

export class Prefecture extends Region {
    private readonly children: ImmutableMap<number, County>;
    private readonly childrenNotDeprecated: ImmutableMap<number, County>;
    private readonly parent: Province;

    constructor(code: number, data: DataPrefecture, parent: Province) {
        super(2, code, data.name, data.short, data.deprecated);
        this.parent = parent;
        this.children = ImmutableMap(Object.entries(data.children).map(
            ([code, data]) =>
                [Number(code), new County(Number(code), data, this)]
        ));
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    getFullCode(): number {
        return this.getParent().getFullCode() * 100 + this.getCode();
    }

    getFullName(separator: string = ' '): string {
        if (this.getShortName() !== '') // 非需跳过层级 todo 待提取为属性
            return this.getParent().getFullName(separator) + separator + this.getName();
        else
            return this.getParent().getFullName(separator);
    }
    getFullShortName(separator: string = ' '): string {
        if (this.getShortName() !== '') // 非需跳过层级 todo 待提取为属性
            return this.getParent().getFullShortName(separator) + separator + this.getShortName();
        else
            return this.getParent().getFullShortName(separator);
    }

    listChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getParent() {
        return this.parent;
    }
    getChild(code: number | string, couldBeDeprecated: boolean = true): County | Zone | null {
        if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.getCounty(code, couldBeDeprecated);
                } else if (100000 <= code && code <= 999999) {
                    return this.getZone(code, couldBeDeprecated);
                }
                throw `地级行政区子级代码 ${code} 不符合预期: (0 > ${code} || ${code} > 99) && (100000 > ${code} || ${code} > 999999)`;
            }
            throw `地级行政区子级代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        } else if (typeof code === "string") {
            if (code.length === 2) {
                return this.getCounty(Number(code), couldBeDeprecated);
            } else if (code.length === 6) {
                return this.getZone(Number(code), couldBeDeprecated);
            }
            throw `地级行政区子级代码长度 ${code.length} 不符合预期: ${code.length} != 2 && ${code.length} != 6`;
        }
        throw `地级行政区子级代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`
    }
    getCounty(code: number | string, couldBeDeprecated: boolean = true): County | null {
        if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.listChildren(couldBeDeprecated).get(code) ?? null;
                }
                throw `县级行政区代码 ${code} 不符合预期: 0 > ${code} || ${code} > 99`;
            }
            throw `县级行政区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        } else if (typeof code === "string") {
            if (code.length === 2) {
                return this.listChildren(couldBeDeprecated).get(Number(code)) ?? null;
            }
            throw `县级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
        }
        throw `县级行政区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`
    }
    getZone(code: number | string, couldBeDeprecated: boolean = true): Zone | null {
        if (typeof code === "number") {
            if (code % 1 === 0) {
                if (100000 <= code && code <= 999999) {
                    return this.getParent().getClassification(Math.floor(code / 1000), couldBeDeprecated)?.getZone(code % 1000, couldBeDeprecated) ?? null;
                }
                throw `含分类经济功能区代码 ${code} 不符合预期: 100000 > ${code} || ${code} > 999999`;
            }
            throw `含分类经济功能区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        } else if (typeof code === "string") {
            if (code.length === 6) {
                return this.getParent().getClassification(Number(code.substring(0, 3)), couldBeDeprecated)?.getZone(Number(code.substring(3, 6)), couldBeDeprecated) ?? null;
            }
            throw `含分类经济功能区代码长度 ${code.length} 不符合预期: ${code.length} != 6`;
        }
        throw `含分类经济功能区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`
    }
}

export class Classification extends Region {
    private readonly children: ImmutableMap<number, Zone>;
    private readonly childrenNotDeprecated: ImmutableMap<number, Zone>;
    private readonly parent: Province;

    constructor(code: number, data: DataClassification, parent: Province) {
        super(2, code, data.name, data.short, data.deprecated);
        this.parent = parent;
        this.children = ImmutableMap(Object.entries(data.children).map(
            ([code, data]) =>
                [Number(code), new Zone(Number(code), data, this)]
        ));
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    getFullCode(): number {
        return this.getParent().getFullCode() * 1000 + this.getCode();
    }

    getFullName(separator: string = ' '): string {
        if (this.getShortName() !== '') // 非需跳过层级 todo 待提取为属性
            return this.getParent().getFullName(separator) + separator + this.getName();
        else
            return this.getParent().getFullName(separator);
    }
    getFullShortName(separator: string = ' '): string {
        if (this.getShortName() !== '') // 非需跳过层级 todo 待提取为属性
            return this.getParent().getFullShortName(separator) + separator + this.getShortName();
        else
            return this.getParent().getFullShortName(separator);
    }

    listChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getParent() {
        return this.parent;
    }
    getChild(code: number | string, couldBeDeprecated: boolean = true): Zone | null {
        if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 999) {
                    return this.getZone(code, couldBeDeprecated);
                }
                throw `经济功能区分类子级代码 ${code} 不符合预期: 0 > ${code} || ${code} > 999`;
            }
            throw `经济功能区分类子级代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        } else if (typeof code === "string") {
            if (code.length === 3) {
                return this.getZone(Number(code), couldBeDeprecated);
            }
            throw `经济功能区分类子级代码长度 ${code.length} 不符合预期: ${code.length} != 3`;
        }
        throw `经济功能区分类子级代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`
    }
    getZone(code: number | string, couldBeDeprecated: boolean = true): Zone | null {
        if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 999) {
                    return this.listChildren(couldBeDeprecated).get(code) ?? null;
                }
                throw `经济功能区代码 ${code} 不符合预期: 0 > ${code} || ${code} > 999`;
            }
            throw `经济功能区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        } else if (typeof code === "string") {
            if (code.length === 3) {
                return this.listChildren(couldBeDeprecated).get(Number(code)) ?? null;
            }
            throw `经济功能区代码长度 ${code.length} 不符合预期: ${code.length} != 3`;
        }
        throw `经济功能区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`
    }
}

export class Province extends Region {
    private readonly children: ImmutableMap<number, Prefecture | Classification>;
    private readonly childrenNotDeprecated: ImmutableMap<number, Prefecture | Classification>;

    constructor(code: number, data: DataProvince) {
        super(1, code, data.name, data.short, data.deprecated);
        this.children = ImmutableMap(Object.entries(data.children).map(
            ([code, data]) =>
                [Number(code), code.length === 2 ? new Prefecture(Number(code), data, this) : new Classification(Number(code), data, this)]
        ));
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    getFullCode(): number {
        return this.getCode();
    }

    getFullName(_: string = ' '): string {
            return this.getName();
    }
    getFullShortName(_: string = ' '): string {
            return this.getShortName();
    }

    listChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getChild(code: number | string, couldBeDeprecated: boolean = true): Prefecture | Classification | null {
        if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.getPrefecture(code, couldBeDeprecated);
                } else if (100 <= code && code <= 999) {
                    return this.getClassification(code, couldBeDeprecated);
                }
                throw `省级行政区子级代码 ${code} 不符合预期: (0 > ${code} || ${code} > 99) && (100 > ${code} || ${code} > 999)`;
            }
            throw `省级行政区子级代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        } else if (typeof code === "string") {
            if (code.length === 2) {
                return this.getPrefecture(Number(code), couldBeDeprecated);
            } else if (code.length === 3) {
                return this.getClassification(Number(code), couldBeDeprecated);
            }
            throw `省级行政区子级代码长度 ${code.length} 不符合预期: ${code.length} != 2 && ${code.length} != 3`;
        }
        throw `省级行政区子级代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`
    }
    getPrefecture(code: number | string, couldBeDeprecated: boolean = true): Prefecture | null {
        if (typeof code === "number") {
            if (0 <= code && code <= 99) {
                return this.listChildren(couldBeDeprecated).get(code) as Prefecture ?? null;
            }
            throw `地级行政区代码 ${code} 不符合预期: 0 > ${code} || ${code} > 99`;
        } else if (typeof code === "string") {
            if (code.length === 2) {
                return this.listChildren(couldBeDeprecated).get(Number(code)) as Prefecture ?? null;
            }
            throw `地级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
        }
        throw `地级行政区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`;
    }
    getClassification(code: number | string, couldBeDeprecated: boolean = true): Classification | null {
        if (typeof code === "number") {
            if (100 <= code && code <= 999) {
                return this.listChildren(couldBeDeprecated).get(code) as Classification ?? null;
            }
            throw `经济功能区分类代码 ${code} 不符合预期: 100 > ${code} || ${code} > 999`;
        } else if (typeof code === "string") {
            if (code.length === 3) {
                return this.listChildren(couldBeDeprecated).get(Number(code)) as Classification ?? null;
            }
            throw `经济功能区分类代码长度 ${code.length} 不符合预期: ${code.length} != 3`;
        }
        throw `经济功能区分类代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`;
    }
}

class China extends Region {
    private readonly children: ImmutableMap<number, Province>;
    private readonly childrenNotDeprecated: ImmutableMap<number, Province>;

    constructor(data: Data) {
        super(0, 0, "中华人民共和国", "中国", null);
        this.children = ImmutableMap(Object.entries(data).map(
            ([code, data]) =>
                [Number(code), new Province(Number(code), data)]
        ));
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    listChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getChild(code: number | string, couldBeDeprecated: boolean = true): Province | null {
        if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.getProvince(code, couldBeDeprecated);
                }
                throw `国家子级代码 ${code} 不符合预期: 0 > ${code} || ${code} > 99`;
            }
            throw `国家子级代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        } else if (typeof code === "string") {
            if (code.length === 2) {
                return this.getProvince(Number(code), couldBeDeprecated);
            }
            throw `国家子级代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
        }
        throw `国家子级代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`
    }
    getProvince(code: number | string, couldBeDeprecated: boolean = true): Province | null {
        if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.listChildren(couldBeDeprecated).get(code) ?? null;
                }
                throw `省级行政区代码 ${code} 不符合预期: 0 > ${code} || ${code} > 99`;
            }
            throw `省级行政区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        } else if (typeof code === "string") {
            if (code.length === 2) {
                return this.listChildren(couldBeDeprecated).get(Number(code)) ?? null;
            }
            throw `省级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
        }
        throw `省级行政区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'number' && ${typeof code} != 'string'`
    }
}

export default new China(untypedData as Data);
