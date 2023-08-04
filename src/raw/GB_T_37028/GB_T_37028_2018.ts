import * as fs from 'fs';
import {PdfData} from "pdfdataextract/dist/pdfdata";

export const main = async () => {
    const pdfRule = /([０１２３４５６７８９]{8}) \n([\s\S]+?) ([\s\S]+?) ([\s\S]+?)\n/g;

    const pdf = (await PdfData.extract(fs.readFileSync("./src/raw/GB_T 37028-2018《全国主要经济功能区分类与代码》.pdf"), {
        sort: false, // sort the text by text coordinates
        get: {
            pages: false,
            text: true,
            fingerprint: false,
            outline: false,
            metadata: false,
            info: false,
            permissions: false,
        },
    })).text!.join('\n')

    let result = Array.from(pdf.matchAll(pdfRule));
    console.log(result);

    return {}
}
