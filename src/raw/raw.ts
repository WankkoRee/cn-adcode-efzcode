import * as fs from "fs";
import { type Data as Data_GB_T_2260 } from './GB_T_2260';
import { main as GB_T_2260_1980 } from './GB_T_2260_1980';
import { main as GB_T_2260_1981 } from './GB_T_2260_1981';

type Data = {
    [province: string]: {
        name: string,
        short: string,
        deprecated: string | null,
        children: {
            [prefecture: string]: {
                name: string,
                short: string | null,
                deprecated: string | null,
                children: {
                    [county: string]: {
                        name: string,
                        short: string | null,
                        deprecated: string | null,
                    },
                },
            },
        },
    },
}

function deprecated(data: Data, flag: string) {
    Object.entries(data).forEach(([province, {name, short, children}]) => {
        data[province].deprecated = flag;
        Object.entries(children).forEach(([prefecture, {name, short, children}]) => {
            data[province].children[prefecture].deprecated = flag;
            Object.entries(children).forEach(([county, {name, short}]) => {
                data[province].children[prefecture].children[county].deprecated = flag;
            })
        })
    })
}

function update(data: Data, newData: Data_GB_T_2260, flag: string) {
    deprecated(data, flag);
    Object.entries(newData).forEach(([province, {name, short, children}]) => {
        if (!data[province]) {
            data[province] = {
                name: name,
                short: short,
                deprecated: null,
                children: {},
            }
        } else {
            data[province].deprecated = null;
            data[province].name = name;
            data[province].short = short;
        }
        Object.entries(children).forEach(([prefecture, {name, short, children}]) => {
            if (!data[province].children[prefecture]) {
                data[province].children[prefecture] = {
                    name: name,
                    short: short,
                    deprecated: null,
                    children: {},
                }
            } else {
                data[province].children[prefecture].deprecated = null;
                data[province].children[prefecture].name = name;
                data[province].children[prefecture].short = short;
            }
            Object.entries(children).forEach(([county, {name, short}]) => {
                if (!data[province].children[prefecture].children[county]) {
                    data[province].children[prefecture].children[county] = {
                        name: name,
                        short: short,
                        deprecated: null,
                    }
                } else {
                    data[province].children[prefecture].children[county].deprecated = null;
                    data[province].children[prefecture].children[county].name = name;
                    data[province].children[prefecture].children[county].short = short;
                }
            })
        })
    })
}

function main() {
    const data: Data = {};

    update(data, GB_T_2260_1980(), "GB/T 2260-1980");
    // update(data, GB_T_2260_1981(), "GB/T 2260-1981");

    fs.writeFileSync('./src/data/GB_T_2260.json', JSON.stringify(data, null, 2), 'utf-8');
}
main();
