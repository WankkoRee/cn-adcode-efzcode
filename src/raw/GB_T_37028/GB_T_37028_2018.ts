import * as fs from 'fs';
import pdfjs from "pdfjs-dist";
const { getDocument } = pdfjs;
import type {TextItem} from "pdfjs-dist/types/src/display/api";
import chalk from "chalk";
import type {DataRaw} from "../types";
import {short_province} from "../utils.js";

type CharMap = { [key: number]: string }

const udef: undefined = undefined;

const fontHeight = 8.25;

type Font = number | string;
type Str = {
    str: string,
    font: Font,
}
type TextBlock = {
    texts: Str[],
    x1: number, y1: number, x2: number, y2: number,
    width: number, height: number,
};

const charMap: {[key: Font]: CharMap } = {
    'E-BZ9': {
        0xff0d: '－',
        // 0xff10: '０', 0xff11: '１', 0xff12: '２', 0xff13: '３', 0xff14: '４', 0xff15: '５', 0xff16: '６', 0xff17: '７', // debug
        // 0xff18: '８', 0xff19: '９', // debug
        0xff10:  '0', 0xff11:  '1', 0xff12:  '2', 0xff13:  '3', 0xff14:  '4', 0xff15:  '5', 0xff16:  '6', 0xff17:  '7', // fact
        0xff18:  '8', 0xff19:  '9', // fact
        // 0xff20: udef, 0xff21: 'Ａ', 0xff22: 'Ｂ', 0xff23: 'Ｃ', 0xff24: 'Ｄ', 0xff25: 'Ｅ', 0xff26: 'Ｆ', 0xff27: 'Ｇ', // debug
        // 0xff28: 'Ｈ', 0xff29: 'Ｉ', 0xff2a: 'Ｊ', 0xff2b: 'Ｋ', 0xff2c: 'Ｌ', 0xff2d: 'Ｍ', 0xff2e: 'Ｎ', 0xff2f: 'Ｏ', // debug
        // 0xff30: 'Ｐ', 0xff31: 'Ｑ', 0xff32: 'Ｒ', 0xff33: 'Ｓ', 0xff34: 'Ｔ', 0xff35: 'Ｕ', 0xff36: 'Ｖ', 0xff37: 'Ｗ', // debug
        // 0xff38: 'Ｘ', 0xff39: 'Ｙ', 0xff3a: 'Ｚ', // debug
        0xff20: udef, 0xff21:  'A', 0xff22:  'B', 0xff23:  'C', 0xff24:  'D', 0xff25:  'E', 0xff26:  'F', 0xff27:  'G', // fact
        0xff28:  'H', 0xff29:  'I', 0xff2a:  'J', 0xff2b:  'K', 0xff2c:  'L', 0xff2d:  'M', 0xff2e:  'N', 0xff2f:  'O', // fact
        0xff30:  'P', 0xff31:  'Q', 0xff32:  'R', 0xff33:  'S', 0xff34:  'T', 0xff35:  'U', 0xff36:  'V', 0xff37:  'W', // fact
        0xff38:  'X', 0xff39:  'Y', 0xff3a:  'Z', // fact
    },
    'H-SS9': {
        0xb7: '·',
        0x2014: '—',
        0x3001: '、',
        0xff08: '（', 0xff09: '）', 0xff0d: '－',
    },
    1: {
        0x20:   '', 0x21: '前', 0x22: udef, 0x23: '范', 0x24: '围', 0x25: udef, 0x26: udef, 0x27: udef, 0x28: '用', 0x29: '文', 0x2a: udef, 0x2b: '术', 0x2c: udef, 0x2d: '和', 0x2e: '定', 0x2f: '义',
        0x30: '编', 0x31: udef, 0x32: '原', 0x33: udef, 0x34: '方', 0x35: '法', 0x36: '经', 0x37: '济', 0x38: '功', 0x39: '能', 0x3a: '区', 0x3b: '代', 0x3c: udef, 0x3d: udef, 0x3e: '考', 0x3f: '县',
        0x40: '全', 0x41: '国', 0x42: '主', 0x43: '要', 0x44: udef, 0x45: '型', 0x46: '技', 0x47: '开', 0x48: '发', 0x49: '共', 0x4a: '家', 0x4b: '级', 0x4c: '新', 0x4d: '高', 0x4e: '产', 0x4f: '业',
        0x50: '海', 0x51: '关', 0x52: '特', 0x53: '殊', 0x54: '监', 0x55: '管', 0x56: '域', 0x57: '边', 0x58: '境', 0x59: '合', 0x5a: '作', 0x5b: '跨', 0x5c: '自', 0x5d: '创', 0x5e: '示', 0x5f: '沿',
        0x60: '重', 0x61: '点', 0x62: '放', 0x63: '试', 0x64: '验', 0x65: '内', 0x66: '陆', 0x67: '由', 0x68: '贸', 0x69: '易', 0x6a: '可', 0x6b: '持', 0x6c: '续', 0x6d: '展', 0x6e: '议', 0x6f: '程',
        0x70: '其', 0x71: '他', 0x72: '北', 0x73: '京', 0x74: '市', 0x75: '省', 0x76: '天', 0x77: '津', 0x78: '河', 0x79: '山', 0x7a: '西', 0x7b: '蒙', 0x7c: '古', 0x7d: '治', 0x7e: '辽', 0x7f: '宁',
        0x80: '吉', 0x81: '林', 0x82: '黑', 0x83: '龙', 0x84: '江', 0x85: '上', 0x86: '苏', 0x87: '浙', 0x88: '安', 0x89: '徽', 0x8a: '福', 0x8b: '建', 0x8c: '东', 0x8d: '南', 0x8e: '湖', 0x8f: '广',
        0x90: '壮', 0x91: '族', 0x92: '庆', 0x93: '四', 0x94: '川', 0x95: '贵', 0x96: '州', 0x97: '云', 0x98: '藏', 0x99: '陕', 0x9a: '甘', 0x9b: '肃', 0x9c: '青', 0x9d: '夏', 0x9e: '回', 0x9f: '疆',
        0xa0: '维', 0xa1: '吾', 0xa2: '尔', 0xa3: '本', 0xa4: udef, 0xa5: '准', 0xa6: udef, 0xa7: '照', 0xa8: udef, 0xa9: '出', 0xaa: udef, 0xab: udef, 0xac: '草', 0xad: '现', 0xae: '息', 0xaf: udef,
        0xb0: '化', 0xb1: udef, 0xb2: udef, 0xb3: '会', 0xb4: udef, 0xb5: udef, 0xb6: '归', 0xb7: '口', 0xb8: udef, 0xb9: udef, 0xba: '中', 0xbb: '研', 0xbc: udef, 0xbd: '院', 0xbe: udef, 0xbf: '革',
        0xc0: '利', 0xc1: '外', 0xc2: '资', 0xc3: '投', 0xc4: udef, 0xc5: '科', 0xc6: '学', 0xc7: '部', 0xc8: '基', 0xc9: udef, 0xca: '商', 0xcb: '务', 0xcc: '理', 0xcd: udef, 0xce: udef, 0xcf: udef,
        0xd0: '计', 0xd1: '局', 0xd2: '设', 0xd3: '人', 0xd4: '朱', 0xd5: '虹', 0xd6: '咸', 0xd7: '奎', 0xd8: '桐', 0xd9: udef, 0xda: udef, 0xdb: '金', 0xdc: '胜', 0xdd: '陈', 0xde: '凯', 0xdf: udef,
        0xe0: '盛', 0xe1: udef, 0xe2: udef, 0xe3: '孙', 0xe4: '洪', 0xe5: udef, 0xe6: '张', 0xe7: '扬', 0xe8: '李', 0xe9: '莎', 0xea: '华', 0xeb: '王', 0xec: udef, 0xed: udef, 0xee: udef, 0xef: udef,
        0xf0: udef, 0xf1: '成', 0xf2: '立', 0xf3: udef, 0xf4: '及', 0xf5: '民', 0xf6: '政', 0xf7: '府', 0xf8: udef, 0xf9: '于', 0xfa: '库', 0xfb: udef, 0xfc: udef, 0xfd: udef, 0xfe: '交', 0xff: udef,
        0x0301: '提', 0x0304: '分',
        0x0327: '单',
    },
    2: {
        0x20:   '', 0x21: '下', 0x22: '列', 0x23: udef, 0x24: '应', 0x25: udef, 0x26: udef, 0x27: '不', 0x28: udef, 0x29: udef, 0x2a: udef, 0x2b: '日', 0x2c: udef, 0x2d: udef, 0x2e: udef, 0x2f: udef,
        0x30: '包', 0x31: udef, 0x32: udef, 0x33: '有', 0x34: '修', 0x35: '行', 0x36: udef, 0x37: '依', 0x38: udef, 0x39: '社', 0x3a: udef, 0x3b: udef, 0x3c: '任', 0x3d: '工', 0x3e: '通', 0x3f: udef,
        0x40: '公', 0x41: udef, 0x42: udef, 0x43: udef, 0x44: udef, 0x45: udef, 0x46: udef, 0x47: '别', 0x48: '地', 0x49: udef, 0x4a: '顺', 0x4b: udef, 0x4c: udef, 0x4d: udef, 0x4e: '如', 0x4f: '图',
        0x50: '属', 0x51: udef, 0x52: udef, 0x53: udef, 0x54: udef, 0x55: '采', 0x56: udef, 0x57: '第', 0x58: '大', 0x59: udef, 0x5a: udef, 0x5b: '名', 0x5c: udef, 0x5d: udef, 0x5e: '明', 0x5f: '城',
        0x60: udef, 0x61: udef, 0x62: udef, 0x63: udef, 0x64: udef, 0x65: '策', 0x66: '承', 0x67: udef, 0x68: udef, 0x69: udef, 0x6a: '综', 0x6b: '为', 0x6c: udef, 0x6d: '托', 0x6e: udef, 0x6f: '力',
        0x70: '密', 0x71: '集', 0x72: '环', 0x73: udef, 0x74: udef, 0x75: udef, 0x76: '施', 0x77: udef, 0x78: '项', 0x79: udef, 0x7a: '现', 0x7b: udef, 0x7c: udef, 0x7d: udef, 0x7e: udef, 0x7f: '度',
        0x80: udef, 0x81: '果', 0x82: '转', 0x83: '生', 0x84: '来', 0x85: udef, 0x86: '进', 0x87: udef, 0x88: '育', 0x89: '保', 0x8a: '税', 0x8b: '加', 0x8c: '物', 0x8d: '流', 0x8e: '园', 0x8f: '港',
        0x90: udef, 0x91: udef, 0x92: udef, 0x93: udef, 0x94: '旅', 0x95: '游', 0x96: udef, 0x97: '邻', 0x98: '根', 0x99: udef, 0x9a: udef, 0x9b: '接', 0x9c: udef, 0x9d: '同', 0x9e: udef, 0x9f: '益',
        0xa0: '个', 0xa1: udef, 0xa2: udef, 0xa3: udef, 0xa4: udef, 0xa5: udef, 0xa6: udef, 0xa7: udef, 0xa8: udef, 0xa9: '平', 0xaa: '台', 0xab: '制', 0xac: '机', 0xad: '周', 0xae: '招', 0xaf: udef,
        0xb0: udef, 0xb1: '聚', 0xb2: '增', 0xb3: '长', 0xb4: udef, 0xb5: udef, 0xb6: udef, 0xb7: '色', 0xb8: udef, 0xb9: '营', 0xba: udef, 0xbb: udef, 0xbc: '强', 0xbd: '态', 0xbe: udef, 0xbf: '征',
        0xc0: '核', 0xc1: '心', 0xc2: udef, 0xc3: udef, 0xc4: udef, 0xc5: udef, 0xc6: '造', 0xc7: '际', 0xc8: '积', 0xc9: udef, 0xca: udef, 0xcb: '深', 0xcc: udef, 0xcd: udef, 0xce: udef, 0xcf: udef,
        0xd0: '诺', 0xd1: udef, 0xd2: udef, 0xd3: '针', 0xd4: udef, 0xd5: udef, 0xd6: udef, 0xd7: udef, 0xd8: udef, 0xd9: udef, 0xda: udef, 0xdb: '临', 0xdc: '衡', 0xdd: udef, 0xde: '调', 0xdf: udef,
        0xe0: udef, 0xe1: udef, 0xe2: udef, 0xe3: '从', 0xe4: '始', 0xe5: udef, 0xe6: udef, 0xe7: udef, 0xe8: udef, 0xe9: udef, 0xea: udef, 0xeb: '再', 0xec: udef, 0xed: '武', 0xee: '清', 0xef: '子',
        0xf0: '牙', 0xf1: '辰', 0xf2: '丽', 0xf3: '秦', 0xf4: '皇', 0xf5: '岛', 0xf6: '廊', 0xf7: '坊', 0xf8: '沧', 0xf9: '石', 0xfa: '庄', 0xfb: '唐', 0xfc: '曹', 0xfd: '妃', 0xfe: '甸', 0xff: '邯',
        0x0301: '极', 0x0304: '路',
        0x03bc: '布',
    },
    3: {
        0x20:   '', 0x21: '郸', 0x22: '太', 0x23: '晋', 0x24: '呼', 0x25: '浩', 0x26: '巴', 0x27: '彦', 0x28: '卓', 0x29: '伦', 0x2a: '贝', 0x2b: '连', 0x2c: '沈', 0x2d: '阳', 0x2e: '兴', 0x2f: '锦',
        0x30: '辉', 0x31: '盘', 0x32: '滨', 0x33: '铁', 0x34: '岭', 0x35: '春', 0x36: '红', 0x37: '嘴', 0x38: '汽', 0x39: '车', 0x3a: '松', 0x3b: '哈', 0x3c: '宾', 0x3d: '绥', 0x3e: '牡', 0x3f: '丹',
        0x40: '双', 0x41: '鸭', 0x42: '闵', 0x43: '桥', 0x44: '漕', 0x45: '泾', 0x46: '昆', 0x47: '徐', 0x48: '镇', 0x49: '吴', 0x4a: '常', 0x4b: '熟', 0x4c: '淮', 0x4d: '盐', 0x4e: '锡', 0x4f: '仓',
        0x50: '靖', 0x51: '皋', 0x52: '门', 0x53: '宿', 0x54: '迁', 0x55: '宜', 0x56: '浒', 0x57: '墅', 0x58: '沭', 0x59: '相', 0x5a: '波', 0x5b: '温', 0x5c: '榭', 0x5d: '杭', 0x5e: '萧', 0x5f: '嘉',
        0x60: '绍', 0x61: '袍', 0x62: '善', 0x63: '衢', 0x64: '乌', 0x65: '余', 0x66: '富', 0x67: '柯', 0x68: '湾', 0x69: '虞', 0x6a: '水', 0x6b: '芜', 0x6c: '肥', 0x6d: '马', 0x6e: '鞍', 0x6f: '铜',
        0x70: '陵', 0x71: '滁', 0x72: '池', 0x73: '六', 0x74: '宣', 0x75: '厦', 0x76: '融', 0x77: '侨', 0x78: '漳', 0x79: '泉', 0x7a: '岩', 0x7b: '昌', 0x7c: '九', 0x7d: '赣', 0x7e: '井', 0x7f: '冈',
        0x80: '饶', 0x81: '萍', 0x82: '乡', 0x83: '小', 0x84: '蓝', 0x85: '瑞', 0x86: '烟', 0x87: '威', 0x88: '潍', 0x89: '邹', 0x8a: '沂', 0x8b: '远', 0x8c: '德', 0x8d: '胶', 0x8e: '聊', 0x8f: '郑',
        0x90: '封', 0x91: '鹤', 0x92: '壁', 0x93: '漯', 0x94: '许', 0x95: '洛', 0x96: '旗', 0x97: '渠', 0x98: '濮', 0x99: '汉', 0x9a: '黄', 0x9b: '襄', 0x9c: '空', 0x9d: '荆', 0x9e: '鄂', 0x9f: '葛',
        0xa0: '店', 0xa1: '十', 0xa2: '堰', 0xa3: '沙', 0xa4: '岳', 0xa5: '湘', 0xa6: '潭', 0xa7: '浏', 0xa8: udef, 0xa9: '底', 0xaa: '望', 0xab: '湛', 0xac: '惠', 0xad: '亚', 0xae: '珠', 0xaf: udef,
        0xb0: '盟', 0xb1: '洋', 0xb2: '浦', 0xb3: '万', 0xb4: udef, 0xb5: udef, 0xb6: '遂', 0xb7: '绵', 0xb8: udef, 0xb9: '遵', 0xba: '曲', 0xbb: '嵩', 0xbc: '杨', 0xbd: '拉', 0xbe: '萨', 0xbf: '航',
        0xc0: '榆', 0xc1: '兰', 0xc2: '酒', 0xc3: '掖', 0xc4: '格', 0xc5: '木', 0xc6: '仑', 0xc7: '银', 0xc8: '鲁', 0xc9: '齐', 0xca: '勒', 0xcb: '屯', 0xcc: '独', 0xcd: '阿', 0xce: '五', 0xcf: '堡',
        0xd0: '雄', 0xd1: '普', 0xd2: '舟', 0xd3: '群', 0xd4: '岸', 0xd5: '两', 0xd6: '滇', 0xd7: '村', 0xd8: '燕', 0xd9: '郊', 0xda: '头', 0xdb: '稀', 0xdc: '土', 0xdd: '多', 0xde: '斯', 0xdf: '溪',
        0xe0: '阜', 0xe1: '延', 0xe2: '净', 0xe3: '月', 0xe4: '医', 0xe5: '药', 0xe6: '紫', 0xe7: '竹', 0xe8: '无', 0xe9: '泰', 0xea: '阴', 0xeb: '秀', 0xec: '洲', 0xed: '莫', 0xee: '干', 0xef: '蚌',
        0xf0: '埠', 0xf1: '慈', 0xf2: '狮', 0xf3: '火', 0xf4: '炬', 0xf5: '莆', 0xf6: '田', 0xf7: '三', 0xf8: '景', 0xf9: '鹰', 0xfa: '抚', 0xfb: '丰', 0xfc: '淄', 0xfd: '博', 0xfe: '枣', 0xff: '莱',
        0x0301: '寿', 0x0304: '钦', 0x0308: '娄',
        0x0327: '元',
        0x03bc: '都',
    },
    4: {
        0x20:   '', 0x21: '角', 0x22: '农', 0x23: '顶', 0x24: '焦', 0x25: '孝', 0x26: '感', 0x27: '随', 0x28: '仙', 0x29: '桃', 0x2a: '潜', 0x2b: '冶', 0x2c: '株', 0x2d: '郴', 0x2e: '怀', 0x2f: '圳',
        0x30: '佛', 0x31: '仲', 0x32: '恺', 0x33: '肇', 0x34: '莞', 0x35: '源', 0x36: '汕', 0x37: '茂', 0x38: '桂', 0x39: '柳', 0x3a: '璧', 0x3b: '荣', 0x3c: '永', 0x3d: '贡', 0x3e: '乐', 0x3f: '泸',
        0x40: '攀', 0x41: '枝', 0x42: '花', 0x43: '钒', 0x44: '钛', 0x45: '玉', 0x46: '楚', 0x47: '宝', 0x48: '鸡', 0x49: '凌', 0x4a: '渭', 0x4b: '康', 0x4c: '白', 0x4d: '兵', 0x4e: '团', 0x4f: '竺',
        0x50: '满', 0x51: '里', 0x52: '窑', 0x53: '隆', 0x54: '珲', 0x55: '芬', 0x56: '场', 0x57: '奉', 0x58: '贤', 0x59: '片', 0x5a: '梅', 0x5b: '象', 0x5c: '屿', 0x5d: '卧', 0x5e: '矶', 0x5f: '澳',
        0x60: '栏', 0x61: '凭', 0x62: '祥', 0x63: '寸', 0x64: '滩', 0x65: '霍', 0x66: '配', 0x67: '套', 0x68: '喀', 0x69: '什', 0x6a: '二', 0x6b: '畹', 0x6c: '町', 0x6d: '伊', 0x6e: '塔', 0x6f: '乃',
        0x70: '老', 0x71: '挝', 0x72: '磨', 0x73: '憨', 0x74: '丁', 0x75: '半', 0x76: '淄', 0x77: '勐', 0x78: '腊', 0x79: '俄', 0x7a: '互', 0x7b: '峡', 0x7c: '假', 0x7d: '端', 0x7e: '装', 0x7f: '备',
        0x80: '夫', 0x81: '卡', 0x82: '佘', 0x83: '之', 0x84: '杏', 0x85: '夷', 0x86: '湄', 0x87: '美', 0x88: '含', 0x89: '良', 0x8a: '八', 0x8b: '达', 0x8c: '谷', 0x8d: '雁', 0x8e: '栖', 0x8f: '房',
        0x90: '汤', 0x91: '蓟', 0x92: '坻', 0x93: '静', 0x94: '军', 0x95: '粮', 0x96: '潘', 0x97: '邱', 0x98: '专', 0x99: '骅', 0x9a: '鹿', 0x9b: '香', 0x9c: '邢', 0x9d: '戴', 0x9e: '丘', 0x9f: '碑',
        0xa0: '霸', 0xa1: '涉', 0xa2: '县', 0xa3: '滦', 0xa4: '芦', 0xa5: '黎', 0xa6: '辛', 0xa7: '逐', 0xa8: udef, 0xa9: '赤', 0xaa: '泽', 0xab: '赵', 0xac: '旭', 0xad: '宫', 0xae: '宽', 0xaf: udef,
        0xb0: '孟', 0xb1: '泊', 0xb2: '邑', 0xb3: '赞', 0xb4: udef, 0xb5: udef, 0xb6: '润', 0xb7: '馆', 0xb8: udef, 0xb9: '魏', 0xba: '巨', 0xbb: '涞', 0xbc: '蔚', 0xbd: '皮', 0xbe: '服', 0xbf: '宗',
        0xc0: '陉', 0xc1: '灵', 0xc2: '氏', 0xc3: '磁', 0xc4: '野', 0xc5: '沽', 0xc6: '峰', 0xc7: '冀', 0xc8: '固', 0xc9: '厂', 0xca: '滏', 0xcb: '正', 0xcc: '年', 0xcd: '矿', 0xce: '轴', 0xcf: '风',
        0xd0: '渡', 0xd1: '朔', 0xd2: '忻', 0xd3: '运', 0xd4: '汾', 0xd5: '侯', 0xd6: '绛', 0xd7: '祁', 0xd8: '壶', 0xd9: '锈', 0xda: '钢', 0xdb: '次', 0xdc: '克', 0xdd: '郭', 0xde: '庙', 0xdf: '喇',
        0xe0: '沁', 0xe1: '卓', 0xe2: '鸿', 0xe3: '裕', 0xe4: '铝', 0xe5: '瓦', 0xe6: '虎', 0xe7: '察', 0xe8: '磴', 0xe9: '后', 0xea: '拐', 0xeb: '雅', 0xec: '右', 0xed: '左', 0xee: '扎', 0xef: '毛',
        0xf0: '音', 0xf1: '循', 0xf2: '移', 0xf3: '赉', 0xf4: '突', 0xf5: '额', 0xf6: '纳', 0xf7: '氟', 0xf8: '腾', 0xf9: '前', 0xfa: '鳌', 0xfb: '道', 0xfc: '票', 0xfd: '炮', 0xfe: '楼', 0xff: '葫',
        0x0301: '柏', 0x0304: '光', 0x0308: '故',
        0x0327: '陶',
        0x03bc: '坡',
    },
    5: {
        0x20:   '', 0x21: '雪', 0x22: '浑', 0x23: '欧', 0x24: '沟', 0x25: '帮', 0x26: '杖', 0x27: '女', 0x28: '庞', 0x29: '七', 0x2a: '首', 0x2b: '近', 0x2c: '品', 0x2d: '精', 0x2e: '细', 0x2f: '材',
        0x30: '料', 0x31: '洼', 0x32: '敦', 0x33: '们', 0x34: '宇', 0x35: '船', 0x36: '桦', 0x37: '磐', 0x38: '绿', 0x39: '树', 0x3a: '舒', 0x3b: '鑫', 0x3c: '洮', 0x3d: '梨', 0x3e: '蛟', 0x3f: '岗',
        0x40: '洁', 0x41: '扶', 0x42: '汪', 0x43: '佳', 0x44: '逊', 0x45: '荒', 0x46: '尚', 0x47: '志', 0x48: '穆', 0x49: '棱', 0x4a: '牛', 0x4b: '讷', 0x4c: '奇', 0x4d: '玛', 0x4e: '戈', 0x4f: '煤',
        0x50: '电', 0x51: '友', 0x52: '谊', 0x53: '拜', 0x54: '岔', 0x55: '漠', 0x56: '铃', 0x57: '薯', 0x58: '荫', 0x59: '勃', 0x5a: '未', 0x5b: '汇', 0x5c: '闸', 0x5d: '陀', 0x5e: '崇', 0x5f: '星',
        0x60: '莘', 0x61: '朱', 0x62: '溧', 0x63: '坛', 0x64: '启', 0x65: '仪', 0x66: '邮', 0x67: '姜', 0x68: '蠡', 0x69: '射', 0x6a: '徒', 0x6b: '句', 0x6c: '容', 0x6d: '淳', 0x6e: '响', 0x6f: '雨',
        0x70: '睢', 0x71: '沛', 0x72: '灌', 0x73: '盱', 0x74: '眙', 0x75: '涟', 0x76: '泗', 0x77: '邳', 0x78: '钟', 0x79: '吕', 0x7a: '瓷', 0x7b: '乍', 0x7c: '姚', 0x7d: '浔', 0x7e: '庐', 0x7f: '瓯',
        0x80: '诸', 0x81: '暨', 0x82: '嵊', 0x83: '岱', 0x84: '钱', 0x85: '居', 0x86: '缙', 0x87: '鄞', 0x88: '轻', 0x89: '苍', 0x8a: '织', 0x8b: '珍', 0x8c: '横', 0x8d: '亳', 0x8e: '巢', 0x8f: '濉',
        0x90: '叶', 0x91: '凤', 0x92: '涡', 0x93: '颍', 0x94: '椒', 0x95: '鸠', 0x96: '至', 0x97: '枞', 0x98: '蜀', 0x99: '谯', 0x9a: '当', 0x9b: '涂', 0x9c: '歙', 0x9d: '郎', 0x9e: '杜', 0x9f: '休',
        0xa0: '黟', 0xa1: '砀', 0xa2: '绩', 0xa3: '旌', 0xa4: '汊', 0xa5: '凰', 0xa6: '界', 0xa7: '站', 0xa8: udef, 0xa9: '寨', 0xaa: '闽', 0xab: '罗', 0xac: '尤', 0xad: '荔', 0xae: '霄', 0xaf: udef,
        0xb0: '邵', 0xb1: '将', 0xb2: '柘', 0xb3: '霞', 0xb4: udef, 0xb5: udef, 0xb6: '鼎', 0xb7: '屏', 0xb8: udef, 0xb9: '弋', 0xba: '堎', 0xbb: '彭', 0xbc: '莲', 0xbd: '樟', 0xbe: '载', 0xbf: '铅',
        0xc0: '鄱', 0xc1: '婺', 0xc2: '仁', 0xc3: '犹', 0xc4: '寻', 0xc5: '梁', 0xc6: '即', 0xc7: '墨', 0xc8: '桓', 0xc9: '滕', 0xca: '牟', 0xcb: '蓬', 0xcc: '兖', 0xcd: '登', 0xce: '乳', 0xcf: '菏',
        0xd0: '朐', 0xd1: '岚', 0xd2: '垦', 0xd3: '薛', 0xd4: '峄', 0xd5: '亭', 0xd6: '儿', 0xd7: '鱼', 0xd8: '汶', 0xd9: '莒', 0xda: '费', 0xdb: '郯', 0xdc: '冠', 0xdd: '沾', 0xde: '微', 0xdf: '茌',
        0xe0: '槐', 0xe1: '棣', 0xe2: '鄄', 0xe3: '郓', 0xe4: '硅', 0xe5: '驻', 0xe6: '潢', 0xe7: '郏', 0xe8: '陟', 0xe9: '权', 0xea: '宛', 0xeb: '舞', 0xec: '爱', 0xed: '淅', 0xee: '滑', 0xef: '浚',
        0xf0: '淇', 0xf1: '卫', 0xf2: '鄢', 0xf3: '澧', 0xf4: '卢', 0xf5: '邓', 0xf6: '巩', 0xf7: '汴', 0xf8: '杞', 0xf9: '尉', 0xfa: '栾', 0xfb: '汝', 0xfc: '偃', 0xfd: '师', 0xfe: '纺', 0xff: '获',
        0x0301: '诏', 0x0304: '雷', 0x0308: '繁',
        0x0327: '章',
        0x03bc: '翔',
    },
    6: {
        0x20:   '', 0x21: '垣', 0x22: '禹', 0x23: '渑', 0x24: '召', 0x25: '官', 0x26: '蔡', 0x27: '舆', 0x28: '确', 0x29: '泌', 0x2a: '恩', 0x2b: '麻', 0x2c: '穴', 0x2d: '樊', 0x2e: '悟', 0x2f: '浠',
        0x30: '滋', 0x31: '秭', 0x32: '逻', 0x33: '硚', 0x34: '郧', 0x35: '英', 0x36: '蕲', 0x37: '时', 0x38: '伍', 0x39: '塞', 0x3a: '神', 0x3b: '架', 0x3c: '冷', 0x3d: '耒', 0x3e: '茶', 0x3f: '渌',
        0x40: '洞', 0x41: '禾', 0x42: '醴', 0x43: '暮', 0x44: '塘', 0x45: '沅', 0x46: '韶', 0x47: '汨', 0x48: '零', 0x49: '麓', 0x4a: '攸', 0x4b: '炎', 0x4c: '桑', 0x4d: '植', 0x4e: '晃', 0x4f: '荷',
        0x50: '君', 0x51: '牌', 0x52: '溆', 0x53: '芷', 0x54: '丈', 0x55: '步', 0x56: '翁', 0x57: '潮', 0x58: '揭', 0x59: '尾', 0x5a: '闻', 0x5b: '鉴', 0x5c: '廉', 0x5d: '禅', 0x5e: '浮', 0x5f: '澄',
        0x60: '榕', 0x61: '埔', 0x62: '联', 0x63: '蕉', 0x64: '翠', 0x65: '粤', 0x66: '奋', 0x67: '勇', 0x68: '郁', 0x69: '梧', 0x6a: '百', 0x6b: '街', 0x6c: '贺', 0x6d: '旺', 0x6e: '藤', 0x6f: '防',
        0x70: '企', 0x71: '渝', 0x72: '足', 0x73: '潼', 0x74: '涛', 0x75: '坪', 0x76: '坝', 0x77: '涪', 0x78: '垫', 0x79: '綦', 0x7a: '忠', 0x7b: '巫', 0x7c: '柱', 0x7d: '酉', 0x7e: '节', 0x7f: '充',
        0x80: '蒲', 0x81: '邛', 0x82: '崃', 0x83: '眉', 0x84: '夹', 0x85: '简', 0x86: '峨', 0x87: '陇', 0x88: '荥', 0x89: '昭', 0x8a: '筠', 0x8b: '晨', 0x8c: '珙', 0x8d: '冕', 0x8e: '犍', 0x8f: '邡',
        0x90: '蔺', 0x91: '剑', 0x92: '阁', 0x93: '梓', 0x94: '蓥', 0x95: '阆', 0x96: '潆', 0x97: '堂', 0x98: '羊', 0x99: '油', 0x9a: '叙', 0x9b: '孜', 0x9c: '棉', 0x9d: '效', 0x9e: '匀', 0x9f: '毕',
        0xa0: '炉', 0xa1: '碧', 0xa2: '贯', 0xa3: '烽', 0xa4: '黔', 0xa5: '瓮', 0xa6: '雍', 0xa7: '穗', 0xa8: udef, 0xa9: '习', 0xaa: '印', 0xab: '思', 0xac: '迪', 0xad: '冲', 0xae: '涧', 0xaf: udef,
        0xb0: '彝', 0xb1: '洱', 0xb2: '芒', 0xb3: '禄', 0xb4: udef, 0xb5: udef, 0xb6: '旧', 0xb7: '财', 0xb8: udef, 0xb9: '巍', 0xba: '栗', 0xbb: '呈', 0xbc: '那', 0xbd: '浐', 0xbe: '韩', 0xbf: '旬',
        0xc0: '户', 0xc1: '沣', 0xc2: '灞', 0xc3: '乾', 0xc4: '礼', 0xc5: '彬', 0xc6: '苹', 0xc7: '硒', 0xc8: '韦', 0xc9: '峪', 0xca: '岷', 0xcb: '凉', 0xcc: '驿', 0xcd: '勤', 0xce: '浪', 0xcf: '祝',
        0xd0: '刘', 0xd1: '宕', 0xd2: '煌', 0xd3: '柴', 0xd4: '旦', 0xd5: '令', 0xd6: '热', 0xd7: '炭', 0xd8: '助', 0xd9: '贫', 0xda: '硕', 0xdb: '鄯', 0xdc: '吐', 0xdd: '番', 0xde: '轮', 0xdf: '疏',
        0xe0: '蕴', 0xe1: '伽', 0xe2: '若', 0xe3: '羌', 0xe4: '垒', 0xe5: '算', 0xe6: '焉', 0xe7: '耆', 0xe8: '麦', 0xe9: '盖', 0xea: '恰', 0xeb: '犁', 0xec: udef, 0xed: udef, 0xee: udef, 0xef: udef,
        0xf0: udef, 0xf1: udef, 0xf2: udef, 0xf3: udef, 0xf4: udef, 0xf5: udef, 0xf6: udef, 0xf7: udef, 0xf8: udef, 0xf9: udef, 0xfa: udef, 0xfb: udef, 0xfc: udef, 0xfd: udef, 0xfe: udef, 0xff: udef,
        0x0301: '劝', 0x0304: '就', 0x0308: '岑',
        0x0327: '伏',
        0x03bc: '砚',
    },
};

