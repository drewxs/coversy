// import store from '../redux//store';
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
};


const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA4YjgxZmRjMWEyMWUxMjc2MzFkNGUiLCJ0eXBlIjoxLCJzaXRlIjoiNjIwOGI4MWVkYzFhMjFlMTI3NjMxZDRjIiwiaWF0IjoxNjQ2NzU4MDUzfQ.UE2F4eGybDngdJdcuQXxTgb7fCPnXmLvxvAAHiJjK4Y';
const userUpdate = {
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
            zip: 'A1A1A1',
            city: 'Anytown',
            province: 'AB',
        },
        _id: '6208b81edc1a21e127631d4c',
    },
};    
const loadingUser = {
    user: userUpdate,
    errors: null,
    openEditUser: false,
    token: token,
};

describe('Admin state tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            users: [],
            loadingUsers: true,
            errors: null,
            openEditUser: false,
        });
    });

    //setUsers
    it('handles state set setUsers', () => {       
        expect(reducer(initialState, setUsers( [userUpdate]))).toEqual({
            ...initialState,
             loadingUsers:false,           
             users: [userUpdate]
        });
    });

    
    //activateUser
    it('handles state active Users', () => {
        const editUsers = {
            users: [],
        };
        expect(reducer(editUsers, activateUser([userUpdate]))).toEqual({
            ...editUsers,                        
        });
    });   
   

    //loadingUsers
    it('handles state loading Users', () => {
        expect(reducer(loadingUser, loadingUsers())).toEqual({
            ...loadingUser,                                
            loading: true
        });
    });

    //updateUser
    it('handles state update Users', () => {
        const editUsers = {
            users: [],
        };
        expect(reducer(editUsers, updateUser([userUpdate]))).toEqual({
            ...editUsers            
        });              
    });

    //setErrors
    it('handles state setErrors', () => {
        const initError = {
            errors:{} ,
            loadingUsers: true,
            openEditUser: false,
            users: []
        };
        expect(reducer(initError, setErrors({error:'error 112'}))).toEqual({
            ...initialState,                        
            errors:{error:'error 112'}            
        });
    });
    //clearErrors
    it('handles state clear Errors', () => {
        const initError = {
            errors:{} ,
            loadingUsers: true,
            openEditUser: false,
            users: []
        };
        expect(reducer(initError, clearErrors())).toEqual({
            ...initialState,
            errors:null          
        });
    });
    //openEditUser
    it('handles state open Edit User', () => {
        expect(reducer(initialState, openEditUser(true))).toEqual({
            ...initialState,
            openEditUser :true
        });
    });
});
