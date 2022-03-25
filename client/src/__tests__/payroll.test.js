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

    it('handles setPayroll pass', () => {
        expect(reducer(initialState, setPayrolls('test to pass'))).toEqual({
            ...initialState,
            payrolls: 'test to pass',
            loading: false,
        });
    });

    it('handles setPayroll pass', () => {
        expect(reducer(initialState, setPayroll('test to pass'))).toEqual({
            ...initialState,
            payroll: 'test to pass',
            loading: false,
        });
    });

    it('handles loading pass', () => {
        expect(reducer(testStatePass, loadingPayrolls)).toEqual({
            ...testStatePass,
            loading: true,
        });
    });
});
