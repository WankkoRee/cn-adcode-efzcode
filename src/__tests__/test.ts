import { province } from '../index';

test('My Greeter', () => {
    expect(province('11').short).toBe('北京');
});
