import { isIterationComplete } from './utils';

describe('This helper function', () => {

	it('tells whether an iteration has been completed', () => {
		expect(isIterationComplete([
			[true, false, false],
			[true, true, true],
			[false, false, false]
		])).toBe(false);
		expect(isIterationComplete([
			[true, false, false],
			[false, true, false],
			[false, true, false]
		])).toBe(true);
		expect(isIterationComplete([
			[],
			[],
			[]
		])).toBe(false);
		expect(isIterationComplete([
			[true],
			[true],
			[true]
		])).toBe(true);
	});

});
