// import {main as GB_T_2260} from './GB_T_2260.js'
import {main as GB_T_37028} from './GB_T_37028.js'
import * as fs from "fs";
import {getExported, getNow} from "./utils.js";

async function main() {
    // const gb_t_2260 = GB_T_2260()
    // fs.writeFileSync('./src/data/GB_T_2260.dep.json', JSON.stringify(gb_t_2260, null, 2), 'utf-8');
    // fs.writeFileSync('./src/data/GB_T_2260.json', JSON.stringify(getExported(gb_t_2260), null, 2), 'utf-8');
    // fs.writeFileSync('./src/data/GB_T_2260.now.json', JSON.stringify(getNow(gb_t_2260), null, 2), 'utf-8');

    const gb_t_37028 = await GB_T_37028()
    fs.writeFileSync('./src/data/GB_T_37028.dep.json', JSON.stringify(gb_t_37028, null, 2), 'utf-8');
    fs.writeFileSync('./src/data/GB_T_37028.json', JSON.stringify(getExported(gb_t_37028), null, 2), 'utf-8');
    fs.writeFileSync('./src/data/GB_T_37028.now.json', JSON.stringify(getNow(gb_t_37028), null, 2), 'utf-8');
}
main().then()
