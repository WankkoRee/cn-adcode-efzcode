
export type DataRaw = {
    [key: string]: {
        name: string,
        short: string,
        children: {
            [key: string]: {
                name: string,
                short: string | null,
                suffix?: string | null,
                children: {
                    [key: string]: {
                        name: string,
                        short: string | null,
                        suffix?: string | null,
                    },
                },
            },
        },
    },
}

export type DataCounty<T> = {
    name: string,
    short: string | null,
    deprecated: T,
}
export type DataCounties<T> = {
    [county: string]: DataCounty<T>,
}
export type DataPrefecture<T> = {
    name: string,
    short: string | null,
    deprecated: T,
    children: DataCounties<T>,
}
export type DataPrefectures<T> = {
    [prefecture: string]: DataPrefecture<T>,
}
export type DataProvince<T> = {
    name: string,
    short: string,
    deprecated: T,
    children: DataPrefectures<T>,
}
export type Data<T> = {
    [province: string]: DataProvince<T>,
}

export type DataNow = {
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

export function deprecated(data: Data<string | null>, flag: string) {
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

export function update(data: Data<string | null>, newData: DataRaw, flag: string) {
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

export function getExported(data: Data<string | null>) {
    const dataExported: Data<boolean> = {};
    Object.entries(data).forEach(([province, {name, short, deprecated, children}]) => {
        dataExported[province] = {
            name,
            short,
            deprecated: !!deprecated,
            children: {},
        }
        Object.entries(children).forEach(([prefecture, {name, short, deprecated, children}]) => {
            dataExported[province].children[prefecture] = {
                name,
                short,
                deprecated: !!deprecated,
                children: {},
            }
            Object.entries(children).forEach(([county, {name, short, deprecated}]) => {
                dataExported[province].children[prefecture].children[county] = {
                    name,
                    short,
                    deprecated: !!deprecated,
                }
            });
        });
    });
    return dataExported;
}

export function getNow(data:Data<string | null>) {
    const dataNow: DataNow = {};
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
    return dataNow;
}
