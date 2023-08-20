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
        0x2014: '—',
        0x3001: '、',
        0xff08: '（', 0xff09: '）', 0xff0d: '－',
    },
    1: {
        0x20:  ' ', 0x21: '前', 0x22: udef, 0x23: '范', 0x24: '围', 0x25: udef, 0x26: udef, 0x27: udef, 0x28: '用', 0x29: '文', 0x2a: udef, 0x2b: '术', 0x2c: udef, 0x2d: '和', 0x2e: '定', 0x2f: '义',
        0x30: '编', 0x31: udef, 0x32: '原', 0x33: udef, 0x34: '方', 0x35: '法', 0x36: '经', 0x37: '济', 0x38: '功', 0x39: '能', 0x3a: '区', 0x3b: '代', 0x3c: udef, 0x3d: udef, 0x3e: '考', 0x3f: '县',
        0x40: '全', 0x41: '国', 0x42: '主', 0x43: '要', 0x44: udef, 0x45: '型', 0x46: '技', 0x47: '开', 0x48: '发', 0x49: '共', 0x4a: '家', 0x4b: '级', 0x4c: '新', 0x4d: '高', 0x4e: '产', 0x4f: '业',
        0x50: '海', 0x51: '关', 0x52: '特', 0x53: '殊', 0x54: '监', 0x55: '管', 0x56: '域', 0x57: '边', 0x58: '境', 0x59: '合', 0x5a: '作', 0x5b: '跨', 0x5c: '自', 0x5d: '创', 0x5e: '示', 0x5f: '沿',
        0x60: '重', 0x61: '点', 0x62: '放', 0x63: '试', 0x64: '验', 0x65: '内', 0x66: '陆', 0x67: '由', 0x68: '贸', 0x69: '易', 0x6a: udef, 0x6b: udef, 0x6c: udef, 0x6d: '展', 0x6e: udef, 0x6f: udef,
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
        0x20:  ' ', 0x21: udef, 0x22: udef, 0x23: udef, 0x24: udef, 0x25: udef, 0x26: udef, 0x27: udef, 0x28: udef, 0x29: udef, 0x2a: udef, 0x2b: '日', 0x2c: udef, 0x2d: udef, 0x2e: udef, 0x2f: udef,
        0x30: '包', 0x31: udef, 0x32: udef, 0x33: udef, 0x34: udef, 0x35: '行', 0x36: udef, 0x37: udef, 0x38: udef, 0x39: udef, 0x3a: udef, 0x3b: udef, 0x3c: udef, 0x3d: '工', 0x3e: '通', 0x3f: udef,
        0x40: udef, 0x41: udef, 0x42: udef, 0x43: udef, 0x44: udef, 0x45: udef, 0x46: udef, 0x47: udef, 0x48: '地', 0x49: udef, 0x4a: '顺', 0x4b: udef, 0x4c: udef, 0x4d: udef, 0x4e: '如', 0x4f: udef,
        0x50: udef, 0x51: udef, 0x52: udef, 0x53: udef, 0x54: udef, 0x55: udef, 0x56: udef, 0x57: udef, 0x58: '大', 0x59: udef, 0x5a: udef, 0x5b: '名', 0x5c: udef, 0x5d: udef, 0x5e: '明', 0x5f: '城',
        0x60: udef, 0x61: udef, 0x62: udef, 0x63: udef, 0x64: udef, 0x65: udef, 0x66: '承', 0x67: udef, 0x68: udef, 0x69: udef, 0x6a: '综', 0x6b: udef, 0x6c: udef, 0x6d: udef, 0x6e: udef, 0x6f: udef,
        0x70: udef, 0x71: udef, 0x72: udef, 0x73: udef, 0x74: udef, 0x75: udef, 0x76: udef, 0x77: udef, 0x78: udef, 0x79: udef, 0x7a: udef, 0x7b: udef, 0x7c: udef, 0x7d: udef, 0x7e: udef, 0x7f: udef,
        0x80: udef, 0x81: '果', 0x82: udef, 0x83: '生', 0x84: udef, 0x85: udef, 0x86: '进', 0x87: udef, 0x88: udef, 0x89: '保', 0x8a: '税', 0x8b: '加', 0x8c: '物', 0x8d: '流', 0x8e: '园', 0x8f: '港',
        0x90: udef, 0x91: udef, 0x92: udef, 0x93: udef, 0x94: '旅', 0x95: udef, 0x96: udef, 0x97: udef, 0x98: udef, 0x99: udef, 0x9a: udef, 0x9b: udef, 0x9c: udef, 0x9d: '同', 0x9e: udef, 0x9f: '益',
        0xa0: udef, 0xa1: udef, 0xa2: udef, 0xa3: udef, 0xa4: udef, 0xa5: udef, 0xa6: udef, 0xa7: udef, 0xa8: udef, 0xa9: '平', 0xaa: '台', 0xab: udef, 0xac: '机', 0xad: udef, 0xae: '招', 0xaf: udef,
        0xb0: udef, 0xb1: udef, 0xb2: '增', 0xb3: '长', 0xb4: udef, 0xb5: udef, 0xb6: udef, 0xb7: udef, 0xb8: udef, 0xb9: '营', 0xba: udef, 0xbb: udef, 0xbc: udef, 0xbd: udef, 0xbe: udef, 0xbf: udef,
        0xc0: udef, 0xc1: '心', 0xc2: udef, 0xc3: udef, 0xc4: udef, 0xc5: udef, 0xc6: udef, 0xc7: '际', 0xc8: udef, 0xc9: udef, 0xca: udef, 0xcb: '深', 0xcc: udef, 0xcd: udef, 0xce: udef, 0xcf: udef,
        0xd0: udef, 0xd1: udef, 0xd2: udef, 0xd3: udef, 0xd4: udef, 0xd5: udef, 0xd6: udef, 0xd7: udef, 0xd8: udef, 0xd9: udef, 0xda: udef, 0xdb: '临', 0xdc: '衡', 0xdd: udef, 0xde: udef, 0xdf: udef,
        0xe0: udef, 0xe1: udef, 0xe2: udef, 0xe3: udef, 0xe4: udef, 0xe5: udef, 0xe6: udef, 0xe7: udef, 0xe8: udef, 0xe9: udef, 0xea: udef, 0xeb: udef, 0xec: udef, 0xed: '武', 0xee: '清', 0xef: '子',
        0xf0: '牙', 0xf1: '辰', 0xf2: '丽', 0xf3: '秦', 0xf4: '皇', 0xf5: '岛', 0xf6: '廊', 0xf7: '坊', 0xf8: '沧', 0xf9: '石', 0xfa: '庄', 0xfb: '唐', 0xfc: '曹', 0xfd: '妃', 0xfe: '甸', 0xff: '邯',
        0x0301: '极', 0x0304: '路',
        0x03bc: '布',
    },
    3: {
        0x20:  ' ', 0x21: '郸', 0x22: '太', 0x23: '晋', 0x24: '呼', 0x25: '浩', 0x26: '巴', 0x27: '彦', 0x28: '卓', 0x29: '伦', 0x2a: '贝', 0x2b: '连', 0x2c: '沈', 0x2d: '阳', 0x2e: '兴', 0x2f: '锦',
        0x30: '辉', 0x31: '盘', 0x32: '滨', 0x33: '铁', 0x34: '岭', 0x35: '春', 0x36: '红', 0x37: '嘴', 0x38: '汽', 0x39: '车', 0x3a: '松', 0x3b: '哈', 0x3c: '宾', 0x3d: '绥', 0x3e: '牡', 0x3f: '丹',
        0x40: '双', 0x41: '鸭', 0x42: '闵', 0x43: '桥', 0x44: '漕', 0x45: '泾', 0x46: '昆', 0x47: '徐', 0x48: '镇', 0x49: '吴', 0x4a: '常', 0x4b: '熟', 0x4c: '淮', 0x4d: '盐', 0x4e: '锡', 0x4f: '仓',
        0x50: '靖', 0x51: '皋', 0x52: '门', 0x53: '宿', 0x54: '迁', 0x55: '宜', 0x56: '浒', 0x57: '墅', 0x58: '沭', 0x59: '相', 0x5a: '波', 0x5b: '温', 0x5c: '榭', 0x5d: '杭', 0x5e: '萧', 0x5f: '嘉',
        0x60: '绍', 0x61: '袍', 0x62: '善', 0x63: '衢', 0x64: '乌', 0x65: '余', 0x66: '富', 0x67: '柯', 0x68: '湾', 0x69: '虞', 0x6a: '水', 0x6b: '芜', 0x6c: '肥', 0x6d: '马', 0x6e: '鞍', 0x6f: '铜',
        0x70: '陵', 0x71: '滁', 0x72: '池', 0x73: '六', 0x74: '宣', 0x75: '厦', 0x76: '融', 0x77: '侨', 0x78: '漳', 0x79: '泉', 0x7a: '岩', 0x7b: '昌', 0x7c: '九', 0x7d: '赣', 0x7e: '井', 0x7f: '冈',
        0x80: '饶', 0x81: '萍', 0x82: '乡', 0x83: '小', 0x84: '蓝', 0x85: '瑞', 0x86: '烟', 0x87: '威', 0x88: '潍', 0x89: '邹', 0x8a: '沂', 0x8b: '远', 0x8c: '德', 0x8d: '胶', 0x8e: '聊', 0x8f: '郑',
        0x90: '封', 0x91: '鹤', 0x92: '壁', 0x93: '漯', 0x94: '许', 0x95: '洛', 0x96: '旗', 0x97: '渠', 0x98: '濮', 0x99: '汉', 0x9a: '黄', 0x9b: '襄', 0x9c: '空', 0x9d: '荆', 0x9e: '鄂', 0x9f: '葛',
        0xa0: '店', 0xa1: '十', 0xa2: '堰', 0xa3: '沙', 0xa4: '岳', 0xa5: '湘', 0xa6: '潭', 0xa7: '浏', 0xa8: udef, 0xa9: '底', 0xaa: '望', 0xab: '湛', 0xac: '惠', 0xad: '亚', 0xae: '珠', 0xaf: udef,
        0xb0: udef, 0xb1: '洋', 0xb2: '浦', 0xb3: '万', 0xb4: udef, 0xb5: udef, 0xb6: '遂', 0xb7: '绵', 0xb8: udef, 0xb9: '遵', 0xba: '曲', 0xbb: '嵩', 0xbc: '杨', 0xbd: '拉', 0xbe: '萨', 0xbf: '航',
        0xc0: '榆', 0xc1: '兰', 0xc2: '酒', 0xc3: '掖', 0xc4: '格', 0xc5: '木', 0xc6: '仑', 0xc7: '银', 0xc8: '鲁', 0xc9: '齐', 0xca: '勒', 0xcb: '屯', 0xcc: udef, 0xcd: '阿', 0xce: '五', 0xcf: '堡',
        0xd0: '雄', 0xd1: '普', 0xd2: '舟', 0xd3: '群', 0xd4: '岸', 0xd5: '两', 0xd6: '滇', 0xd7: '村', 0xd8: '燕', 0xd9: '郊', 0xda: '头', 0xdb: '稀', 0xdc: '土', 0xdd: '多', 0xde: '斯', 0xdf: '溪',
        0xe0: '阜', 0xe1: '延', 0xe2: '净', 0xe3: '月', 0xe4: '医', 0xe5: '药', 0xe6: '紫', 0xe7: '竹', 0xe8: '无', 0xe9: '泰', 0xea: '阴', 0xeb: '秀', 0xec: '洲', 0xed: '莫', 0xee: '干', 0xef: '蚌',
        0xf0: '埠', 0xf1: '慈', 0xf2: '狮', 0xf3: '火', 0xf4: '炬', 0xf5: '莆', 0xf6: '田', 0xf7: '三', 0xf8: '景', 0xf9: '鹰', 0xfa: '抚', 0xfb: '丰', 0xfc: '淄', 0xfd: '博', 0xfe: '枣', 0xff: '莱',
        0x0301: '寿', 0x0304: '钦', 0x0308: '娄',
        0x0327: '元',
        0x03bc: '都',
    },
    4: {
        0x20:  ' ', 0x21: '角', 0x22: '农', 0x23: '顶', 0x24: '焦', 0x25: '孝', 0x26: '感', 0x27: '随', 0x28: '仙', 0x29: '桃', 0x2a: '潜', 0x2b: '冶', 0x2c: '株', 0x2d: '郴', 0x2e: '怀', 0x2f: '圳',
        0x30: '佛', 0x31: '仲', 0x32: '恺', 0x33: '肇', 0x34: '莞', 0x35: '源', 0x36: '汕', 0x37: '茂', 0x38: '桂', 0x39: '林', 0x3a: '璧', 0x3b: '荣', 0x3c: '永', 0x3d: '贡', 0x3e: '乐', 0x3f: '泸',
        0x40: '攀', 0x41: '枝', 0x42: '花', 0x43: '钒', 0x44: '钛', 0x45: '玉', 0x46: '楚', 0x47: '宝', 0x48: '鸡', 0x49: '凌', 0x4a: '渭', 0x4b: '康', 0x4c: '白', 0x4d: '兵', 0x4e: '团', 0x4f: '竺',
        0x50: '满', 0x51: '里', 0x52: '窑', 0x53: '隆', 0x54: '珲', 0x55: '芬', 0x56: '场', 0x57: '奉', 0x58: '贤', 0x59: '片', 0x5a: '梅', 0x5b: '象', 0x5c: '屿', 0x5d: '卧', 0x5e: '矶', 0x5f: '澳',
        0x60: '栏', 0x61: '凭', 0x62: '祥', 0x63: '寸', 0x64: '滩', 0x65: '霍', 0x66: '配', 0x67: '套', 0x68: '喀', 0x69: '什', 0x6a: '二', 0x6b: '畹', 0x6c: '町', 0x6d: '伊', 0x6e: '塔', 0x6f: '乃',
        0x70: '老', 0x71: '挝', 0x72: '磨', 0x73: '憨', 0x74: udef, 0x75: '半', 0x76: udef, 0x77: udef, 0x78: udef, 0x79: udef, 0x7a: udef, 0x7b: udef, 0x7c: udef, 0x7d: udef, 0x7e: udef, 0x7f: udef,
        0x80: udef, 0x81: udef, 0x82: udef, 0x83: udef, 0x84: udef, 0x85: udef, 0x86: udef, 0x87: udef, 0x88: udef, 0x89: udef, 0x8a: udef, 0x8b: udef, 0x8c: udef, 0x8d: udef, 0x8e: udef, 0x8f: udef,
        0x90: udef, 0x91: udef, 0x92: udef, 0x93: udef, 0x94: udef, 0x95: udef, 0x96: udef, 0x97: udef, 0x98: udef, 0x99: udef, 0x9a: udef, 0x9b: udef, 0x9c: udef, 0x9d: udef, 0x9e: udef, 0x9f: udef,
        0xa0: udef, 0xa1: udef, 0xa2: udef, 0xa3: udef, 0xa4: udef, 0xa5: udef, 0xa6: udef, 0xa7: udef, 0xa8: udef, 0xa9: udef, 0xaa: udef, 0xab: udef, 0xac: udef, 0xad: udef, 0xae: udef, 0xaf: udef,
        0xb0: udef, 0xb1: udef, 0xb2: udef, 0xb3: udef, 0xb4: udef, 0xb5: udef, 0xb6: udef, 0xb7: udef, 0xb8: udef, 0xb9: udef, 0xba: udef, 0xbb: udef, 0xbc: udef, 0xbd: udef, 0xbe: udef, 0xbf: udef,
        0xc0: udef, 0xc1: udef, 0xc2: udef, 0xc3: udef, 0xc4: udef, 0xc5: udef, 0xc6: udef, 0xc7: udef, 0xc8: udef, 0xc9: udef, 0xca: udef, 0xcb: udef, 0xcc: udef, 0xcd: udef, 0xce: udef, 0xcf: udef,
        0xd0: udef, 0xd1: udef, 0xd2: udef, 0xd3: udef, 0xd4: udef, 0xd5: udef, 0xd6: udef, 0xd7: udef, 0xd8: udef, 0xd9: udef, 0xda: udef, 0xdb: udef, 0xdc: udef, 0xdd: udef, 0xde: udef, 0xdf: udef,
        0xe0: udef, 0xe1: udef, 0xe2: udef, 0xe3: udef, 0xe4: udef, 0xe5: udef, 0xe6: udef, 0xe7: udef, 0xe8: udef, 0xe9: udef, 0xea: udef, 0xeb: udef, 0xec: udef, 0xed: udef, 0xee: udef, 0xef: udef,
        0xf0: udef, 0xf1: udef, 0xf2: udef, 0xf3: udef, 0xf4: udef, 0xf5: udef, 0xf6: udef, 0xf7: udef, 0xf8: udef, 0xf9: udef, 0xfa: udef, 0xfb: udef, 0xfc: udef, 0xfd: udef, 0xfe: udef, 0xff: udef,
        0x0301: '柏', 0x0304: '光', 0x0308: '故',
        0x0327: '陶',
        0x03bc: '坡',
    },
    5: {
        0x20:  ' ', 0x21: udef, 0x22: udef, 0x23: udef, 0x24: udef, 0x25: udef, 0x26: udef, 0x27: udef, 0x28: udef, 0x29: udef, 0x2a: udef, 0x2b: udef, 0x2c: udef, 0x2d: udef, 0x2e: udef, 0x2f: udef,
        0x30: udef, 0x31: udef, 0x32: udef, 0x33: udef, 0x34: udef, 0x35: udef, 0x36: udef, 0x37: udef, 0x38: udef, 0x39: udef, 0x3a: udef, 0x3b: udef, 0x3c: udef, 0x3d: udef, 0x3e: udef, 0x3f: udef,
        0x40: udef, 0x41: udef, 0x42: udef, 0x43: udef, 0x44: udef, 0x45: udef, 0x46: udef, 0x47: udef, 0x48: udef, 0x49: udef, 0x4a: udef, 0x4b: udef, 0x4c: udef, 0x4d: udef, 0x4e: udef, 0x4f: udef,
        0x50: udef, 0x51: udef, 0x52: udef, 0x53: udef, 0x54: udef, 0x55: udef, 0x56: udef, 0x57: udef, 0x58: udef, 0x59: udef, 0x5a: udef, 0x5b: udef, 0x5c: udef, 0x5d: udef, 0x5e: udef, 0x5f: udef,
        0x60: udef, 0x61: udef, 0x62: udef, 0x63: udef, 0x64: udef, 0x65: udef, 0x66: udef, 0x67: udef, 0x68: udef, 0x69: udef, 0x6a: udef, 0x6b: udef, 0x6c: udef, 0x6d: udef, 0x6e: udef, 0x6f: udef,
        0x70: udef, 0x71: udef, 0x72: udef, 0x73: udef, 0x74: udef, 0x75: udef, 0x76: udef, 0x77: udef, 0x78: udef, 0x79: udef, 0x7a: udef, 0x7b: udef, 0x7c: udef, 0x7d: udef, 0x7e: udef, 0x7f: udef,
        0x80: udef, 0x81: udef, 0x82: udef, 0x83: udef, 0x84: udef, 0x85: udef, 0x86: udef, 0x87: udef, 0x88: udef, 0x89: udef, 0x8a: udef, 0x8b: udef, 0x8c: udef, 0x8d: udef, 0x8e: udef, 0x8f: udef,
        0x90: udef, 0x91: udef, 0x92: udef, 0x93: udef, 0x94: udef, 0x95: udef, 0x96: udef, 0x97: udef, 0x98: udef, 0x99: udef, 0x9a: udef, 0x9b: udef, 0x9c: udef, 0x9d: udef, 0x9e: udef, 0x9f: udef,
        0xa0: udef, 0xa1: udef, 0xa2: udef, 0xa3: udef, 0xa4: udef, 0xa5: udef, 0xa6: udef, 0xa7: udef, 0xa8: udef, 0xa9: udef, 0xaa: udef, 0xab: udef, 0xac: udef, 0xad: udef, 0xae: udef, 0xaf: udef,
        0xb0: udef, 0xb1: udef, 0xb2: udef, 0xb3: udef, 0xb4: udef, 0xb5: udef, 0xb6: udef, 0xb7: udef, 0xb8: udef, 0xb9: udef, 0xba: udef, 0xbb: udef, 0xbc: udef, 0xbd: udef, 0xbe: udef, 0xbf: udef,
        0xc0: udef, 0xc1: udef, 0xc2: udef, 0xc3: udef, 0xc4: udef, 0xc5: udef, 0xc6: udef, 0xc7: udef, 0xc8: udef, 0xc9: udef, 0xca: udef, 0xcb: udef, 0xcc: udef, 0xcd: udef, 0xce: udef, 0xcf: udef,
        0xd0:  ' ', 0xd1: udef, 0xd2: udef, 0xd3: udef, 0xd4: udef, 0xd5: udef, 0xd6: udef, 0xd7: udef, 0xd8: udef, 0xd9: udef, 0xda: udef, 0xdb: udef, 0xdc: udef, 0xdd: udef, 0xde: udef, 0xdf: udef,
        0xe0: udef, 0xe1: udef, 0xe2: udef, 0xe3: udef, 0xe4: udef, 0xe5: udef, 0xe6: udef, 0xe7: udef, 0xe8: udef, 0xe9: udef, 0xea: udef, 0xeb: udef, 0xec: udef, 0xed: udef, 0xee: udef, 0xef: udef,
        0xf0: udef, 0xf1: udef, 0xf2: udef, 0xf3: udef, 0xf4: udef, 0xf5: udef, 0xf6: udef, 0xf7: udef, 0xf8: udef, 0xf9: udef, 0xfa: udef, 0xfb: udef, 0xfc: udef, 0xfd: udef, 0xfe: udef, 0xff: udef,
        0x0301: '诏', 0x0304: '雷', 0x0308: '繁',
        0x0327: '章',
        0x03bc: '翔',
    },
    6: {
        0x20:  ' ', 0x21: udef, 0x22: udef, 0x23: udef, 0x24: udef, 0x25: udef, 0x26: udef, 0x27: udef, 0x28: udef, 0x29: udef, 0x2a: udef, 0x2b: udef, 0x2c: udef, 0x2d: udef, 0x2e: udef, 0x2f: udef,
        0x30: udef, 0x31: udef, 0x32: udef, 0x33: udef, 0x34: udef, 0x35: udef, 0x36: udef, 0x37: udef, 0x38: udef, 0x39: udef, 0x3a: udef, 0x3b: udef, 0x3c: udef, 0x3d: udef, 0x3e: udef, 0x3f: udef,
        0x40: udef, 0x41: udef, 0x42: udef, 0x43: udef, 0x44: udef, 0x45: udef, 0x46: udef, 0x47: udef, 0x48: udef, 0x49: udef, 0x4a: udef, 0x4b: udef, 0x4c: udef, 0x4d: udef, 0x4e: udef, 0x4f: udef,
        0x50: udef, 0x51: udef, 0x52: udef, 0x53: udef, 0x54: udef, 0x55: udef, 0x56: udef, 0x57: udef, 0x58: udef, 0x59: udef, 0x5a: udef, 0x5b: udef, 0x5c: udef, 0x5d: udef, 0x5e: udef, 0x5f: udef,
        0x60: udef, 0x61: udef, 0x62: udef, 0x63: udef, 0x64: udef, 0x65: udef, 0x66: udef, 0x67: udef, 0x68: udef, 0x69: udef, 0x6a: udef, 0x6b: udef, 0x6c: udef, 0x6d: udef, 0x6e: udef, 0x6f: udef,
        0x70: udef, 0x71: udef, 0x72: udef, 0x73: udef, 0x74: udef, 0x75: udef, 0x76: udef, 0x77: udef, 0x78: udef, 0x79: udef, 0x7a: udef, 0x7b: udef, 0x7c: udef, 0x7d: udef, 0x7e: udef, 0x7f: udef,
        0x80: udef, 0x81: udef, 0x82: udef, 0x83: udef, 0x84: udef, 0x85: udef, 0x86: udef, 0x87: udef, 0x88: udef, 0x89: udef, 0x8a: udef, 0x8b: udef, 0x8c: udef, 0x8d: udef, 0x8e: udef, 0x8f: udef,
        0x90: udef, 0x91: udef, 0x92: udef, 0x93: udef, 0x94: udef, 0x95: udef, 0x96: udef, 0x97: udef, 0x98: udef, 0x99: udef, 0x9a: udef, 0x9b: udef, 0x9c: udef, 0x9d: udef, 0x9e: udef, 0x9f: udef,
        0xa0: udef, 0xa1: udef, 0xa2: udef, 0xa3: udef, 0xa4: udef, 0xa5: udef, 0xa6: udef, 0xa7: udef, 0xa8: udef, 0xa9: udef, 0xaa: udef, 0xab: udef, 0xac: udef, 0xad: udef, 0xae: udef, 0xaf: udef,
        0xb0: udef, 0xb1: udef, 0xb2: udef, 0xb3: udef, 0xb4: udef, 0xb5: udef, 0xb6: udef, 0xb7: udef, 0xb8: udef, 0xb9: udef, 0xba: udef, 0xbb: udef, 0xbc: udef, 0xbd: udef, 0xbe: udef, 0xbf: udef,
        0xc0: udef, 0xc1: udef, 0xc2: udef, 0xc3: udef, 0xc4: udef, 0xc5: udef, 0xc6: udef, 0xc7: udef, 0xc8: udef, 0xc9: udef, 0xca: udef, 0xcb: udef, 0xcc: udef, 0xcd: udef, 0xce: udef, 0xcf: udef,
        0xd0: udef, 0xd1: udef, 0xd2: udef, 0xd3: udef, 0xd4: udef, 0xd5: udef, 0xd6: udef, 0xd7: udef, 0xd8: udef, 0xd9: udef, 0xda: udef, 0xdb: udef, 0xdc: udef, 0xdd: udef, 0xde: udef, 0xdf: udef,
        0xe0: udef, 0xe1: udef, 0xe2: udef, 0xe3: udef, 0xe4: udef, 0xe5: udef, 0xe6: udef, 0xe7: udef, 0xe8: udef, 0xe9: udef, 0xea: udef, 0xeb: udef, 0xec: udef, 0xed: udef, 0xee: udef, 0xef: udef,
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
        if (!char) {
            flag = true;
            return EncodeUnicode(unicode);
        }
        return char;
    }).join("");
    return color ? (flag ? chalk.bgHex("#a4b0be")('|'+s.font+'|') : "") + chalk.bgHex(color)(mapResult) : mapResult;
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

                const province_name = text[++i].texts.map((c) =>  mapString(c, colors[c.font])).join("");
                const classification_name = text[++i].texts.map((c) =>  mapString(c, colors[c.font])).join("");
                const zone_name = text[++i].texts.map((c) =>  mapString(c, colors[c.font])).join("");

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
                }
            }
            i++;
        }
    }
    fs.writeFileSync('./src/raw/GB_T_37028/data/GB_T 37028-2018.json', JSON.stringify(result, null, 2), 'utf-8');

    return result;
}
