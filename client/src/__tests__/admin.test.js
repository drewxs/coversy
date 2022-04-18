import reducer, {
    setUsers,
    activateUser,
    loadingUsers,
    updateUser,
    setErrors,
    clearErrors,
    openEditUser,
} from '../redux/adminSlice';

const initialState = {
    users: [],
    loadingUsers: true,
    errors: null,
    openEditUser: false,
    openShiftUpload: false,
    shiftCount: 0,
    shiftErrorCount: 0,
};

const user = {
    id: '620cab00e05ecc64bcdf98f6',
    _id: '620cab00e05ecc64bcdf98f6',
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
            postalCode: 'A1A1A1',
            city: 'Anytown',
            province: 'AB',
        },
        _id: '6208b81edc1a21e127631d4c',
    },
};

const users = [user];

describe('Admin state tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    //setUsers
    it('handles state setUsers', () => {
        expect(reducer(undefined, setUsers([user]))).toEqual({
            ...initialState,
            loadingUsers: false,
            users: [user],
        });
    });

    //activateUser
    it('handles state activateUser', () => {
        const editUsers = {
            users: [],
        };
        expect(reducer(editUsers, activateUser([user]))).toEqual({
            ...editUsers,
        });
    });

    //loadingUsers
    it('handles state loadingUsers', () => {
        expect(reducer(undefined, loadingUsers())).toEqual({
            ...initialState,
            loading: true,
        });
    });

    //updateUser
    it('handles state updateUsers', () => {
        expect(reducer({ ...initialState, users }, updateUser(user))).toEqual({
            ...initialState,
            users,
        });
    });

    //setErrors
    it('handles state setErrors', () => {
        expect(reducer(undefined, setErrors({ error: 'error 112' }))).toEqual({
            ...initialState,
            errors: { error: 'error 112' },
        });
    });

    //clearErrors
    it('handles state clearErrors', () => {
        expect(reducer(undefined, clearErrors())).toEqual({
            ...initialState,
            errors: null,
        });
    });

    //openEditUser
    it('handles state openEditUser', () => {
        expect(reducer(undefined, openEditUser(true))).toEqual({
            ...initialState,
            openEditUser: true,
        });
    });
});
