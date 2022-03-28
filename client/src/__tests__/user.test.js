import reducer from '../redux/userSlice.js';

describe('User state test', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            text: '',
            complete: false,
            id: 0,
        });
    });
});
describe('user test state 1', () => {
    it('take care of user', () => {
        const action = {
            type: 'SET_USER',
            payload: {
                id: 1,
                name: 'test',
                email: 'riderdecade007@gmail.com',
            },
        };
        const state = {
            text: '',
            complete: false,
            id: 0,
        };
        expect(reducer(state, action)).toEqual({
            text: '',
            complete: false,
            id: 1,
        });
    });
});
