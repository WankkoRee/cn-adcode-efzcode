import { Map as ImmutableMap } from 'immutable'

import untypedData from './data/data.json'
import type {Data, DataProvince, DataPrefecture, DataClassification, DataCounty, DataZone} from "./types";

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

    override getCode(): string {
        return this.getParent().getCode()+super.getCode();
    }

    getParent() {
        return this.parent;
    }
}

class Zone extends Region {
    private readonly parent: Classification;

    constructor(code: string, data: DataZone, parent: Classification) {
        super(3, code, data.name, data.short, data.deprecated);
        this.parent = parent;
    }

    override getCode(): string {
        return this.getParent().getCode()+super.getCode();
    }

    getParent() {
        return this.parent;
    }
}

class Prefecture extends Region {
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

    listChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getParent() {
        return this.parent;
    }
    getChild(code: string, couldBeDeprecated: boolean = true): County | null {
        if (code.length === 2) {
            return this.getCounty(code, couldBeDeprecated);
        }
        throw `地级行政区子级代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
    }
    getCounty(code: string, couldBeDeprecated: boolean = true): County | null {
        if (code.length === 2) {
            return this.listChildren(couldBeDeprecated).get(code) ?? null;
        }
        throw `县级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
    }
}

class Classification extends Region {
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

    listChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getParent() {
        return this.parent;
    }
    getChild(code: string, couldBeDeprecated: boolean = true): Zone | null {
        if (code.length === 3) {
            return this.getZone(code, couldBeDeprecated);
        }
        throw `经济功能区分类子级代码长度 ${code.length} 不符合预期: ${code.length} != 3`;
    }
    getZone(code: string, couldBeDeprecated: boolean = true): Zone | null {
        if (code.length === 3) {
            return this.listChildren(couldBeDeprecated).get(code) ?? null;
        }
        throw `经济功能区代码长度 ${code.length} 不符合预期: ${code.length} != 3`;
    }
}

class Province extends Region {
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

    listChildren(includeDeprecated: boolean = false) {
        return includeDeprecated ? this.children : this.childrenNotDeprecated;
    }
    getChild(code: string, couldBeDeprecated: boolean = true): Prefecture | Classification | null {
        if (code.length === 2) {
            return this.getPrefecture(code, couldBeDeprecated);
        } else if (code.length === 3) {
            return this.getClassification(code, couldBeDeprecated);
        }
        throw `省级行政区子级代码长度 ${code.length} 不符合预期: ${code.length} != 2 && ${code.length} != 3`;
    }
    getPrefecture(code: string, couldBeDeprecated: boolean = true): Prefecture | null {
        if (code.length === 2) {
            return this.listChildren(couldBeDeprecated).get(code) as Prefecture ?? null;
        }
        throw `地级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
    }
    getClassification(code: string, couldBeDeprecated: boolean = true): Classification | null {
        if (code.length === 3) {
            return this.listChildren(couldBeDeprecated).get(code) as Classification ?? null;
        }
        throw `经济功能区分类代码长度 ${code.length} 不符合预期: ${code.length} != 3`;
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
    getChild(code: string, couldBeDeprecated: boolean = true): Province | null {
        if (code.length === 2) {
            return this.getProvince(code, couldBeDeprecated);
        }
        throw `国家子级代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
    }
    getProvince(code: string, couldBeDeprecated: boolean = true): Province | null {
        if (code.length === 2) {
            return this.listChildren(couldBeDeprecated).get(code) ?? null;
        }
        throw `省级行政区代码长度 ${code.length} 不符合预期: ${code.length} != 2`;
    }
}

export default new China(untypedData as Data);
