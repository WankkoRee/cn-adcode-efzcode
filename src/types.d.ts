export type DataCounty = {
    name: string,
    short: string | null,
    deprecated: string | null,
}
export type DataZone = {
    name: string,
    short: string | null,
    deprecated: string | null,
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
    children: DataCounties,
}
export type DataClassification = {
    name: string,
    short: string | null,
    deprecated: string | null,
    children: DataZones,
}

export type DataPrefectures = {
    [prefecture: string]: DataPrefecture,
}
export type DataClassifications = {
    [classification: string]: DataClassification,
}

export type DataProvince = {
    name: string,
    short: string | null,
    deprecated: string | null,
    children: DataPrefectures | DataClassification,
}

export type Data = {
    [province: string]: DataProvince,
}
