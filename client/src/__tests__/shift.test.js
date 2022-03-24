// import store from '../redux//store';
import reducer from '../redux/shiftSlice';
// const reducer = require('../redux/shiftSlice');

describe('Shift state tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            shifts: [],
            loading: false,
        });
    });
});
