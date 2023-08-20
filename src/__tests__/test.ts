import China from '../index.js';

test('省级行政区', () => {
    expect(China.getChild('11').getName()).toBe('北京市');
    expect(China.getChild(11).getName()).toBe('北京市');
    expect(China.getProvince('11').getName()).toBe('北京市');
    expect(China.getProvince(11).getName()).toBe('北京市');
    expect(China.getChild('11', true)?.getName()).toBe('北京市');
    expect(China.getChild(11, true)?.getName()).toBe('北京市');
    expect(China.getProvince('11', true)?.getName()).toBe('北京市');
    expect(China.getProvince(11, true)?.getName()).toBe('北京市');

    expect(China.getChild('11', false)?.getName()).toBe('北京市');
    expect(China.getChild(11, false)?.getName()).toBe('北京市');
    expect(China.getProvince('11', false)?.getName()).toBe('北京市');
    expect(China.getProvince(11, false)?.getName()).toBe('北京市');


    // todo deprecated


    expect(China.getChild('99')?.getName()).toBe(undefined);
    expect(China.getChild(99)?.getName()).toBe(undefined);
    expect(China.getProvince('99')?.getName()).toBe(undefined);
    expect(China.getProvince(99)?.getName()).toBe(undefined);
    expect(China.getChild('99', true)?.getName()).toBe(undefined);
    expect(China.getChild(99, true)?.getName()).toBe(undefined);
    expect(China.getProvince('99', true)?.getName()).toBe(undefined);
    expect(China.getProvince(99, true)?.getName()).toBe(undefined);

    expect(China.getChild('99', false)?.getName()).toBe(undefined);
    expect(China.getChild(99, false)?.getName()).toBe(undefined);
    expect(China.getProvince('99', false)?.getName()).toBe(undefined);
    expect(China.getProvince(99, false)?.getName()).toBe(undefined);
});

test('地级行政区', () => {
    expect(China.getChild('11')?.getChild('01')?.getName()).toBe('市辖区');
    expect(China.getChild(11)?.getChild(1)?.getName()).toBe('市辖区');
    expect(China.getProvince('11')?.getPrefecture('01')?.getName()).toBe('市辖区');
    expect(China.getProvince(11)?.getPrefecture(1)?.getName()).toBe('市辖区');
    expect(China.getChild('11')?.getChild('01', true)?.getName()).toBe('市辖区');
    expect(China.getChild(11)?.getChild(1, true)?.getName()).toBe('市辖区');
    expect(China.getProvince('11')?.getPrefecture('01', true)?.getName()).toBe('市辖区');
    expect(China.getProvince(11)?.getPrefecture(1, true)?.getName()).toBe('市辖区');

    expect(China.getChild('11')?.getChild('01', false)?.getName()).toBe('市辖区');
    expect(China.getChild(11)?.getChild(1, false)?.getName()).toBe('市辖区');
    expect(China.getProvince('11')?.getPrefecture('01', false)?.getName()).toBe('市辖区');
    expect(China.getProvince(11)?.getPrefecture(1, false)?.getName()).toBe('市辖区');


    expect(China.getChild('11')?.getChild('02')?.getName()).toBe('县');
    expect(China.getChild(11)?.getChild(2)?.getName()).toBe('县');
    expect(China.getProvince('11')?.getPrefecture('02')?.getName()).toBe('县');
    expect(China.getProvince(11)?.getPrefecture(2)?.getName()).toBe('县');
    expect(China.getChild('11')?.getChild('02', true)?.getName()).toBe('县');
    expect(China.getChild(11)?.getChild(2, true)?.getName()).toBe('县');
    expect(China.getProvince('11')?.getPrefecture('02', true)?.getName()).toBe('县');
    expect(China.getProvince(11)?.getPrefecture(2, true)?.getName()).toBe('县');

    expect(China.getChild('11')?.getChild('02', false)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(2, false)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getPrefecture('02', false)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getPrefecture(2, false)?.getName()).toBe(undefined);


    expect(China.getChild('11')?.getChild('99')?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(99)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getPrefecture('99')?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getPrefecture(99)?.getName()).toBe(undefined);
    expect(China.getChild('11')?.getChild('99', true)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(99, true)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getPrefecture('99', true)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getPrefecture(99, true)?.getName()).toBe(undefined);

    expect(China.getChild('11')?.getChild('99', false)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(99, false)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getPrefecture('99', false)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getPrefecture(99, false)?.getName()).toBe(undefined);
});

