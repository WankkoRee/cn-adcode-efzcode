import China from '../index.js';

test('省级行政区,存在', () => {
    const preLevel = China;
    const [codeS, codeI] = ['13', 13];
    const expectedName: string | undefined = '河北省';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(currentLevel);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(currentLevel);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区,废除', () => {
    // todo
});

test('省级行政区,不存在', () => {
    const preLevel = China;
    const [codeS, codeI] = ['99', 99];
    const expectedName: string | undefined = undefined;

    const currentLevel = preLevel.getChild(codeS);
    expect(currentLevel).toBe(null);
    expect(preLevel.getChild(codeS, true)).toBe(null);
    expect(preLevel.getChild(codeS, false)).toBe(null);
    expect(preLevel.getChild(codeI)).toBe(null);
    expect(preLevel.getChild(codeI, true)).toBe(null);
    expect(preLevel.getChild(codeI, false)).toBe(null);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区-地级行政区,存在', () => {
    const preLevel = China.getChild('13');
    const [codeS, codeI] = ['01', 1];
    const expectedName: string | undefined = '石家庄市';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(currentLevel);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(currentLevel);
    expect(currentLevel?.getName()).toBe(expectedName);
})

test('省级行政区-地级行政区,废除', () => {
    const preLevel = China.getChild('13');
    const [codeS, codeI] = ['21', 21];
    const expectedName: string | undefined = '邯郸地区';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(null);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(null);
    expect(currentLevel?.getName()).toBe(expectedName);
})

test('省级行政区-地级行政区,不存在', () => {
    const preLevel = China.getChild('13');
    const [codeS, codeI] = ['99', 99];
    const expectedName: string | undefined = undefined;

    const currentLevel = preLevel.getChild(codeS);
    expect(currentLevel).toBe(null);
    expect(preLevel.getChild(codeS, true)).toBe(null);
    expect(preLevel.getChild(codeS, false)).toBe(null);
    expect(preLevel.getChild(codeI)).toBe(null);
    expect(preLevel.getChild(codeI, true)).toBe(null);
    expect(preLevel.getChild(codeI, false)).toBe(null);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区-地级行政区-县级行政区,存在', () => {
    const preLevel = China.getChild('13').getChild('01');
    const [codeS, codeI] = ['02', 2];
    const expectedName: string | undefined = '长安区';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(currentLevel);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(currentLevel);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区-地级行政区-县级行政区,废除', () => {
    const preLevel = China.getChild('13').getChild('01');
    const [codeS, codeI] = ['03', 3];
    const expectedName: string | undefined = '桥东区';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(null);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(null);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区-地级行政区-县级行政区,不存在', () => {
    const preLevel = China.getChild('13').getChild('01');
    const [codeS, codeI] = ['99', 99];
    const expectedName: string | undefined = undefined;

    const currentLevel = preLevel.getChild(codeS);
    expect(currentLevel).toBe(null);
    expect(preLevel.getChild(codeS, true)).toBe(null);
    expect(preLevel.getChild(codeS, false)).toBe(null);
    expect(preLevel.getChild(codeI)).toBe(null);
    expect(preLevel.getChild(codeI, true)).toBe(null);
    expect(preLevel.getChild(codeI, false)).toBe(null);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区-地级行政区-经济功能区,存在', () => {
    const preLevel = China.getChild('13').getChild('03');
    const [codeS, codeI] = ['101001', 101001];
    const expectedName: string | undefined = '秦皇岛经济技术开发区';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(currentLevel);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(currentLevel);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区-地级行政区-经济功能区,废除', () => {
    // todo
});

