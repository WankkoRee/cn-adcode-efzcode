import cncode from '../index.js';

test('省级现有区划', () => {
    expect(cncode.getNotDeprecated('11')[0]?.name).toBe('北京市'); // false, undefined, undefined
    expect(cncode.getNotDeprecated('1100')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.getNotDeprecated('11000')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.getNotDeprecated('110000')[0]?.name).toBe('北京市'); // false, null, null
    expect(cncode.getNotDeprecated('11000000')[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.getNotDeprecated('1101')[0]?.name).toBe('北京市'); // false, false, undefined
    expect(cncode.getNotDeprecated('11101')[0]?.name).toBe('北京市'); // false, false, undefined
    expect(cncode.getNotDeprecated('110100')[0]?.name).toBe('北京市'); // false, false, null
    expect(cncode.getNotDeprecated('11101000')[0]?.name).toBe('北京市'); // false, false, null
    expect(cncode.getNotDeprecated('1102')[0]?.name).toBe('北京市'); // false, true, undefined
    expect(cncode.getNotDeprecated('110200')[0]?.name).toBe('北京市'); // false, true, null
    expect(cncode.getNotDeprecated('1103')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.getNotDeprecated('11999')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.getNotDeprecated('110300')[0]?.name).toBe('北京市'); // false, null, null
    expect(cncode.getNotDeprecated('11999999')[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.getNotDeprecated('110101')[0]?.name).toBe('北京市'); // false, false, false
    expect(cncode.getNotDeprecated('11101001')[0]?.name).toBe('北京市'); // false, false, false
    expect(cncode.getNotDeprecated('110103')[0]?.name).toBe('北京市'); // false, false, true
    expect(cncode.getNotDeprecated('110201')[0]?.name).toBe('北京市'); // false, true, true

    expect(cncode.getNotDeprecated('99')[0]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getNotDeprecated('9999')[0]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getNotDeprecated('99999')[0]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getNotDeprecated('999999')[0]?.name).toBe(undefined); // null, null, null
    expect(cncode.getNotDeprecated('99999999')[0]?.name).toBe(undefined); // null, null, null
});

test('地级现有区划', () => {
    expect(cncode.getNotDeprecated('11')[1]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.getNotDeprecated('1100')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getNotDeprecated('110000')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.getNotDeprecated('1101')[1]?.name).toBe('市辖区'); // false, false, undefined
    expect(cncode.getNotDeprecated('110100')[1]?.name).toBe('市辖区'); // false, false, null
    expect(cncode.getNotDeprecated('1102')[1]?.name).toBe(undefined); // false, true, undefined
    expect(cncode.getNotDeprecated('110200')[1]?.name).toBe(undefined); // false, true, null
    expect(cncode.getNotDeprecated('1103')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getNotDeprecated('110300')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.getNotDeprecated('110101')[1]?.name).toBe('市辖区'); // false, false, false
    expect(cncode.getNotDeprecated('110103')[1]?.name).toBe('市辖区'); // false, false, true
    expect(cncode.getNotDeprecated('110201')[1]?.name).toBe(undefined); // false, true, true

    expect(cncode.getNotDeprecated('99')[1]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getNotDeprecated('9999')[1]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getNotDeprecated('999999')[1]?.name).toBe(undefined); // null, null, null
});

test('经济功能区现有分类', () => {
    expect(cncode.getNotDeprecated('11')[1]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.getNotDeprecated('11000')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getNotDeprecated('11000000')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.getNotDeprecated('11101')[1]?.name).toBe('经济技术开发区'); // false, false, undefined
    expect(cncode.getNotDeprecated('11101000')[1]?.name).toBe('经济技术开发区'); // false, false, null
    // expect(cncode.getNotDeprecated('11102')[1]?.name).toBe(undefined); // false, true, undefined
    // expect(cncode.getNotDeprecated('11102000')[1]?.name).toBe(undefined); // false, true, null
    expect(cncode.getNotDeprecated('11999')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getNotDeprecated('11999999')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.getNotDeprecated('11101001')[1]?.name).toBe('经济技术开发区'); // false, false, false
    // expect(cncode.getNotDeprecated('11101003')[1]?.name).toBe('市辖区'); // false, false, true
    // expect(cncode.getNotDeprecated('11102101')[1]?.name).toBe(undefined); // false, true, true

    expect(cncode.getNotDeprecated('99')[1]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getNotDeprecated('99999')[1]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getNotDeprecated('99999999')[1]?.name).toBe(undefined); // null, null, null
})

test('县级现有区划', () => {
    expect(cncode.getNotDeprecated('11')[2]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.getNotDeprecated('1100')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getNotDeprecated('110000')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.getNotDeprecated('1101')[2]?.name).toBe(undefined); // false, false, undefined
    expect(cncode.getNotDeprecated('110100')[2]?.name).toBe(undefined); // false, false, null
    expect(cncode.getNotDeprecated('1102')[2]?.name).toBe(undefined); // false, true, undefined
    expect(cncode.getNotDeprecated('110200')[2]?.name).toBe(undefined); // false, true, null
    expect(cncode.getNotDeprecated('1103')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getNotDeprecated('110300')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.getNotDeprecated('110101')[2]?.name).toBe('东城区'); // false, false, false
    expect(cncode.getNotDeprecated('110103')[2]?.name).toBe(undefined); // false, false, true
    expect(cncode.getNotDeprecated('110201')[2]?.name).toBe(undefined); // false, true, true

    expect(cncode.getNotDeprecated('99')[2]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getNotDeprecated('9999')[2]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getNotDeprecated('999999')[2]?.name).toBe(undefined); // null, null, null
});

test('经济功能区现有分区', () => {
    expect(cncode.getNotDeprecated('11')[2]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.getNotDeprecated('11000')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getNotDeprecated('11000000')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.getNotDeprecated('11101')[2]?.name).toBe(undefined); // false, false, undefined
    expect(cncode.getNotDeprecated('11101000')[2]?.name).toBe(undefined); // false, false, null
    // expect(cncode.getNotDeprecated('11102')[2]?.name).toBe(undefined); // false, true, undefined
    // expect(cncode.getNotDeprecated('11102000')[2]?.name).toBe(undefined); // false, true, null
    expect(cncode.getNotDeprecated('11999')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getNotDeprecated('11999999')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.getNotDeprecated('11101001')[2]?.name).toBe('北京经济技术开发区'); // false, false, false
    // expect(cncode.getNotDeprecated('11101003')[2]?.name).toBe(undefined); // false, false, true
    // expect(cncode.getNotDeprecated('11102001')[2]?.name).toBe(undefined); // false, true, true

    expect(cncode.getNotDeprecated('99')[2]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getNotDeprecated('99999')[2]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getNotDeprecated('99999999')[2]?.name).toBe(undefined); // null, null, null
});


test('省级所有区划', () => {
    expect(cncode.getWithDeprecated('11')[0]?.name).toBe('北京市'); // false, undefined, undefined
    expect(cncode.getWithDeprecated('1100')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.getWithDeprecated('11000')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.getWithDeprecated('110000')[0]?.name).toBe('北京市'); // false, null, null
    expect(cncode.getWithDeprecated('11000000')[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.getWithDeprecated('1101')[0]?.name).toBe('北京市'); // false, false, undefined
    expect(cncode.getWithDeprecated('11101')[0]?.name).toBe('北京市'); // false, false, undefined
    expect(cncode.getWithDeprecated('110100')[0]?.name).toBe('北京市'); // false, false, null
    expect(cncode.getWithDeprecated('11101000')[0]?.name).toBe('北京市'); // false, false, null
    expect(cncode.getWithDeprecated('1102')[0]?.name).toBe('北京市'); // false, true, undefined
    expect(cncode.getWithDeprecated('110200')[0]?.name).toBe('北京市'); // false, true, null
    expect(cncode.getWithDeprecated('1103')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.getWithDeprecated('11999')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.getWithDeprecated('110300')[0]?.name).toBe('北京市'); // false, null, null
    expect(cncode.getWithDeprecated('11999999')[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.getWithDeprecated('110101')[0]?.name).toBe('北京市'); // false, false, false
    expect(cncode.getWithDeprecated('11101001')[0]?.name).toBe('北京市'); // false, false, false
    expect(cncode.getWithDeprecated('110103')[0]?.name).toBe('北京市'); // false, false, true
    expect(cncode.getWithDeprecated('110201')[0]?.name).toBe('北京市'); // false, true, true

    expect(cncode.getWithDeprecated('99')[0]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getWithDeprecated('9999')[0]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getWithDeprecated('99999')[0]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getWithDeprecated('999999')[0]?.name).toBe(undefined); // null, null, null
    expect(cncode.getWithDeprecated('99999999')[0]?.name).toBe(undefined); // null, null, null
});

test('地级所有区划', () => {
    expect(cncode.getWithDeprecated('11')[1]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.getWithDeprecated('1100')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getWithDeprecated('110000')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.getWithDeprecated('1101')[1]?.name).toBe('市辖区'); // false, false, undefined
    expect(cncode.getWithDeprecated('110100')[1]?.name).toBe('市辖区'); // false, false, null
    expect(cncode.getWithDeprecated('1102')[1]?.name).toBe('县'); // false, true, undefined
    expect(cncode.getWithDeprecated('110200')[1]?.name).toBe('县'); // false, true, null
    expect(cncode.getWithDeprecated('1103')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getWithDeprecated('110300')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.getWithDeprecated('110101')[1]?.name).toBe('市辖区'); // false, false, false
    expect(cncode.getWithDeprecated('110103')[1]?.name).toBe('市辖区'); // false, false, true
    expect(cncode.getWithDeprecated('110201')[1]?.name).toBe('县'); // false, true, true

    expect(cncode.getWithDeprecated('99')[1]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getWithDeprecated('9999')[1]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getWithDeprecated('999999')[1]?.name).toBe(undefined); // null, null, null
});

test('经济功能区所有分类', () => {
    expect(cncode.getWithDeprecated('11')[1]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.getWithDeprecated('11000')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getWithDeprecated('11000000')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.getWithDeprecated('11101')[1]?.name).toBe('经济技术开发区'); // false, false, undefined
    expect(cncode.getWithDeprecated('11101000')[1]?.name).toBe('经济技术开发区'); // false, false, null
    // expect(cncode.getWithDeprecated('11102')[1]?.name).toBe('县'); // false, true, undefined
    // expect(cncode.getWithDeprecated('11102000')[1]?.name).toBe('县'); // false, true, null
    expect(cncode.getWithDeprecated('11999')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getWithDeprecated('11999999')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.getWithDeprecated('11101001')[1]?.name).toBe('经济技术开发区'); // false, false, false
    // expect(cncode.getWithDeprecated('11101003')[1]?.name).toBe('市辖区'); // false, false, true
    // expect(cncode.getWithDeprecated('11102001')[1]?.name).toBe('县'); // false, true, true

    expect(cncode.getWithDeprecated('99')[1]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getWithDeprecated('99999')[1]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getWithDeprecated('99999999')[1]?.name).toBe(undefined); // null, null, null
});

test('县级所有区划', () => {
    expect(cncode.getWithDeprecated('11')[2]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.getWithDeprecated('1100')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getWithDeprecated('110000')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.getWithDeprecated('1101')[2]?.name).toBe(undefined); // false, false, undefined
    expect(cncode.getWithDeprecated('110100')[2]?.name).toBe(undefined); // false, false, null
    expect(cncode.getWithDeprecated('1102')[2]?.name).toBe(undefined); // false, true, undefined
    expect(cncode.getWithDeprecated('110200')[2]?.name).toBe(undefined); // false, true, null
    expect(cncode.getWithDeprecated('1103')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getWithDeprecated('110300')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.getWithDeprecated('110101')[2]?.name).toBe('东城区'); // false, false, false
    expect(cncode.getWithDeprecated('110103')[2]?.name).toBe('崇文区'); // false, false, true
    expect(cncode.getWithDeprecated('110201')[2]?.name).toBe('昌平县'); // false, true, true

    expect(cncode.getWithDeprecated('99')[2]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getWithDeprecated('9999')[2]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getWithDeprecated('999999')[2]?.name).toBe(undefined); // null, null, null
});

test('经济功能区所有分区', () => {
    expect(cncode.getWithDeprecated('11')[2]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.getWithDeprecated('11000')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getWithDeprecated('11000000')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.getWithDeprecated('11101')[2]?.name).toBe(undefined); // false, false, undefined
    expect(cncode.getWithDeprecated('11101000')[2]?.name).toBe(undefined); // false, false, null
    // expect(cncode.getWithDeprecated('11102')[2]?.name).toBe(undefined); // false, true, undefined
    // expect(cncode.getWithDeprecated('11102000')[2]?.name).toBe(undefined); // false, true, null
    expect(cncode.getWithDeprecated('11999')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.getWithDeprecated('11999999')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.getWithDeprecated('11101001')[2]?.name).toBe('北京经济技术开发区'); // false, false, false
    // expect(cncode.getWithDeprecated('11101003')[2]?.name).toBe('崇文区'); // false, false, true
    // expect(cncode.getWithDeprecated('11102001')[2]?.name).toBe('昌平县'); // false, true, true

    expect(cncode.getWithDeprecated('99')[2]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.getWithDeprecated('99999')[2]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.getWithDeprecated('99999999')[2]?.name).toBe(undefined); // null, null, null
});
