import reducer, {
    setTickets,
    setResolvedTickets,
    addTicket,
    setResolved,
    setUnresolved,
    loadingTickets,
    loadingResolvedTickets,
} from '../redux/ticketSlice';

const initialState = {
    tickets: [],
    resolvedtickets: [],
    loading: false,
    loadingResolved: false,
};
const testLoading = {
    tickets: [],
    resolvedtickets: [],
    loading: true,
    loadingResolved: false,
};

const testLoadingResolved = {
    tickets: [],
    resolvedtickets: [],
    loading: false,
    loadingResolved: true,
};

const testsetResolved = {
    tickets: [
        {
            _id: '62391094af07064e5e7ee938',
            type: 1,
            message: 'test ticket 1',
            resolved: true,
            user: {
                _id: '6208b81fdc1a21e127631d4e',
                firstName: 'SITE',
                lastName: 'ADMIN',
                email: 'test@test.com',
                phone: '1111111111',
            },
            site: '6208b81edc1a21e127631d4c',
        },
    ],
    resolvedtickets: [],
    loading: false,
    loadingResolved: true,
};

describe('ticket state test', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handle setTickets', () => {
        expect(
            reducer(
                initialState,
                setTickets({
                    _id: '62391094af07064e5e7ee938',
                    type: 1,
                    message: 'test ticket 1',
                    resolved: false,
                    user: {
                        _id: '6208b81fdc1a21e127631d4e',
                        firstName: 'SITE',
                        lastName: 'ADMIN',
                        email: 'test@test.com',
                        phone: '1111111111',
                    },
                    site: '6208b81edc1a21e127631d4c',
                })
            )
        ).toEqual({
            ...initialState,
            tickets: {
                _id: '62391094af07064e5e7ee938',
                type: 1,
                message: 'test ticket 1',
                resolved: false,
                user: {
                    _id: '6208b81fdc1a21e127631d4e',
                    firstName: 'SITE',
                    lastName: 'ADMIN',
                    email: 'test@test.com',
                    phone: '1111111111',
                },
                site: '6208b81edc1a21e127631d4c',
            },
            loading: false,
        });
    });
    //test setResolvedTickets

    it('gets the ResolvedTickets', () => {
        expect(
            reducer(
                initialState,
                setResolvedTickets({
                    _id: '62391094af07064e5e7ee938',
                    type: 1,
                    message: 'test ticket 1',
                    resolved: false,
                    user: {
                        _id: '6208b81fdc1a21e127631d4e',
                        firstName: 'SITE',
                        lastName: 'ADMIN',
                        email: 'test@test.com',
                        phone: '1111111111',
                    },
                    site: '6208b81edc1a21e127631d4c',
                })
            )
        ).toEqual({
            ...initialState,
            resolvedTickets: {
                _id: '62391094af07064e5e7ee938',
                type: 1,
                message: 'test ticket 1',
                resolved: false,
                user: {
                    _id: '6208b81fdc1a21e127631d4e',
                    firstName: 'SITE',
                    lastName: 'ADMIN',
                    email: 'test@test.com',
                    phone: '1111111111',
                },
                site: '6208b81edc1a21e127631d4c',
            },
            loadingResolved: false,
        });
    });

    //TEST ADDTicket
    it('Test add Ticket', () => {
        expect(
            reducer(
                initialState,
                addTicket({
                    _id: '62391094af07064e5e7ee938',
                    type: 1,
                    message: 'test ticket 1',
                    resolved: false,
                    user: {
                        _id: '6208b81fdc1a21e127631d4e',
                        firstName: 'SITE',
                        lastName: 'ADMIN',
                        email: 'test@test.com',
                        phone: '1111111111',
                    },
                    site: '6208b81edc1a21e127631d4c',
                })
            )
        ).toEqual([
            {
                ...initialState,
                tickets: {
                    _id: '62391094af07064e5e7ee938',
                    type: 1,
                    message: 'test ticket 1',
                    resolved: false,
                    user: {
                        _id: '6208b81fdc1a21e127631d4e',
                        firstName: 'SITE',
                        lastName: 'ADMIN',
                        email: 'test@test.com',
                        phone: '1111111111',
                    },
                    site: '6208b81edc1a21e127631d4c',
                },
                loading: false,
            },
        ]);
    });

    //test setResolved
    it('test setResolved', () => {
        expect(reducer(testsetResolved, setResolved({}))).toEqual({
            ...testsetResolved,
            tickets: [],
            resolvedTickets: {
                _id: '62391094af07064e5e7ee938',
                type: 1,
                message: 'test ticket 1',
                resolved: true,
                user: {
                    _id: '6208b81fdc1a21e127631d4e',
                    firstName: 'SITE',
                    lastName: 'ADMIN',
                    email: 'test@test.com',
                    phone: '1111111111',
                },
                site: '6208b81edc1a21e127631d4c',
            },
            loading: false,
            loadingResolved: false,
        });
    });

    //test loading ticket

    it('test loadingTickets', () => {
        expect(reducer(testLoading, loadingTickets())).toEqual({
            ...testLoading,
            loading: true,
        });
    });

    it('test loadingResolvedTickets', () => {
        expect(reducer(testLoadingResolved, loadingResolvedTickets())).toEqual({
            ...testLoadingResolved,
            loadingResolved: true,
        });
    });
});
