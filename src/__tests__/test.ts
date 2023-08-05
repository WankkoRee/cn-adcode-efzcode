import cncode from '../index.js';

test('省级现有区划', () => {
    expect(cncode.get('11', false)[0]?.name).toBe('北京市'); // false, undefined, undefined
    expect(cncode.get('1100', false)[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.get('110000', false)[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.get('1101', false)[0]?.name).toBe('北京市'); // false, false, undefined
    expect(cncode.get('110100', false)[0]?.name).toBe('北京市'); // false, false, null
    expect(cncode.get('1102', false)[0]?.name).toBe('北京市'); // false, true, undefined
    expect(cncode.get('110200', false)[0]?.name).toBe('北京市'); // false, true, null
    expect(cncode.get('1103', false)[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.get('110300', false)[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.get('110101', false)[0]?.name).toBe('北京市'); // false, false, false
    expect(cncode.get('110103', false)[0]?.name).toBe('北京市'); // false, false, true
    expect(cncode.get('110201', false)[0]?.name).toBe('北京市'); // false, true, true

    expect(cncode.get('99', false)[0]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.get('9999', false)[0]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.get('999999', false)[0]?.name).toBe(undefined); // null, null, null
});

test('地级现有区划', () => {
    expect(cncode.get('11', false)[1]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.get('1100', false)[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110000', false)[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('1101', false)[1]?.name).toBe('市辖区'); // false, false, undefined
    expect(cncode.get('110100', false)[1]?.name).toBe('市辖区'); // false, false, null
    expect(cncode.get('1102', false)[1]?.name).toBe(undefined); // false, true, undefined
    expect(cncode.get('110200', false)[1]?.name).toBe(undefined); // false, true, null
    expect(cncode.get('1103', false)[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110300', false)[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('110101', false)[1]?.name).toBe('市辖区'); // false, false, false
    expect(cncode.get('110103', false)[1]?.name).toBe('市辖区'); // false, false, true
    expect(cncode.get('110201', false)[1]?.name).toBe(undefined); // false, true, true

    expect(cncode.get('99', false)[1]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.get('9999', false)[1]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.get('999999', false)[1]?.name).toBe(undefined); // null, null, null
});

test('县级现有区划', () => {
    expect(cncode.get('11', false)[2]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.get('1100', false)[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110000', false)[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('1101', false)[2]?.name).toBe(undefined); // false, false, undefined
    expect(cncode.get('110100', false)[2]?.name).toBe(undefined); // false, false, null
    expect(cncode.get('1102', false)[2]?.name).toBe(undefined); // false, true, undefined
    expect(cncode.get('110200', false)[2]?.name).toBe(undefined); // false, true, null
    expect(cncode.get('1103', false)[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110300', false)[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('110101', false)[2]?.name).toBe('东城区'); // false, false, false
    expect(cncode.get('110103', false)[2]?.name).toBe(undefined); // false, false, true
    expect(cncode.get('110201', false)[2]?.name).toBe(undefined); // false, true, true

    expect(cncode.get('99', false)[2]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.get('9999', false)[2]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.get('999999', false)[2]?.name).toBe(undefined); // null, null, null
});


test('省级所有区划', () => {
    expect(cncode.get('11', true)[0]?.name).toBe('北京市'); // false, undefined, undefined
    expect(cncode.get('1100', true)[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.get('110000', true)[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.get('1101', true)[0]?.name).toBe('北京市'); // false, false, undefined
    expect(cncode.get('110100', true)[0]?.name).toBe('北京市'); // false, false, null
    expect(cncode.get('1102', true)[0]?.name).toBe('北京市'); // false, true, undefined
    expect(cncode.get('110200', true)[0]?.name).toBe('北京市'); // false, true, null
    expect(cncode.get('1103', true)[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.get('110300', true)[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.get('110101', true)[0]?.name).toBe('北京市'); // false, false, false
    expect(cncode.get('110103', true)[0]?.name).toBe('北京市'); // false, false, true
    expect(cncode.get('110201', true)[0]?.name).toBe('北京市'); // false, true, true

    expect(cncode.get('99', true)[0]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.get('9999', true)[0]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.get('999999', true)[0]?.name).toBe(undefined); // null, null, null

    expect(cncode.get('11')[0]?.name).toBe('北京市'); // false, undefined, undefined
    expect(cncode.get('1100')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.get('110000')[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.get('1101')[0]?.name).toBe('北京市'); // false, false, undefined
    expect(cncode.get('110100')[0]?.name).toBe('北京市'); // false, false, null
    expect(cncode.get('1102')[0]?.name).toBe('北京市'); // false, true, undefined
    expect(cncode.get('110200')[0]?.name).toBe('北京市'); // false, true, null
    expect(cncode.get('1103')[0]?.name).toBe('北京市'); // false, null, undefined
    expect(cncode.get('110300')[0]?.name).toBe('北京市'); // false, null, null

    expect(cncode.get('110101')[0]?.name).toBe('北京市'); // false, false, false
    expect(cncode.get('110103')[0]?.name).toBe('北京市'); // false, false, true
    expect(cncode.get('110201')[0]?.name).toBe('北京市'); // false, true, true

    expect(cncode.get('99')[0]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.get('9999')[0]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.get('999999')[0]?.name).toBe(undefined); // null, null, null
});

test('地级所有区划', () => {
    expect(cncode.get('11', true)[1]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.get('1100', true)[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110000', true)[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('1101', true)[1]?.name).toBe('市辖区'); // false, false, undefined
    expect(cncode.get('110100', true)[1]?.name).toBe('市辖区'); // false, false, null
    expect(cncode.get('1102', true)[1]?.name).toBe('县'); // false, true, undefined
    expect(cncode.get('110200', true)[1]?.name).toBe('县'); // false, true, null
    expect(cncode.get('1103', true)[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110300', true)[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('110101', true)[1]?.name).toBe('市辖区'); // false, false, false
    expect(cncode.get('110103', true)[1]?.name).toBe('市辖区'); // false, false, true
    expect(cncode.get('110201', true)[1]?.name).toBe('县'); // false, true, true

    expect(cncode.get('99', true)[1]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.get('9999', true)[1]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.get('999999', true)[1]?.name).toBe(undefined); // null, null, null

    expect(cncode.get('11')[1]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.get('1100')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110000')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('1101')[1]?.name).toBe('市辖区'); // false, false, undefined
    expect(cncode.get('110100')[1]?.name).toBe('市辖区'); // false, false, null
    expect(cncode.get('1102')[1]?.name).toBe('县'); // false, true, undefined
    expect(cncode.get('110200')[1]?.name).toBe('县'); // false, true, null
    expect(cncode.get('1103')[1]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110300')[1]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('110101')[1]?.name).toBe('市辖区'); // false, false, false
    expect(cncode.get('110103')[1]?.name).toBe('市辖区'); // false, false, true
    expect(cncode.get('110201')[1]?.name).toBe('县'); // false, true, true

    expect(cncode.get('99')[1]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.get('9999')[1]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.get('999999')[1]?.name).toBe(undefined); // null, null, null
});

test('县级所有区划', () => {
    expect(cncode.get('11', true)[2]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.get('1100', true)[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110000', true)[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('1101', true)[2]?.name).toBe(undefined); // false, false, undefined
    expect(cncode.get('110100', true)[2]?.name).toBe(undefined); // false, false, null
    expect(cncode.get('1102', true)[2]?.name).toBe(undefined); // false, true, undefined
    expect(cncode.get('110200', true)[2]?.name).toBe(undefined); // false, true, null
    expect(cncode.get('1103', true)[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110300', true)[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('110101', true)[2]?.name).toBe('东城区'); // false, false, false
    expect(cncode.get('110103', true)[2]?.name).toBe('崇文区'); // false, false, true
    expect(cncode.get('110201', true)[2]?.name).toBe('昌平县'); // false, true, true

    expect(cncode.get('99', true)[2]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.get('9999', true)[2]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.get('999999', true)[2]?.name).toBe(undefined); // null, null, null

    expect(cncode.get('11')[2]?.name).toBe(undefined); // false, undefined, undefined
    expect(cncode.get('1100')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110000')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('1101')[2]?.name).toBe(undefined); // false, false, undefined
    expect(cncode.get('110100')[2]?.name).toBe(undefined); // false, false, null
    expect(cncode.get('1102')[2]?.name).toBe(undefined); // false, true, undefined
    expect(cncode.get('110200')[2]?.name).toBe(undefined); // false, true, null
    expect(cncode.get('1103')[2]?.name).toBe(undefined); // false, null, undefined
    expect(cncode.get('110300')[2]?.name).toBe(undefined); // false, null, null

    expect(cncode.get('110101')[2]?.name).toBe('东城区'); // false, false, false
    expect(cncode.get('110103')[2]?.name).toBe('崇文区'); // false, false, true
    expect(cncode.get('110201')[2]?.name).toBe('昌平县'); // false, true, true

    expect(cncode.get('99')[2]?.name).toBe(undefined); // null, undefined, undefined
    expect(cncode.get('9999')[2]?.name).toBe(undefined); // null, null, undefined
    expect(cncode.get('999999')[2]?.name).toBe(undefined); // null, null, null
});
