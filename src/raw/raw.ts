import * as fs from "fs";
import { type Data as Data_GB_T_2260 } from './GB_T_2260';
import { main as GB_T_2260_1980 } from './GB_T_2260_1980';
import { main as GB_T_2260_1981 } from './GB_T_2260_1981';
import { main as GB_T_2260_1982 } from './GB_T_2260_1982';
import { main as GB_T_2260_1983 } from './GB_T_2260_1983';
import { main as GB_T_2260_1984 } from './GB_T_2260_1984';
import { main as GB_T_2260_1985 } from './GB_T_2260_1985';
import { main as GB_T_2260_1986 } from './GB_T_2260_1986';
import { main as GB_T_2260_1987 } from './GB_T_2260_1987';
import { main as GB_T_2260_1988 } from './GB_T_2260_1988';
import { main as GB_T_2260_1989 } from './GB_T_2260_1989';
import { main as GB_T_2260_1990 } from './GB_T_2260_1990';
import { main as GB_T_2260_1991 } from './GB_T_2260_1991';
import { main as GB_T_2260_1992 } from './GB_T_2260_1992';
import { main as GB_T_2260_1993 } from './GB_T_2260_1993';
import { main as GB_T_2260_1994 } from './GB_T_2260_1994';
import { main as GB_T_2260_1995 } from './GB_T_2260_1995';

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
        if (!data[province].deprecated) {
            data[province].deprecated = flag;
        }
        Object.entries(children).forEach(([prefecture, {name, short, children}]) => {
            if (!data[province].children[prefecture].deprecated) {
                data[province].children[prefecture].deprecated = flag;
            }
            Object.entries(children).forEach(([county, {name, short}]) => {
                if (!data[province].children[prefecture].children[county].deprecated) {
                    data[province].children[prefecture].children[county].deprecated = flag;
                }
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
    update(data, GB_T_2260_1981(), "GB/T 2260-1981");
    update(data, GB_T_2260_1982(), "GB/T 2260-1982");
    update(data, GB_T_2260_1983(), "GB/T 2260-1983");
    update(data, GB_T_2260_1984(), "GB/T 2260-1984");
    update(data, GB_T_2260_1985(), "GB/T 2260-1985");
    update(data, GB_T_2260_1986(), "GB/T 2260-1986");
    update(data, GB_T_2260_1987(), "GB/T 2260-1987");
    update(data, GB_T_2260_1988(), "GB/T 2260-1988");
    update(data, GB_T_2260_1989(), "GB/T 2260-1989");
    update(data, GB_T_2260_1990(), "GB/T 2260-1990");
    update(data, GB_T_2260_1991(), "GB/T 2260-1991");
    update(data, GB_T_2260_1992(), "GB/T 2260-1992");
    update(data, GB_T_2260_1993(), "GB/T 2260-1993");
    update(data, GB_T_2260_1994(), "GB/T 2260-1994");
    update(data, GB_T_2260_1995(), "GB/T 2260-1995");

    fs.writeFileSync('./src/data/GB_T_2260.json', JSON.stringify(data, null, 2), 'utf-8');
}
main();
