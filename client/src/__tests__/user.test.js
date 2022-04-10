import reducer, {
    loginUser,
    registerUser,
    setUser,
    loadingUser,
    logoutUser,
} from '../mock/mock.user';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA4YjgxZmRjMWEyMWUxMjc2MzFkNGUiLCJ0eXBlIjoxLCJzaXRlIjoiNjIwOGI4MWVkYzFhMjFlMTI3NjMxZDRjIiwiaWF0IjoxNjQ2NzU4MDUzfQ.UE2F4eGybDngdJdcuQXxTgb7fCPnXmLvxvAAHiJjK4Y';

const user = {
    _id: '6208b81fdc1a21e127631d4e',
    firstName: 'SITE',
    lastName: 'ADMIN',
    type: 1,
    email: 'test@test.com',
    password: '$2a$10$SjW7f3VAjeWJypbHgEMpxesYcGo7ya0mjqH99z70jB6u6UAnBTVsW',
    verified: true,
    site: {
        address: {
            street: '123 Main St',
            zip: 'A1A1A1',
            city: 'Anytown',
            province: 'AB',
        },
        _id: '6208b81edc1a21e127631d4c',
        name: 'Test Site',
        __v: 0,
    },
    __v: 0,
    hourlyRate: 20,
    taxRate: 10,
    avatar: 'user/images/1648712884483',
    phone: '1111111111',
    activated: true,
};

const initialState = {
    user: {},
    sites: [],
    token: token,
    authenticated: false,
    loading: true,
    success: false,
    errors: null,
    updateErrors: null,
};

describe('submit user and password', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('handle the login in', () => {
        expect(
            reducer(initialState, {
                type: loginUser.type,
                payload: {
                    user: user,
                    token: token,
                    authenticated: true,
                },
                meta: {
                    successMessage: 'Successfully logged in',
                },
            })
        ).toEqual({
            user: {
                _id: '6208b81fdc1a21e127631d4e',
                firstName: 'SITE',
                lastName: 'ADMIN',
                type: 1,
                email: 'test@test.com',
                password:
                    '$2a$10$SjW7f3VAjeWJypbHgEMpxesYcGo7ya0mjqH99z70jB6u6UAnBTVsW',
                verified: true,
                site: {
                    address: {
                        street: '123 Main St',
                        zip: 'A1A1A1',
                        city: 'Anytown',
                        province: 'AB',
                    },
                    _id: '6208b81edc1a21e127631d4c',
                    name: 'Test Site',
                    __v: 0,
                },
                __v: 0,
                hourlyRate: 20,
                taxRate: 10,
                avatar: 'user/images/1648712884483',
                phone: '1111111111',
                activated: true,
            },
            token: token,
            authenticated: true,
            loading: true,
            success: false,
            errors: null,
            updateErrors: null,
            sites: [],
        });
    });
    it('handle the sign up', () => {
        expect(
            reducer(initialState, {
                type: registerUser.type,
                meta: {
                    successMessage: 'Successfully registered',
                },
            })
        ).toEqual({
            loading: true,
            authenticated: false,
            success: false,
            errors: null,
            updateErrors: null,
            sites: [],
            token: token,
            user: {},
        });
    });
    it('handle the set user', () => {
        expect(
            reducer(initialState, {
                type: setUser.type,
                payload: user,
            })
        ).toEqual({
            loading: false,
            authenticated: false,
            errors: null,
            sites: [],
            success: false,
            token: token,
            user: user,
            updateErrors: null,
        });
    });
    it('handle the loading user', () => {
        expect(
            reducer(initialState, {
                type: loadingUser.type,
            })
        ).toEqual({
            loading: false,
            user: {},

            authenticated: false,
            errors: null,
            loading: true,
            sites: [],
            token: token,
            success: false,
            updateErrors: null,
        });
    });
    it('handle the logout user', () => {
        expect(
            reducer(initialState, {
                type: logoutUser.type,
            })
        ).toEqual({
            loading: false,
            user: {},
            authenticated: false,
            errors: null,
            loading: true,
            token: '',
            success: false,
            sites: [],
            updateErrors: null,
        });
    });
});
