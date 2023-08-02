import data from './data/GB_T_2260.json'

export const province = (code: string) => {
    // @ts-ignore
    return data[code.substring(0, 2)];
}