test('经济功能区分类', () => {
    expect(China.getChild('11')?.getChild('101')?.getName()).toBe('经济技术开发区');
    expect(China.getChild(11)?.getChild(101)?.getName()).toBe('经济技术开发区');
    expect(China.getProvince('11')?.getClassification('101')?.getName()).toBe('经济技术开发区');
    expect(China.getProvince(11)?.getClassification(101)?.getName()).toBe('经济技术开发区');
    expect(China.getChild('11')?.getChild('101', true)?.getName()).toBe('经济技术开发区');
    expect(China.getChild(11)?.getChild(101, true)?.getName()).toBe('经济技术开发区');
    expect(China.getProvince('11')?.getClassification('101', true)?.getName()).toBe('经济技术开发区');
    expect(China.getProvince(11)?.getClassification(101, true)?.getName()).toBe('经济技术开发区');

    expect(China.getChild('11')?.getChild('101', false)?.getName()).toBe('经济技术开发区');
    expect(China.getChild(11)?.getChild(101, false)?.getName()).toBe('经济技术开发区');
    expect(China.getProvince('11')?.getClassification('101', false)?.getName()).toBe('经济技术开发区');
    expect(China.getProvince(11)?.getClassification(101, false)?.getName()).toBe('经济技术开发区');


    // todo deprecated


    expect(China.getChild('11')?.getChild('999')?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(999)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getClassification('999')?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getClassification(999)?.getName()).toBe(undefined);
    expect(China.getChild('11')?.getChild('999', true)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(999, true)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getClassification('999', true)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getClassification(999, true)?.getName()).toBe(undefined);

    expect(China.getChild('11')?.getChild('999', false)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(999, false)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getClassification('999', false)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getClassification(999, false)?.getName()).toBe(undefined);
})

test('县级行政区', () => {
    expect(China.getChild('11')?.getChild('01')?.getChild('01')?.getName()).toBe('东城区');
    expect(China.getChild(11)?.getChild(1)?.getChild(1)?.getName()).toBe('东城区');
    expect(China.getProvince('11')?.getPrefecture('01')?.getCounty('01')?.getName()).toBe('东城区');
    expect(China.getProvince(11)?.getPrefecture(1)?.getCounty(1)?.getName()).toBe('东城区');
    expect(China.getChild('11')?.getChild('01')?.getChild('01', true)?.getName()).toBe('东城区');
    expect(China.getChild(11)?.getChild(1)?.getChild(1, true)?.getName()).toBe('东城区');
    expect(China.getProvince('11')?.getPrefecture('01')?.getCounty('01', true)?.getName()).toBe('东城区');
    expect(China.getProvince(11)?.getPrefecture(1)?.getCounty(1, true)?.getName()).toBe('东城区');

    expect(China.getChild('11')?.getChild('01')?.getChild('01', false)?.getName()).toBe('东城区');
    expect(China.getChild(11)?.getChild(1)?.getChild(1, false)?.getName()).toBe('东城区');
    expect(China.getProvince('11')?.getPrefecture('01')?.getCounty('01', false)?.getName()).toBe('东城区');
    expect(China.getProvince(11)?.getPrefecture(1)?.getCounty(1, false)?.getName()).toBe('东城区');


    expect(China.getChild('11')?.getChild('01')?.getChild('03')?.getName()).toBe('崇文区');
    expect(China.getChild(11)?.getChild(1)?.getChild(3)?.getName()).toBe('崇文区');
    expect(China.getProvince('11')?.getPrefecture('01')?.getCounty('03')?.getName()).toBe('崇文区');
    expect(China.getProvince(11)?.getPrefecture(1)?.getCounty(3)?.getName()).toBe('崇文区');
    expect(China.getChild('11')?.getChild('01')?.getChild('03', true)?.getName()).toBe('崇文区');
    expect(China.getChild(11)?.getChild(1)?.getChild(3, true)?.getName()).toBe('崇文区');
    expect(China.getProvince('11')?.getPrefecture('01')?.getCounty('03', true)?.getName()).toBe('崇文区');
    expect(China.getProvince(11)?.getPrefecture(1)?.getCounty(3, true)?.getName()).toBe('崇文区');

    expect(China.getChild('11')?.getChild('01')?.getChild('03', false)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(1)?.getChild(3, false)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getPrefecture('01')?.getCounty('03', false)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getPrefecture(1)?.getCounty(3, false)?.getName()).toBe(undefined);


    expect(China.getChild('11')?.getChild('01')?.getChild('99')?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(1)?.getChild(99)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getPrefecture('01')?.getCounty('99')?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getPrefecture(1)?.getCounty(99)?.getName()).toBe(undefined);
    expect(China.getChild('11')?.getChild('01')?.getChild('99', true)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(1)?.getChild(99, true)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getPrefecture('01')?.getCounty('99', true)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getPrefecture(1)?.getCounty(99, true)?.getName()).toBe(undefined);

    expect(China.getChild('11')?.getChild('01')?.getChild('99', false)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(1)?.getChild(99, false)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getPrefecture('01')?.getCounty('99', false)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getPrefecture(1)?.getCounty(99, false)?.getName()).toBe(undefined);
});

