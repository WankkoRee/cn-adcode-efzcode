export type DataCounty<T extends boolean | string | undefined> = T extends undefined ? {
    name: string,
    short: string | null,
} : T extends true | false ? {
    name: string,
    short: string | null,
    deprecated: boolean,
} : {
    name: string,
    short: string | null,
    deprecated: T,
}
export type DataCounties<T extends boolean | string | undefined> = {
    [county: string]: DataCounty<T>,
}
export type DataPrefecture<T extends boolean | string | undefined> = T extends undefined ? {
    name: string,
    short: string | null,
    children: DataCounties<T>,
} : T extends true | false ? {
    name: string,
    short: string | null,
    deprecated: boolean,
    children: DataCounties<T>,
} : {
    name: string,
    short: string | null,
    deprecated: T,
    children: DataCounties<T>,
}
export type DataPrefectures<T extends boolean | string | undefined> = {
    [prefecture: string]: DataPrefecture<T>,
}
export type DataProvince<T extends boolean | string | undefined> = T extends undefined ? {
    name: string,
    short: string,
    children: DataPrefectures<T>,
} : T extends true | false ? {
    name: string,
    short: string | null,
    deprecated: boolean,
    children: DataPrefectures<T>,
} : {
    name: string,
    short: string,
    deprecated: T,
    children: DataPrefectures<T>,
}
export type Data<T extends boolean | string | undefined> = {
    [province: string]: DataProvince<T>,
}
