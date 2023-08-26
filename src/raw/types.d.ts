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
                        parent?: string | null,
                    },
                },
            },
        },
    },
}