test('省级行政区-地级行政区-经济功能区,不存在', () => {
    const preLevel = China.getChild('13').getChild('01');
    const [codeS, codeI] = ['299999', 299999];
    const expectedName: string | undefined = undefined;

    const currentLevel = preLevel.getChild(codeS);
    expect(currentLevel).toBe(null);
    expect(preLevel.getChild(codeS, true)).toBe(null);
    expect(preLevel.getChild(codeS, false)).toBe(null);
    expect(preLevel.getChild(codeI)).toBe(null);
    expect(preLevel.getChild(codeI, true)).toBe(null);
    expect(preLevel.getChild(codeI, false)).toBe(null);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区(直辖市),存在', () => {
    const preLevel = China;
    const [codeS, codeI] = ['11', 11];
    const expectedName: string | undefined = '北京市';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(currentLevel);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(currentLevel);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区(直辖市),废除', () => {
    // todo
});

test('省级行政区(直辖市)-县级行政区,存在', () => {
    const preLevel = China.getChild('11');
    const [codeS, codeI] = ['0101', 101];
    const expectedName: string | undefined = '东城区';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(currentLevel);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(currentLevel);
    expect(currentLevel?.getName()).toBe(expectedName);
})

test('省级行政区(直辖市)-县级行政区,废除', () => {
    const preLevel = China.getChild('11');
    const [codeS, codeI] = ['0201', 201];
    const expectedName: string | undefined = '昌平县';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(null);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(null);
    expect(currentLevel?.getName()).toBe(expectedName);
})

test('省级行政区(直辖市)-县级行政区,不存在', () => {
    const preLevel = China.getChild('11');
    const [codeS, codeI] = ['9999', 9999];
    const expectedName: string | undefined = undefined;

    const currentLevel = preLevel.getChild(codeS);
    expect(currentLevel).toBe(null);
    expect(preLevel.getChild(codeS, true)).toBe(null);
    expect(preLevel.getChild(codeS, false)).toBe(null);
    expect(preLevel.getChild(codeI)).toBe(null);
    expect(preLevel.getChild(codeI, true)).toBe(null);
    expect(preLevel.getChild(codeI, false)).toBe(null);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('省级行政区(直辖市)-县级行政区-经济功能区,存在', () => {
    const preLevel = China.getChild('11').getChild('0115');
    const [codeS, codeI] = ['101001', 101001];
    const expectedName: string | undefined = '北京经济技术开发区';

    const currentLevel = preLevel.getChild(codeS);
    expect(preLevel.getChild(codeS, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeS, false)).toBe(currentLevel);
    expect(preLevel.getChild(codeI)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, true)).toBe(currentLevel);
    expect(preLevel.getChild(codeI, false)).toBe(currentLevel);
    expect(currentLevel?.getName()).toBe(expectedName);
})

test('省级行政区(直辖市)-县级行政区-经济功能区,废除', () => {
    // todo
})

test('省级行政区(直辖市)-县级行政区-经济功能区,不存在', () => {
    const preLevel = China.getChild('11').getChild('0115');
    const [codeS, codeI] = ['299999', 299999];
    const expectedName: string | undefined = undefined;

    const currentLevel = preLevel.getChild(codeS);
    expect(currentLevel).toBe(null);
    expect(preLevel.getChild(codeS, true)).toBe(null);
    expect(preLevel.getChild(codeS, false)).toBe(null);
    expect(preLevel.getChild(codeI)).toBe(null);
    expect(preLevel.getChild(codeI, true)).toBe(null);
    expect(preLevel.getChild(codeI, false)).toBe(null);
    expect(currentLevel?.getName()).toBe(expectedName);
});

test('功能性测试', () => {
    expect(China.getChild('13')?.getLevel()).toBe(1);
    expect(China.getChild('13')?.getChild('01')?.getLevel()).toBe(2);
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getLevel()).toBe(3);
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getLevel()).toBe(3);

    expect(China.getChild('13')?.getCodeString()).toBe('13');
    expect(China.getChild('13')?.getChild('01')?.getCodeString()).toBe('01');
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getCodeString()).toBe('02');
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getCodeString()).toBe('101001');

    expect(China.getChild('13')?.getFullCodeString()).toBe('13');
    expect(China.getChild('13')?.getChild('01')?.getFullCodeString()).toBe('1301');
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getFullCodeString()).toBe('130102');
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getFullCodeString()).toBe('1303101001');

    expect(China.getChild('13')?.getCodeInteger()).toBe(13);
    expect(China.getChild('13')?.getChild('01')?.getCodeInteger()).toBe(1);
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getCodeInteger()).toBe(2);
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getCodeInteger()).toBe(101001);

    expect(China.getChild('13')?.getFullCodeInteger()).toBe(13);
    expect(China.getChild('13')?.getChild('01')?.getFullCodeInteger()).toBe(1301);
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getFullCodeInteger()).toBe(130102);
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getFullCodeInteger()).toBe(1303101001);

    expect(China.getChild('13')?.getName()).toBe('河北省');
    expect(China.getChild('13')?.getChild('01')?.getName()).toBe('石家庄市');
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getName()).toBe('长安区');
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getName()).toBe('秦皇岛经济技术开发区');

    expect(China.getChild('13')?.getFullName()).toBe('河北省');
    expect(China.getChild('13')?.getChild('01')?.getFullName()).toBe('河北省 石家庄市');
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getFullName()).toBe('河北省 石家庄市 长安区');
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getFullName()).toBe('河北省 秦皇岛市 秦皇岛经济技术开发区');

    expect(China.getChild('13')?.getShortName()).toBe('河北');
    expect(China.getChild('13')?.getChild('01')?.getShortName()).toBe('石家庄');
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getShortName()).toBe('长安');
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getShortName()).toBe('秦皇岛经济技术开发区');

    expect(China.getChild('13')?.getFullShortName()).toBe('河北');
    expect(China.getChild('13')?.getChild('01')?.getFullShortName()).toBe('河北 石家庄');
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getFullShortName()).toBe('河北 石家庄 长安');
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getFullShortName()).toBe('河北 秦皇岛 秦皇岛经济技术开发区');
});

