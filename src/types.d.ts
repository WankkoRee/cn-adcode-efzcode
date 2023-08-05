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
