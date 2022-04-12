// import store from '../redux//store';
import reducer, {
    setShifts,
    addShift,
    editShift,
    loadingShifts,
} from '../redux/shiftSlice';

const initialState = {
    shifts: [],
    myShifts: [],
    myPostedShifts: [],
    loading: false,
};

const loadingState = {
    shift: [],
    loading: true,
};

describe('Shift state tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    // setShifts
    it('handles state set shifts test', () => {
        expect(
            reducer(
                initialState,
                setShifts([
                    {
                        hours: 1,
                        pay: 100,
                        deductions: 10,
                        netPay: 110,
                        startTime: '9:30 AM',
                        endTime: '11:00 PM',
                    },
                ])
            )
        ).toEqual({
            ...initialState,
            shifts: [
                {
                    hours: 1,
                    pay: 100,
                    deductions: 10,
                    netPay: 110,
                    startTime: '9:30 AM',
                    endTime: '11:00 PM',
                },
            ],
            loading: false,
        });
    });

    //addShifts

    it('handles add shifts test', () => {
        const initialShifts = {
            shifts: [],
        };
        expect(
            reducer(
                initialShifts,
                addShift({
                    hours: 1,
                    pay: 100,
                    deductions: 10,
                    netPay: 110,
                    startTime: '9:30 AM',
                    endTime: '11:00 PM',
                })
            )
        ).toEqual({
            ...initialShifts,
            shifts: [
                {
                    hours: 1,
                    pay: 100,
                    deductions: 10,
                    netPay: 110,
                    startTime: '9:30 AM',
                    endTime: '11:00 PM',
                },
            ],
        });
    });

    //editShifts
    it('handles editShifts shifts test', () => {
        const editShifts = {
            shifts: [],
        };
        expect(
            reducer(
                editShifts,
                editShift([
                    {
                        hours: 1,
                        pay: 100,
                        deductions: 10,
                        netPay: 110,
                        startTime: '9:30 AM',
                        endTime: '11:00 PM',
                    },
                ])
            )
        ).toEqual({
            ...editShifts,
        });
    });

    // loadingShift
    it('handle loading shift', () => {
        expect(reducer(loadingState, loadingShifts)).toEqual({
            ...loadingState,
            loading: true,
        });
    });
});
