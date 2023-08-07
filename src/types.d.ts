export type DataCounty = {
    name: string,
    short: string | null,
    deprecated: string | null,
}
export type DataCounties = {
    [county: string]: DataCounty,
}
export type DataPrefecture = {
    name: string,
    short: string | null,
    deprecated: string | null,
    children: DataCounties,
}
export type DataPrefectures = {
    [prefecture: string]: DataPrefecture,
}
export type DataProvince = {
    name: string,
    short: string | null,
    deprecated: string | null,
    children: DataPrefectures,
}
export type Data = {
    [province: string]: DataProvince,
}