function EncodeUnicode(unicode: number) {
    const charCode = unicode.toString(16);
    return '\\u' + '0'.repeat(4 - charCode.length) + charCode;
}

function mapString(s: Str, color: string = "") {
    let flag = false;
    const mapResult = s.str.split("").map((c, i) => {
        const unicode = c.charCodeAt(0);
        const char = charMap[s.font][unicode];
        if (char === udef) {
            flag = true;
            return EncodeUnicode(unicode);
        }
        return char;
    }).join("");
    return (flag ? chalk.bgHex("#a4b0be")('|'+s.font+'|') : "") + (color ? chalk.bgHex(color)(mapResult) : mapResult);
}

async function *parsePDF(data: Uint8Array) {
    const task = getDocument({
        data: data,
        isEvalSupported: false,
    });
    const pdf = await task.promise;
    for (const pageNumber of Array.from({length: pdf.numPages}, (_, i) => 1 + i)) {
        const page = await pdf.getPage(pageNumber);
        await page.getOperatorList(); // 加载字体
        const text: TextBlock[] = (await page.getTextContent({
            normalizeWhitespace: false,
            disableCombineTextItems: false,
            includeMarkedContent: false,
        })).items.map((text) => {
            const isTextItem = (value: any): value is TextItem => value && value.str != undefined;
            if (isTextItem(text)) {
                if (text.transform[0] !== text.height || text.transform[3] !== text.height) {
                    return undefined;
                }
                if (text.transform[1] !== 0 || text.transform[2] !== 0) {
                    return undefined;
                }
                const font = page.commonObjs.get(text.fontName);
                const x = text.transform[4] as number;
                const w = text.width / text.height * fontHeight;
                const y = text.transform[5] as number;
                const h = fontHeight;

                if (font.type === "CIDFontType0" && font.subtype === "CIDFontType0C") {
                    return {
                        texts: [{
                            str: text.str,
                            font: /^([A-Z0-9\-]+)-PK748(.+?)$/.exec(font.name)[1],
                        }],
                        x1: x,
                        x2: x+w,
                        y1: y+h,
                        y2: y,
                        width: w,
                        height: h,
                    };
                } else if (font.type === "Type1" && font.subtype === "Type1C") {
                    return {
                        texts: [{
                            str: text.str,
                            font: Number(/^([A-Z]{6})\+FzBookMaker(?<type>[0-9])DlFont\k<type>([0-9]{10})$/.exec(font.name)[2]),
                        }],
                        x1: x,
                        x2: x+w,
                        y1: y+h,
                        y2: y,
                        width: w,
                        height: h,
                    };
                }
                else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        }).filter((text) =>  text != undefined && text.texts[0].str.length != 0) as TextBlock[];

        // 横向拼接多字
        let flag = false;
        do {
            flag = false;
            let p = 0;
            while (p < text.length) {
                let q = 0;
                while (q < text.length) {
                    if (p === q) {
                        q++;
                        continue;
                    }
                    const padding = (
                        typeof text[p].texts.at(-1).font === "number" && typeof text[q].texts[0].font === "string"
                        || typeof text[p].texts.at(-1).font === "string" && typeof text[q].texts[0].font === "number"
                    ) ? fontHeight / 2 : 0;
                    const xd = text[q].x1 - text[p].x2;
                    const yd = Math.abs(text[q].y1 - text[p].y1);
                if ((-fontHeight / 4 <= xd && xd <= fontHeight / 4 + padding) && yd <= fontHeight / 2) {
                        text[p].texts.push(...text[q].texts);
                        text[p].x2 = text[q].x2;
                        text[p].width += text[p].x2 - text[p].x1;
                        if (text[p].y1 > text[q].y1) {
                            if (text[p].y2 > text[q].y2) {
                                text[p].y1 = text[p].y1;
                                text[p].y2 = text[q].y2;
                            } else if (text[p].y2 < text[q].y2) {
                                text[p].y1 = text[p].y1;
                                text[p].y2 = text[p].y2;
                            }
                        } else if (text[p].y1 < text[q].y1) {
                            if (text[p].y2 > text[q].y2) {
                                text[p].y1 = text[q].y1;
                                text[p].y2 = text[q].y2;
                            } else if (text[p].y2 < text[q].y2) {
                                text[p].y1 = text[q].y1;
                                text[p].y2 = text[p].y2;
                            }
                        }
                        text[p].height = text[p].y1 - text[p].y2;
                        text.splice(q, 1);
                        if (q < p) {
                            p--;
                        }
                        flag = true;
                        continue;
                    }
                    q++;
                }
                p++;
            }
        } while (flag);

        // 纵向拼接多行
        flag = false;
        do {
            flag = false;
            let p = 0;
            while (p < text.length) {
                let q = 0;
                while (q < text.length) {
                    if (p === q) {
                        q++;
                        continue;
                    }
                    const yd = text[p].y1 - text[q].y1;
                    if ((0 <= yd && yd <= fontHeight * 1.75) && (
                        text[p].x1 < text[q].x1 && text[p].x2 > text[q].x1
                        || text[q].x1 < text[p].x1 && text[q].x2 > text[p].x1
                    )) {
                        text[p].texts.push(...text[q].texts);
                        text[p].y2 = text[q].y2;
                        text[p].height += text[p].y1 - text[p].y2;
                        if (text[p].x1 > text[q].x1) {
                            if (text[p].x2 > text[q].x2) {
                                text[p].x1 = text[q].x1;
                                text[p].x2 = text[p].x2;
                            } else if (text[p].x2 < text[q].x2) {
                                text[p].x1 = text[q].x1;
                                text[p].x2 = text[q].x2;
                            }
                        } else if (text[p].x1 < text[q].x1) {
                            if (text[p].x2 > text[q].x2) {
                                text[p].x1 = text[p].x1;
                                text[p].x2 = text[p].x2;
                            } else if (text[p].x2 < text[q].x2) {
                                text[p].x1 = text[p].x1;
                                text[p].x2 = text[q].x2;
                            }
                        }
                        text[p].width = text[p].x2 - text[p].x1;
                        text.splice(q, 1);
                        if (q < p) {
                            p--;
                        }
                        flag = true;
                        continue;
                    }
                    q++;
                }
                p++;
            }
        } while (flag);

        // 拼接相同字体
        for (let i = 0; i < text.length - 1;i++) {
            let j = 0;
            while (j+1 < text[i].texts.length) {
                if (text[i].texts[j].font === text[i].texts[j + 1].font) {
                    text[i].texts[j].str += text[i].texts[j + 1].str;
                    text[i].texts.splice(j + 1, 1);
                    continue;
                }
                j++;
            }
        }

        yield {pageNumber, text};
    }
    await pdf.destroy();
}

export const main = async () => {
    const colors: {[key: Font]: string} = {
        1: "#ffc9c9",
        2: "#ffd8a8",
        3: "#ffec99",
        4: "#b2f2bb",
        5: "#a5d8ff",
        6: "#99e9f2",
        7: "#d0bfff",
    }

    const result: DataRaw = {};

    for await (const {pageNumber: page, text: text} of parsePDF(new Uint8Array(fs.readFileSync("./src/raw/GB_T 37028-2018《全国主要经济功能区分类与代码》.pdf")))) {
        console.log(`====${page}====`)
        let i = 0;
        while (i < text.length) {
            if (text[i].texts.length === 1 && /^[０１２３４５６７８９]{8}$/.test(text[i].texts[0].str)) {
                const code = mapString(text[i].texts[0]); //, "#bcd4e7");

                const province_name = text[++i].texts.map((c) =>  mapString(c)).join("");
                const classification_name = text[++i].texts.map((c) =>  mapString(c)).join("");
                const zone_name = text[++i].texts.map((c) =>  mapString(c)).join("");

                console.log(
                    code,
                    province_name,
                    classification_name,
                    zone_name,
                );

                const province_code = code.substring(0, 2);
                const classification_code = code.substring(2, 5);
                const zone_code = code.substring(5, 8);

                if (!result[province_code]) {
                    result[province_code] = {
                        name: province_name,
                        short: short_province(province_name),
                        children: {},
                    }
                }
                if (!result[province_code].children[classification_code]) {
                    result[province_code].children[classification_code] = {
                        name: classification_name,
                        short: '',
                        children: {},
                    }
                }
                result[province_code].children[classification_code].children[zone_code] = {
                    name: zone_name,
                    short: null,
                    parent: null,
                }
            }
            i++;
        }
    }
    const filename = './src/raw/GB_T_37028/data/GB_T 37028-2018.json';
    if (fs.existsSync(filename)) {
        Object.entries((JSON.parse(fs.readFileSync(filename, 'utf-8')) as DataRaw)).map(([province_code, province_data], ) => {
            Object.entries(province_data.children).map(([classification_code, classification_data], ) => {
                Object.entries(classification_data.children).map(([zone_code, zone_data], ) => {
                    if (
                        zone_data.parent !== undefined && zone_data.parent !== null
                        && result[province_code]
                        && result[province_code].children[classification_code]
                        && result[province_code].children[classification_code].children[zone_code]
                    ) {
                        result[province_code].children[classification_code].children[zone_code].parent = zone_data.parent;
                        if (zone_data.short)
                            result[province_code].children[classification_code].children[zone_code].short = zone_data.short;
                    }
                });
            });
        });
    }

    fs.writeFileSync(filename, JSON.stringify(result, null, 2), 'utf-8');

    return result;
}
