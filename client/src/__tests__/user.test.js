import reducer, {
    loginUser,
    registerUser,
    setUser,
    loadingUser,
    logoutUser,
} from '../redux/userSlice.js';

const initialState = {
    loading: false,
    user: [],
    loadingUser: false,
    authenticated: true,
};
const testingUser = {
    user: {
        id: '620cab00e05ecc64bcdf98f6',
        firstName: 'Test',
        lastName: 'User',
        type: 2,
        email: 'test@test.com',
        password: 'testpass',
        activated: true,
        verified: true,
        confirmationCode:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbW5ndXllbjI2MDRAZ21haWwuY29tIiwiaWF0IjoxNjQ0OTk3Mzc2fQ.-O9vsfwEMA9W2EewOHb1oIT-XJkHRPeA3fZU3baDiU',
        site: {
            address: {
                street: '123 Main St',
                zip: 'A1A1A1',
                city: 'Anytown',
                province: 'AB',
            },
            _id: '6208b81edc1a21e127631d4c',
        },
    },
};

test('submit user and password', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('handle the sign in', () => {
        expect(
            reducer(initialState, {
                type: loginUser.type,
                payload: {
                    email: 'testuser@test.com',
                    password: 'Giahoa123',
                },

                meta: {
                    successMessage: 'Successfully logged in',
                },
            })
        ).toEqual({
            loading: false,
            user: testingUser,
            loadingUser: false,
            authenticated: true,
        });
    });
    it('handle the sign up', () => {
        expect(
            reducer(initialState, {
                type: registerUser.type,
                payload: {
                    firstName: 'Test',
                    lastName: 'User',
                    email: 'riderdecade007@gmail.com',
                    password: 'Giahoa123',
                    type: 2,
                },
                meta: {
                    successMessage: 'Successfully registered',
                },
            })
        ).toEqual({
            loading: false,
            user: testingUser,
            loadingUser: false,
            authenticated: true,
        });
    });
    it('handle the set user', () => {
        expect(
            reducer(initialState, {
                type: setUser.type,
                payload: testingUser,
            })
        ).toEqual({
            loading: false,
            user: testingUser,
            loadingUser: false,
            authenticated: true,
        });
    });
    it('handle the loading user', () => {
        expect(
            reducer(initialState, {
                type: loadingUser.type,
                payload: true,
            })
        ).toEqual({
            loading: false,
            user: [],
            loadingUser: true,
            authenticated: false,
        });
    });
    it('handle the logout user', () => {
        expect(
            reducer(initialState, {
                type: logoutUser.type,
            })
        ).toEqual({
            loading: false,
            user: [],
            loadingUser: false,
            authenticated: false,
        });
    });
});
