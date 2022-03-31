import reducer, {
    loginUser,
    registerUser,
    setUser,
    loadingUser,
    logoutUser,
} from '../mock/mock.user';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA4YjgxZmRjMWEyMWUxMjc2MzFkNGUiLCJ0eXBlIjoxLCJzaXRlIjoiNjIwOGI4MWVkYzFhMjFlMTI3NjMxZDRjIiwiaWF0IjoxNjQ2NzU4MDUzfQ.UE2F4eGybDngdJdcuQXxTgb7fCPnXmLvxvAAHiJjK4Y';

const initialState = {
    user: {},
    sites: [],
    token: null,
    authenticated: false,
    loading: true,
    success: false,
    errors: null,
    updateErrors: null,
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
    token: token,
};

describe('submit user and password', () => {
    // it('should return the initial state', () => {
    //     expect(reducer(undefined, {})).toEqual(initialState);
    // });
    it('handle the login in', () => {
        expect(
            reducer(initialState, {
                type: loginUser.type,
                payload: {
                    user: {
                        _id: '6208b81fdc1a21e127631d4e',
                        firstName: 'SITE',
                        lastName: 'ADMIN',
                        type: 1,
                        email: 'test@test.com',
                        password:
                            '$2a$10$SjW7f3VAjeWJypbHgEMpxesYcGo7ya0mjqH99z70jB6u6UAnBTVsW',
                        verified: true,
                        site: '6208b81edc1a21e127631d4c',
                        __v: 0,
                        hourlyRate: 20,
                        taxRate: 10,
                        avatar: 'user/images/1648712884483',
                        phone: '1111111111',
                        activated: false,
                    },
                    token: token,
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
                site: '6208b81edc1a21e127631d4c',
                __v: 0,
                hourlyRate: 20,
                taxRate: 10,
                avatar: 'user/images/1648712884483',
                phone: '1111111111',
                activated: false,
            },
            sites: [],
            token: token,
            authenticated: true,
            loading: true,
            success: false,
            errors: null,
            updateErrors: null,
        });
    });
    // it('handle the sign up', () => {
    //     expect(
    //         reducer(initialState, {
    //             type: registerUser.type,
    //             meta: {
    //                 successMessage: 'Successfully registered',
    //             },
    //         })
    //     ).toEqual({
    //         loading: false,
    //         user: testingUser,
    //         loadingUser: false,
    //         authenticated: false,
    //     });
    // });
    // it('handle the set user', () => {
    //     expect(
    //         reducer(initialState, {
    //             type: setUser.type,
    //             payload: {
    //                 _id: '6208b81fdc1a21e127631d4e',
    //                 firstName: 'SITE',
    //                 lastName: 'ADMIN',
    //                 type: 1,
    //                 email: 'test@test.com',
    //                 password:
    //                     '$2a$10$SjW7f3VAjeWJypbHgEMpxesYcGo7ya0mjqH99z70jB6u6UAnBTVsW',
    //                 verified: true,
    //                 site: {
    //                     address: {
    //                         street: '123 Main St',
    //                         zip: 'A1A1A1',
    //                         city: 'Anytown',
    //                         province: 'AB',
    //                     },
    //                     _id: '6208b81edc1a21e127631d4c',
    //                     name: 'Test Site',
    //                     __v: 0,
    //                 },
    //                 __v: 0,
    //                 hourlyRate: 20,
    //                 taxRate: 10,
    //                 avatar: 'user/images/1648712884483',
    //                 phone: '1111111111',
    //                 activated: true,
    //             },
    //         })
    //     ).toEqual({
    //         loading: false,
    //         user: testingUser,
    //         loadingUser: false,
    //         authenticated: true,
    //     });
    // });
    // it('handle the loading user', () => {
    //     expect(
    //         reducer(initialState, {
    //             type: loadingUser.type,
    //         })
    //     ).toEqual({
    //         loading: false,
    //         user: [],
    //         loadingUser: true,
    //         authenticated: false,
    //     });
    // });
    // it('handle the logout user', () => {
    //     expect(
    //         reducer(initialState, {
    //             type: logoutUser.type,
    //         })
    //     ).toEqual({
    //         loading: false,
    //         user: [],
    //         loadingUser: false,
    //         authenticated: false,
    //     });
    // });
});
