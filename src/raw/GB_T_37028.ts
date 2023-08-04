import { main as GB_T_37028_2018 } from './GB_T_37028/GB_T_37028_2018';
import {Data, update} from "./utils";

export async function main() {
    const data: Data<string | null> = {};

    update(data, await GB_T_37028_2018(), "GB/T 37028-2018");

    return data;
}
