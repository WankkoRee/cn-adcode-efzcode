export type DataCounty = {
    name: string,
    short: string | null,
    deprecated: string | null,
    ended: true,
}
export type DataZone = {
    name: string,
    short: string | null,
    deprecated: string | null,
    ended: true,
    parent: string | null,
}

export type DataCounties = {
    [county: string]: DataCounty,
}
export type DataZones = {
    [county: string]: DataZone,
}

export type DataPrefecture = {
    name: string,
    short: string | null,
    deprecated: string | null,
    ended: boolean,
    children: DataCounties,
}
export type DataClassification = {
    name: string,
    short: string | null,
    deprecated: string | null,
    ended: boolean,
    children: DataZones,
}

export type DataPrefectures = {
    [prefecture: string]: DataPrefecture,
}
export type DataClassifications = {
    [classification: string]: DataClassification,
}

export type DataProvince<T extends DataPrefectures | DataClassifications> = {
    name: string,
    short: string | null,
    deprecated: string | null,
    ended: boolean,
    children: T,
}

export type Data<T extends DataPrefectures | DataClassifications> = {
    [province: string]: DataProvince<T>,
}
