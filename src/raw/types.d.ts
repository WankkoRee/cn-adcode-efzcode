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