test('功能性测试(直辖市)', () => {
    expect(China.getChild('11')?.getLevel()).toBe(1);
    expect(China.getChild('11')?.getChild('0101')?.getLevel()).toBe(2);
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getLevel()).toBe(3);

    expect(China.getChild('11')?.getCodeString()).toBe('11');
    expect(China.getChild('11')?.getChild('0101')?.getCodeString()).toBe('0101');
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getCodeString()).toBe('101001');

    expect(China.getChild('11')?.getFullCodeString()).toBe('11');
    expect(China.getChild('11')?.getChild('0101')?.getFullCodeString()).toBe('110101');
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getFullCodeString()).toBe('110115101001');

    expect(China.getChild('11')?.getCodeInteger()).toBe(11);
    expect(China.getChild('11')?.getChild('0101')?.getCodeInteger()).toBe(101);
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getCodeInteger()).toBe(101001);

    expect(China.getChild('11')?.getFullCodeInteger()).toBe(11);
    expect(China.getChild('11')?.getChild('0101')?.getFullCodeInteger()).toBe(110101);
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getFullCodeInteger()).toBe(110115101001);

    expect(China.getChild('11')?.getName()).toBe('北京市');
    expect(China.getChild('11')?.getChild('0101')?.getName()).toBe('东城区');
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getName()).toBe('北京经济技术开发区');

    expect(China.getChild('11')?.getFullName()).toBe('北京市');
    expect(China.getChild('11')?.getChild('0101')?.getFullName()).toBe('北京市 东城区');
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getFullName()).toBe('北京市 大兴区 北京经济技术开发区');

    expect(China.getChild('11')?.getShortName()).toBe('北京');
    expect(China.getChild('11')?.getChild('0101')?.getShortName()).toBe('东城');
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getShortName()).toBe('北京经济技术开发区');

    expect(China.getChild('11')?.getFullShortName()).toBe('北京');
    expect(China.getChild('11')?.getChild('0101')?.getFullShortName()).toBe('北京 东城');
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getFullShortName()).toBe('北京 大兴 北京经济技术开发区');
});

