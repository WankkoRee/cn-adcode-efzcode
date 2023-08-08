import { Map as ImmutableMap } from 'immutable'

import untypedData from './data/data.json'
import type {Data, DataProvince, DataPrefecture, DataClassification, DataCounty, DataZone} from "./types";

function paddingLeft(s: string, l: number, c: string) {
    return c.charAt(0).repeat(l - s.length) + s;
}

class Region {
    private readonly level: 0 | 1 | 2 | 3;
    private readonly code: string;
    private readonly name: string;
    private readonly short: string | null;
    private readonly deprecated: string | null;

    constructor(level: 0 | 1 | 2 | 3, code: string, name: string, short: string | null, deprecated: string | null) {
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

    constructor(code: string, data: DataCounty, parent: Prefecture) {
        super(3, code, data.name, data.short, data.deprecated);
        this.parent = parent;
    }

    override getCode(): string {
        return this.getParent().getCode()+super.getCode();
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

    constructor(code: string, data: DataZone, parent: Classification) {
        super(3, code, data.name, data.short, data.deprecated);
        this.parent = parent;
    }

    override getCode(): string {
        return this.getParent().getCode()+super.getCode();
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
    private readonly children: ImmutableMap<string, County>;
    private readonly childrenNotDeprecated: ImmutableMap<string, County>;
    private readonly parent: Province;

    constructor(code: string, data: DataPrefecture, parent: Province) {
        super(2, code, data.name, data.short, data.deprecated);
        this.parent = parent;
        this.children = ImmutableMap(Object.fromEntries(Object.entries(data.children).map(
            ([code, data]) =>
                [code, new County(code, data, this)]
        )));
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    override getCode(): string {
        return this.getParent().getCode()+super.getCode();
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
    getChild(code: string | number, couldBeDeprecated: boolean = true): County | Zone | null {
        if (typeof code === "string") {
            if (code.length === 2) {
                return this.getCounty(code, couldBeDeprecated);
            } else if (code.length === 6) {
                return this.getZone(code, couldBeDeprecated);
            }
            throw `地级行政区子级代码长度 ${code.length} 不符合预期: ${code.length} != 2 && ${code.length} != 6`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.getCounty(paddingLeft(String(code), 2, '0'), couldBeDeprecated);
                } else if (1000 <= code && code <= 999999) {
                    return this.getChild(paddingLeft(String(code), 6, '0'), couldBeDeprecated);
                }
                throw `地级行政区子级代码 ${code} 不符合预期: (0 > ${code} || ${code} > 99) && (1000 > ${code} || ${code} > 999999)`;
            }
            throw `地级行政区子级代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `地级行政区子级代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
    getCounty(code: string | number, couldBeDeprecated: boolean = true): County | null {
        if (typeof code === "string") {
            if (code.length === 2) {
                return this.listChildren(couldBeDeprecated).get(code) ?? null;
            }
            throw `县级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.getCounty(paddingLeft(String(code), 2, '0'), couldBeDeprecated);
                }
                throw `县级行政区代码 ${code} 不符合预期: 0 > ${code} || ${code} > 99`;
            }
            throw `县级行政区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `县级行政区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
    getZone(code: string | number, couldBeDeprecated: boolean = true): Zone | null {
        if (typeof code === "string") {
            if (code.length === 6) {
                return this.getParent().getClassification(code.substring(0, 3), couldBeDeprecated)?.getZone(code.substring(3, 6), couldBeDeprecated) ?? null;
            }
            throw `含分类经济功能区代码长度 ${code.length} 不符合预期: ${code.length} != 6`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (1000 <= code && code <= 999999) {
                    return this.getZone(paddingLeft(String(code), 6, '0'), couldBeDeprecated);
                }
                throw `含分类经济功能区代码 ${code} 不符合预期: 1000 > ${code} || ${code} > 999999`;
            }
            throw `含分类经济功能区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `含分类经济功能区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
}

export class Classification extends Region {
    private readonly children: ImmutableMap<string, Zone>;
    private readonly childrenNotDeprecated: ImmutableMap<string, Zone>;
    private readonly parent: Province;

    constructor(code: string, data: DataClassification, parent: Province) {
        super(2, code, data.name, data.short, data.deprecated);
        this.parent = parent;
        this.children = ImmutableMap(Object.fromEntries(Object.entries(data.children).map(
            ([code, data]) =>
                [code, new Zone(code, data, this)]
        )));
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    override getCode(): string {
        return this.getParent().getCode()+super.getCode();
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
    getChild(code: string | number, couldBeDeprecated: boolean = true): Zone | null {
        if (typeof code === "string") {
            if (code.length === 3) {
                return this.getZone(code, couldBeDeprecated);
            }
            throw `经济功能区分类子级代码长度 ${code.length} 不符合预期: ${code.length} != 3`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 999) {
                    return this.getChild(paddingLeft(String(code), 3, '0'), couldBeDeprecated);
                }
                throw `经济功能区分类子级代码 ${code} 不符合预期: 0 > ${code} || ${code} > 999`;
            }
            throw `经济功能区分类子级代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `经济功能区分类子级代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
    getZone(code: string | number, couldBeDeprecated: boolean = true): Zone | null {
        if (typeof code === "string") {
            if (code.length === 3) {
                return this.listChildren(couldBeDeprecated).get(code) ?? null;
            }
            throw `经济功能区代码长度 ${code.length} 不符合预期: ${code.length} != 3`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 999) {
                    return this.getZone(paddingLeft(String(code), 3, '0'), couldBeDeprecated);
                }
                throw `经济功能区代码 ${code} 不符合预期: 0 > ${code} || ${code} > 999`;
            }
            throw `经济功能区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `经济功能区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
}

export class Province extends Region {
    private readonly children: ImmutableMap<string, Prefecture | Classification>;
    private readonly childrenNotDeprecated: ImmutableMap<string, Prefecture | Classification>;

    constructor(code: string, data: DataProvince) {
        super(1, code, data.name, data.short, data.deprecated);
        this.children = ImmutableMap(Object.fromEntries(Object.entries(data.children).map(
            ([code, data]) =>
                [code, code.length === 2 ? new Prefecture(code, data, this) : new Classification(code, data, this)]
        )));
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
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
    getChild(code: string | number, couldBeDeprecated: boolean = true): Prefecture | Classification | null {
        if (typeof code === "string") {
            if (code.length === 2) {
                return this.getPrefecture(code, couldBeDeprecated);
            } else if (code.length === 3) {
                return this.getClassification(code, couldBeDeprecated);
            }
            throw `省级行政区子级代码长度 ${code.length} 不符合预期: ${code.length} != 2 && ${code.length} != 3`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.getChild(paddingLeft(String(code), 2, '0'), couldBeDeprecated);
                } else if (100 <= code && code <= 999) {
                    return this.getChild(paddingLeft(String(code), 3, '0'), couldBeDeprecated);
                }
                throw `省级行政区子级代码 ${code} 不符合预期: (0 > ${code} || ${code} > 99) && (100 > ${code} || ${code} > 999)`;
            }
            throw `省级行政区子级代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `省级行政区子级代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
    getPrefecture(code: string | number, couldBeDeprecated: boolean = true): Prefecture | null {
        if (typeof code === "string") {
            if (code.length === 2) {
                return this.listChildren(couldBeDeprecated).get(code) as Prefecture ?? null;
            }
            throw `地级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
        } else if (typeof code === "number") {
            if (0 <= code && code <= 99) {
                return this.getPrefecture(paddingLeft(String(code), 2, '0'), couldBeDeprecated);
            }
            throw `地级行政区代码 ${code} 不符合预期: 0 > ${code} || ${code} > 99`;
        }
        throw `地级行政区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`;
    }
    getClassification(code: string | number, couldBeDeprecated: boolean = true): Classification | null {
        if (typeof code === "string") {
            if (code.length === 3) {
                return this.listChildren(couldBeDeprecated).get(code) as Classification ?? null;
            }
            throw `经济功能区分类代码长度 ${code.length} 不符合预期: ${code.length} != 3`;
        } else if (typeof code === "number") {
            if (100 <= code && code <= 999) {
                return this.getClassification(paddingLeft(String(code), 3, '0'), couldBeDeprecated);
            }
            throw `经济功能区分类代码 ${code} 不符合预期: 100 > ${code} || ${code} > 999`;
        }
        throw `经济功能区分类代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`;
    }
}

class China extends Region {
    private readonly children: ImmutableMap<string, Province>;
    private readonly childrenNotDeprecated: ImmutableMap<string, Province>;

    constructor(data: Data) {
        super(0, "", "中华人民共和国", "中国", null);
        this.children = ImmutableMap(Object.fromEntries(Object.entries(data).map(
            ([code, data]) =>
                [code, new Province(code, data)]
        )));
        this.childrenNotDeprecated = this.children.filter((v, _) => !v.isDeprecated());
    }

    listChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getChild(code: string | number, couldBeDeprecated: boolean = true): Province | null {
        if (typeof code === "string") {
            if (code.length === 2) {
                return this.getProvince(code, couldBeDeprecated);
            }
            throw `国家子级代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.getChild(paddingLeft(String(code), 2, '0'), couldBeDeprecated);
                }
                throw `国家子级代码 ${code} 不符合预期: 0 > ${code} || ${code} > 99`;
            }
            throw `国家子级代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `国家子级代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
    getProvince(code: string | number, couldBeDeprecated: boolean = true): Province | null {
        if (typeof code === "string") {
            if (code.length === 2) {
                return this.listChildren(couldBeDeprecated).get(code) ?? null;
            }
            throw `省级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
        } else if (typeof code === "number") {
            if (code % 1 === 0) {
                if (0 <= code && code <= 99) {
                    return this.getProvince(paddingLeft(String(code), 2, '0'), couldBeDeprecated);
                }
                throw `省级行政区代码 ${code} 不符合预期: 0 > ${code} || ${code} > 99`;
            }
            throw `省级行政区代码 ${code} 不符合预期: ${code} % 1 !== 0`;
        }
        throw `省级行政区代码类型 ${typeof code} 不符合预期: ${typeof code} != 'string' && ${typeof code} != 'number'`
    }
}

export default new China(untypedData as Data);
