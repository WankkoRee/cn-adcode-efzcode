import {main as GB_T_2260} from './GB_T_2260.js'
import {main as GB_T_37028} from './GB_T_37028.js'
import * as fs from "fs";
import {getExported, getNow} from "./utils.js";
import type {Data} from "../types";
import assert from "assert";

async function main() {
    const gb_t_2260 = GB_T_2260()
    fs.writeFileSync('./src/data/GB_T_2260.dep.json', JSON.stringify(gb_t_2260, null, 2), 'utf-8');
    fs.writeFileSync('./src/data/GB_T_2260.json', JSON.stringify(getExported(gb_t_2260), null, 2), 'utf-8');
    fs.writeFileSync('./src/data/GB_T_2260.now.json', JSON.stringify(getNow(gb_t_2260), null, 2), 'utf-8');

    const gb_t_37028 = await GB_T_37028()
    fs.writeFileSync('./src/data/GB_T_37028.dep.json', JSON.stringify(gb_t_37028, null, 2), 'utf-8');
    fs.writeFileSync('./src/data/GB_T_37028.json', JSON.stringify(getExported(gb_t_37028), null, 2), 'utf-8');
    fs.writeFileSync('./src/data/GB_T_37028.now.json', JSON.stringify(getNow(gb_t_37028), null, 2), 'utf-8');

    const data: Data<string> = {}
    Object.keys(gb_t_2260).forEach(province => {
        data[province] = {
            name: gb_t_2260[province].name,
            short: gb_t_2260[province].short,
            deprecated: gb_t_2260[province].deprecated,
            children: {}
        }
        Object.keys(gb_t_2260[province].children).forEach(prefecture => {
            data[province].children[prefecture] = {
                name: gb_t_2260[province].children[prefecture].name,
                short: gb_t_2260[province].children[prefecture].short,
                deprecated: gb_t_2260[province].children[prefecture].deprecated,
                children: {}
            }
            Object.keys(gb_t_2260[province].children[prefecture].children).forEach(county => {
                data[province].children[prefecture].children[county] = {
                    name: gb_t_2260[province].children[prefecture].children[county].name,
                    short: gb_t_2260[province].children[prefecture].children[county].short,
                    deprecated: gb_t_2260[province].children[prefecture].children[county].deprecated,
                }
            })
        })
    })
    Object.keys(gb_t_37028).forEach(province => {
        if (!data[province]) {
            data[province] = {
                name: gb_t_37028[province].name,
                short: gb_t_37028[province].short,
                deprecated: gb_t_37028[province].deprecated,
                children: {}
            }
        } else {
            assert(data[province].name === gb_t_37028[province].name)
        }
        Object.keys(gb_t_37028[province].children).forEach(gb_t_classification => {
            data[province].children[gb_t_classification] = {
                name: gb_t_37028[province].children[gb_t_classification].name,
                short: gb_t_37028[province].children[gb_t_classification].short,
                deprecated: gb_t_37028[province].children[gb_t_classification].deprecated,
                children: {}
            }
            Object.keys(gb_t_37028[province].children[gb_t_classification].children).forEach(zone => {
                data[province].children[gb_t_classification].children[zone] = {
                    name: gb_t_37028[province].children[gb_t_classification].children[zone].name,
                    short: gb_t_37028[province].children[gb_t_classification].children[zone].short,
                    deprecated: gb_t_37028[province].children[gb_t_classification].children[zone].deprecated,
                }
            })
        })
    })
    fs.writeFileSync('./src/data/data.dep.json', JSON.stringify(data, null, 2), 'utf-8');
    fs.writeFileSync('./src/data/data.json', JSON.stringify(getExported(data), null, 2), 'utf-8');
    fs.writeFileSync('./src/data/data.now.json', JSON.stringify(getNow(data), null, 2), 'utf-8');
}
main().then()
