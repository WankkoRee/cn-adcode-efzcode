import {main as GB_T_2260} from './GB_T_2260.js'
import {main as GB_T_37028} from './GB_T_37028.js'
import * as fs from "fs";
import type {Data, DataClassifications, DataPrefectures} from "../types";
import assert from "assert";

async function main() {
    const gb_t_2260 = GB_T_2260()
    fs.writeFileSync('./src/data/GB_T_2260.json', JSON.stringify(gb_t_2260, null, 2), 'utf-8');

    const gb_t_37028 = await GB_T_37028()
    fs.writeFileSync('./src/data/GB_T_37028.json', JSON.stringify(gb_t_37028, null, 2), 'utf-8');

    const data: Data<DataPrefectures | DataClassifications> = {}
    Object.entries(gb_t_2260).forEach(([province_code, {
        name: province_name,
        short: province_short,
        deprecated: province_deprecated,
        children: province_children,
    }]) => {
        data[province_code] = {
            name: province_name,
            short: province_short,
            deprecated: province_deprecated,
            children: {},
        }
        Object.entries(province_children as DataPrefectures).forEach(([prefecture_code, {
            name: prefecture_name,
            short: prefecture_short,
            deprecated: prefecture_deprecated,
            children: prefecture_children,
        }]) => {
            if (prefecture_short !== "") {
                data[province_code].children[prefecture_code] = {
                    name: prefecture_name,
                    short: prefecture_short,
                    deprecated: prefecture_deprecated,
                    children: {},
                }
            }
            Object.entries(prefecture_children).forEach(([county_code, {
                name: county_name,
                short: county_short,
                deprecated: county_deprecated,
            }]) => {
                if (prefecture_short !== "") {
                    data[province_code].children[prefecture_code].children[county_code] = {
                        name: county_name,
                        short: county_short,
                        deprecated: county_deprecated,
                    }
                } else {
                    data[province_code].children[prefecture_code+county_code] = {
                        name: county_name,
                        short: county_short,
                        deprecated: county_deprecated,
                        children: {},
                    }
                }
            })
        })
    })
    Object.entries(gb_t_37028).forEach(([province_code, {
        name: province_name,
        short: province_short,
        deprecated: province_deprecated,
        children: province_children,
    }]) => {
        if (!data[province_code]) {
            data[province_code] = {
                name: province_name,
                short: province_short,
                deprecated: province_deprecated,
                children: {},
            }
        } else {
            assert(data[province_code].name === province_name, `${data[province_code].name} !== ${province_name}`);
        }
        Object.entries(province_children as DataClassifications).forEach(([classification_code, {
            name: classification_name,
            short: classification_short,
            deprecated: classification_deprecated,
            children: classification_children,
        }]) => {
            // data[province_code].children[classification_code] = {
            //     name: classification_name,
            //     short: classification_short,
            //     deprecated: classification_deprecated,
            //     children: {},
            // }
            Object.entries(classification_children).forEach(([zone_code, {
                name: zone_name,
                short: zone_short,
                deprecated: zone_deprecated,
                parent: zone_parent,
            }]) => {
                if (zone_parent) {
                    assert(zone_parent.substring(0, 2) === province_code, `${zone_parent}.substring(0, 2) !== ${province_code}`)
                    const prefecture_code = zone_parent.substring(2, );
                    assert(data[province_code].children[prefecture_code], `${zone_parent}.substring(2, ) not found`);
                    data[province_code].children[prefecture_code].children[classification_code+zone_code] = {
                        name: zone_name,
                        short: zone_short,
                        deprecated: zone_deprecated,
                    }
                }
            })
        })
    })
    fs.writeFileSync('./src/data/data.json', JSON.stringify(data, null, 2), 'utf-8');
}
main().then()
