import reducer, {
    setPayrolls,
    setPayroll,
    loadingPayrolls,
} from '../redux/payrollSlice';

const initialState = {
    payrolls: [],
    payroll: {},
    loading: false,
};

const testStatePass = {
    payrolls: [],
    payroll: {},
    loading: true,
};

describe('payroll state test', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should return the setPayrolls', () => {
        expect(
            reducer(initialState, {
                type: types.setPayrolls,
                payload: {
                    period: '2022-2',
                    shifts: [{ id: '1', teacher: 'someone' }],
                    hours: 2,
                    pay: 480,
                    deductions: 24,
                    netPay: 456,
                },
            }).toEqual({
                ...initialState,
                shifts: [{ id: '1', teacher: 'someone' }],
                loading: false,
            })
        );
    });

    it('handles loading pass', () => {
        expect(reducer(testStatePass, loadingPayrolls)).toEqual({
            ...testStatePass,
            loading: true,
        });
    });
});
