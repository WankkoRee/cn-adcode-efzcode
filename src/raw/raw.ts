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
import { main as GB_T_2260_1996 } from './GB_T_2260_1996';
import { main as GB_T_2260_1997 } from './GB_T_2260_1997';
import { main as GB_T_2260_1998 } from './GB_T_2260_1998';
import { main as GB_T_2260_1999 } from './GB_T_2260_1999';
import { main as GB_T_2260_2000 } from './GB_T_2260_2000';
import { main as GB_T_2260_2001 } from './GB_T_2260_2001';
import { main as GB_T_2260_2002 } from './GB_T_2260_2002';
import { main as GB_T_2260_2003 } from './GB_T_2260_2003';
import { main as GB_T_2260_2004 } from './GB_T_2260_2004';
import { main as GB_T_2260_2005 } from './GB_T_2260_2005';
import { main as GB_T_2260_2006 } from './GB_T_2260_2006';
import { main as GB_T_2260_2007 } from './GB_T_2260_2007';
import { main as GB_T_2260_2008 } from './GB_T_2260_2008';
import { main as GB_T_2260_2009 } from './GB_T_2260_2009';
import { main as GB_T_2260_2010 } from './GB_T_2260_2010';
import { main as GB_T_2260_2011 } from './GB_T_2260_2011';
import { main as GB_T_2260_2012 } from './GB_T_2260_2012';
import { main as GB_T_2260_2013 } from './GB_T_2260_2013';
import { main as GB_T_2260_2014 } from './GB_T_2260_2014';
import { main as GB_T_2260_2015 } from './GB_T_2260_2015';
import { main as GB_T_2260_2016 } from './GB_T_2260_2016';
import { main as GB_T_2260_2017 } from './GB_T_2260_2017';
import { main as GB_T_2260_2018 } from './GB_T_2260_2018';
import { main as GB_T_2260_2019 } from './GB_T_2260_2019';
import { main as GB_T_2260_2020 } from './GB_T_2260_2020';
import { main as GB_T_2260_2021 } from './GB_T_2260_2021';

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

export type DataMiniCounty = {
    name: string,
    short: string | null,
    deprecated: boolean,
}
export type DataMiniCounties = {
    [county: string]: DataMiniCounty,
}
export type DataMiniPrefecture = {
    name: string,
    short: string | null,
    deprecated: boolean,
    children: DataMiniCounties,
}
export type DataMiniPrefectures = {
    [prefecture: string]: DataMiniPrefecture,
}
export type DataMiniProvince = {
    name: string,
    short: string,
    deprecated: boolean,
    children: DataMiniPrefectures,
}
export type DataMini = {
    [province: string]: DataMiniProvince,
}

type DataNow = {
    [province: string]: {
        name: string,
        short: string,
        children: {
            [prefecture: string]: {
                name: string,
                short: string | null,
                children: {
                    [county: string]: {
                        name: string,
                        short: string | null,
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
    update(data, GB_T_2260_1996(), "GB/T 2260-1996");
    update(data, GB_T_2260_1997(), "GB/T 2260-1997");
    update(data, GB_T_2260_1998(), "GB/T 2260-1998");
    update(data, GB_T_2260_1999(), "GB/T 2260-1999");
    update(data, GB_T_2260_2000(), "GB/T 2260-2000");
    update(data, GB_T_2260_2001(), "GB/T 2260-2001");
    update(data, GB_T_2260_2002(), "GB/T 2260-2002");
    update(data, GB_T_2260_2003(), "GB/T 2260-2003");
    update(data, GB_T_2260_2004(), "GB/T 2260-2004");
    update(data, GB_T_2260_2005(), "GB/T 2260-2005");
    update(data, GB_T_2260_2006(), "GB/T 2260-2006");
    update(data, GB_T_2260_2007(), "GB/T 2260-2007");
    update(data, GB_T_2260_2008(), "GB/T 2260-2008");
    update(data, GB_T_2260_2009(), "GB/T 2260-2009");
    update(data, GB_T_2260_2010(), "GB/T 2260-2010");
    update(data, GB_T_2260_2011(), "GB/T 2260-2011");
    update(data, GB_T_2260_2012(), "GB/T 2260-2012");
    update(data, GB_T_2260_2013(), "GB/T 2260-2013");
    update(data, GB_T_2260_2014(), "GB/T 2260-2014");
    update(data, GB_T_2260_2015(), "GB/T 2260-2015");
    update(data, GB_T_2260_2016(), "GB/T 2260-2016");
    update(data, GB_T_2260_2017(), "GB/T 2260-2017");
    update(data, GB_T_2260_2018(), "GB/T 2260-2018");
    update(data, GB_T_2260_2019(), "GB/T 2260-2019");
    update(data, GB_T_2260_2020(), "GB/T 2260-2020");
    update(data, GB_T_2260_2021(), "GB/T 2260-2021");

    fs.writeFileSync('./src/data/GB_T_2260.dep.json', JSON.stringify(data, null, 2), 'utf-8');

    const dataMini: DataMini = {};
    const dataNow: DataNow = {};

    Object.entries(data).forEach(([province, {name, short, deprecated, children}]) => {
        dataMini[province] = {
            name,
            short,
            deprecated: !!deprecated,
            children: {},
        }
        Object.entries(children).forEach(([prefecture, {name, short, deprecated, children}]) => {
            dataMini[province].children[prefecture] = {
                name,
                short,
                deprecated: !!deprecated,
                children: {},
            }
            Object.entries(children).forEach(([county, {name, short, deprecated}]) => {
                dataMini[province].children[prefecture].children[county] = {
                    name,
                    short,
                    deprecated: !!deprecated,
                }
            });
        });
    });

    Object.entries(data).forEach(([province, {name, short, deprecated, children}]) => {
        if (deprecated)
            return true; // continue
        dataNow[province] = {
            name,
            short,
            children: {},
        }
        Object.entries(children).forEach(([prefecture, {name, short, deprecated, children}]) => {
            if (deprecated)
                return true; // continue
            dataNow[province].children[prefecture] = {
                name,
                short,
                children: {},
            }
            Object.entries(children).forEach(([county, {name, short, deprecated}]) => {
                if (deprecated)
                    return true; // continue
                dataNow[province].children[prefecture].children[county] = {
                    name,
                    short,
                }
            });
        });
    });

    fs.writeFileSync('./src/data/GB_T_2260.json', JSON.stringify(dataMini, null, 2), 'utf-8');
    fs.writeFileSync('./src/data/GB_T_2260.now.json', JSON.stringify(dataNow, null, 2), 'utf-8');
}
main();