test('经济功能区', () => {
    expect(China.getChild('11')?.getChild('101')?.getChild('001')?.getName()).toBe('北京经济技术开发区');
    expect(China.getChild(11)?.getChild(101)?.getChild(1)?.getName()).toBe('北京经济技术开发区');
    expect(China.getProvince('11')?.getClassification('101')?.getZone('001')?.getName()).toBe('北京经济技术开发区');
    expect(China.getProvince(11)?.getClassification(101)?.getZone(1)?.getName()).toBe('北京经济技术开发区');
    expect(China.getChild('11')?.getChild('101')?.getChild('001', true)?.getName()).toBe('北京经济技术开发区');
    expect(China.getChild(11)?.getChild(101)?.getChild(1, true)?.getName()).toBe('北京经济技术开发区');
    expect(China.getProvince('11')?.getClassification('101')?.getZone('001', true)?.getName()).toBe('北京经济技术开发区');
    expect(China.getProvince(11)?.getClassification(101)?.getZone(1, true)?.getName()).toBe('北京经济技术开发区');

    expect(China.getChild('11')?.getChild('101')?.getChild('001', false)?.getName()).toBe('北京经济技术开发区');
    expect(China.getChild(11)?.getChild(101)?.getChild(1, false)?.getName()).toBe('北京经济技术开发区');
    expect(China.getProvince('11')?.getClassification('101')?.getZone('001', false)?.getName()).toBe('北京经济技术开发区');
    expect(China.getProvince(11)?.getClassification(101)?.getZone(1, false)?.getName()).toBe('北京经济技术开发区');


    // todo deprecated


    expect(China.getChild('11')?.getChild('101')?.getChild('999')?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(101)?.getChild(999)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getClassification('101')?.getZone('999')?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getClassification(101)?.getZone(999)?.getName()).toBe(undefined);
    expect(China.getChild('11')?.getChild('101')?.getChild('999', true)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(101)?.getChild(999, true)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getClassification('101')?.getZone('999', true)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getClassification(101)?.getZone(999, true)?.getName()).toBe(undefined);

    expect(China.getChild('11')?.getChild('101')?.getChild('999', false)?.getName()).toBe(undefined);
    expect(China.getChild(11)?.getChild(101)?.getChild(999, false)?.getName()).toBe(undefined);
    expect(China.getProvince('11')?.getClassification('101')?.getZone('999', false)?.getName()).toBe(undefined);
    expect(China.getProvince(11)?.getClassification(101)?.getZone(999, false)?.getName()).toBe(undefined);
});

test('功能性测试', () => {
    expect(China.listChildren().map((v, _) => v.getShortName()).get(11)).toBe('北京');

    expect(China.getChild('11')?.getLevel()).toBe(1);
    expect(China.getChild('11')?.getChild('101')?.getLevel()).toBe(2);
    expect(China.getChild('11')?.getChild('101')?.getChild('001')?.getLevel()).toBe(3);
    expect(China.getChild('11')?.getChild('01')?.getChild('101001')?.getLevel()).toBe(3);
    expect(China.getProvince('11')?.getPrefecture('01')?.getZone('101001')?.getLevel()).toBe(3);
    expect(China.getChild(11)?.getChild(1)?.getChild(101001)?.getLevel()).toBe(3);
    expect(China.getProvince(11)?.getPrefecture(1)?.getZone(101001)?.getLevel()).toBe(3);

    expect(China.getChild('11')?.getFullCode()).toBe(11);
    expect(China.getChild('11')?.getChild('101')?.getFullCode()).toBe(11101);
    expect(China.getChild('11')?.getChild('101')?.getChild('001')?.getFullCode()).toBe(11101001);
    expect(China.getChild('11')?.getChild('01')?.getChild('101001')?.getFullCode()).toBe(11101001);
    expect(China.getProvince('11')?.getPrefecture('01')?.getZone('101001')?.getFullCode()).toBe(11101001);
    expect(China.getChild(11)?.getChild(1)?.getChild(101001)?.getFullCode()).toBe(11101001);
    expect(China.getProvince(11)?.getPrefecture(1)?.getZone(101001)?.getFullCode()).toBe(11101001);

    expect(China.getChild('11')?.getFullCode()).toBe(11);
    expect(China.getChild('11')?.getChild('01')?.getFullCode()).toBe(1101);
    expect(China.getChild('11')?.getChild('01')?.getChild('01')?.getFullCode()).toBe(110101);

    expect(China.getProvince(11)?.getPrefecture(1)?.getZone(101001)?.getFullName()).toBe('北京市 北京经济技术开发区');
    expect(China.getProvince(11)?.getClassification(101)?.getZone(1)?.getFullName()).toBe('北京市 北京经济技术开发区');
    expect(China.getProvince(32)?.getPrefecture(5)?.getZone(101004)?.getFullName()).toBe('江苏省 苏州工业园区');
    expect(China.getProvince(32)?.getClassification(101)?.getZone(4)?.getFullName()).toBe('江苏省 苏州工业园区');
});