test('功能性测试(特殊情况)', () => {
    expect(China.getChild('46')?.getChild('01')?.getName()).toBe('海口市');
    expect(China.getChild(46)?.getChild(1)?.getName()).toBe('海口市');
    expect(China.getChild('46')?.getChild('0001')?.getName()).toBe('五指山市');
});

test('readme-逐级获取', () => {
    expect(China.getChild('13')?.getChild('01')?.getChild('02')?.getName() === '长安区').toBeTruthy()
    expect(China.getChild(13)?.getChild(1)?.getChild(2)?.getName() === '长安区').toBeTruthy()
    expect(China.getChild('11')?.getChild('0101')?.getName() === '东城区').toBeTruthy()
    expect(China.getChild(11)?.getChild(101)?.getName() === '东城区').toBeTruthy()
    expect(China.getChild('13')?.getChild('03')?.getChild('101001')?.getName() === '秦皇岛经济技术开发区').toBeTruthy()
    expect(China.getChild(13)?.getChild(3)?.getChild(101001)?.getName() === '秦皇岛经济技术开发区').toBeTruthy()
    expect(China.getChild('11')?.getChild('0115')?.getChild('101001')?.getName() === '北京经济技术开发区').toBeTruthy()
    expect(China.getChild(11)?.getChild(115)?.getChild(101001)?.getName() === '北京经济技术开发区').toBeTruthy()
})

test('readme-获取具体信息', () => {
    const province = China.getChild('11')!
    expect(province.getLevel() === 1).toBeTruthy()
    expect(province.getCodeString() === '11').toBeTruthy()
    expect(province.getCodeInteger() === 11).toBeTruthy()
    expect(province.getName() === '北京市').toBeTruthy()
    expect(province.getShortName() === '北京').toBeTruthy()
    expect(province.isDeprecated() === false).toBeTruthy()
    expect(province.getFullCodeString() === '11').toBeTruthy()
    expect(province.getFullCodeInteger() === 11).toBeTruthy()
    expect(province.getFullName('-') === '北京市').toBeTruthy()
    expect(province.getFullShortName('') === '北京').toBeTruthy()


    const prefecture = province.getChild('0115')!
    expect(prefecture.getLevel() === 2).toBeTruthy()
    expect(prefecture.getCodeString() === '0115').toBeTruthy()
    expect(prefecture.getCodeInteger() === 115).toBeTruthy()
    expect(prefecture.getName() === '大兴区').toBeTruthy()
    expect(prefecture.getShortName() === '大兴').toBeTruthy()
    expect(prefecture.isDeprecated() === false).toBeTruthy()
    expect(prefecture.getFullCodeString() === '110115').toBeTruthy()
    expect(prefecture.getFullCodeInteger() === 110115).toBeTruthy()
    expect(prefecture.getFullName('-') === '北京市-大兴区').toBeTruthy()
    expect(prefecture.getFullShortName('') === '北京大兴').toBeTruthy()


    const county = prefecture.getChild('101001')!
    expect(county.getLevel() === 3).toBeTruthy()
    expect(county.getCodeString() === '101001').toBeTruthy()
    expect(county.getCodeInteger() === 101001).toBeTruthy()
    expect(county.getName() === '北京经济技术开发区').toBeTruthy()
    expect(county.getShortName() === '北京经济技术开发区').toBeTruthy()
    expect(county.isDeprecated() === false).toBeTruthy()
    expect(county.getFullCodeString() === '110115101001').toBeTruthy()
    expect(county.getFullCodeInteger() === 110115101001).toBeTruthy()
    expect(county.getFullName('-') === '北京市-大兴区-北京经济技术开发区').toBeTruthy()
    expect(county.getFullShortName('') === '北京大兴北京经济技术开发区').toBeTruthy()
})
