// import reducer, {
//     setPayrolls,
//     setPayroll,
//     loadingPayrolls,
// } from '../redux/payrollSlice';

// const initialState = {
//     payrolls: [],
//     payroll: {},
//     loading: false,
// };

// const testStatePass = {
//     payrolls: [],
//     payroll: {},
//     loading: true,
// };

// describe('payroll state test', () => {
//     it('should return the initial state', () => {
//         expect(reducer(undefined, {})).toEqual(initialState);
//     });

//     // Set Payrolls pass
//     it('handles setPayrolls pass', () => {
//         expect(
//             reducer(
//                 initialState,
//                 setPayrolls({
//                     period: '2022-1',
//                     shifts: [
//                         {
//                             _id: '62366ffcf5babb1d5b667',
//                             teacher: {
//                                 id: '628d74e79b7de75762ea432c',
//                                 email: 'tester@test.com',
//                                 hourlyRate: '28',
//                                 taxRate: '10',
//                             },
//                             startTime: '2022-02-26T20:00:00.000Z',
//                             endTime: '2022-02-21T21:00:00.000Z',
//                             hours: 1,
//                             pay: 20,
//                             deductions: 2,
//                             netPay: 18,
//                         },
//                         {
//                             _id: '62300ffcf5dc5babb1d5b609',
//                             teacher: {
//                                 id: '620d74e79b7de75762ea432c',
//                                 email: 'tester@test.com',
//                                 hourlyRate: '20',
//                                 taxRate: '10',
//                             },
//                             startTime: '2022-01-21T20:00:00.000Z',
//                             endTime: '2022-01-21T21:00:00.000Z',
//                             hours: 1,
//                             pay: 20,
//                             deductions: 2,
//                             netPay: 18,
//                         },
//                     ],
//                     hours: 16,
//                     pay: 480,
//                     deductions: 24,
//                     netPay: 456,
//                 })
//             )
//         ).toEqual({
//             ...initialState,
//             payrolls: {
//                 period: '2022-1',
//                 shifts: [
//                     {
//                         _id: '62366ffcf5babb1d5b667',
//                         teacher: {
//                             id: '628d74e79b7de75762ea432c',
//                             email: 'tester@test.com',
//                             hourlyRate: '28',
//                             taxRate: '10',
//                         },
//                         startTime: '2022-02-26T20:00:00.000Z',
//                         endTime: '2022-02-21T21:00:00.000Z',
//                         hours: 1,
//                         pay: 20,
//                         deductions: 2,
//                         netPay: 18,
//                     },
//                     {
//                         _id: '62300ffcf5dc5babb1d5b609',
//                         teacher: {
//                             id: '620d74e79b7de75762ea432c',
//                             email: 'tester@test.com',
//                             hourlyRate: '20',
//                             taxRate: '10',
//                         },
//                         startTime: '2022-01-21T20:00:00.000Z',
//                         endTime: '2022-01-21T21:00:00.000Z',
//                         hours: 1,
//                         pay: 20,
//                         deductions: 2,
//                         netPay: 18,
//                     },
//                 ],
//                 hours: 16,
//                 pay: 480,
//                 deductions: 24,
//                 netPay: 456,
//             },
//             loading: false,
//         });
//     });

//     // Set Payrolls pass
//     it('handles setPayrolls pass', () => {
//         expect(
//             reducer(
//                 initialState,
//                 setPayroll({
//                     period: '2022-3',
//                     shifts: [
//                         {
//                             _id: '62366ffcf5babb1d5b667',
//                             teacher: {
//                                 id: '628d74e79b7de75762ea432c',
//                                 email: 'tester@test.com',
//                                 hourlyRate: '28',
//                                 taxRate: '10',
//                             },
//                             startTime: '2022-02-26T20:00:00.000Z',
//                             endTime: '2022-02-21T21:00:00.000Z',
//                             hours: 1,
//                             pay: 20,
//                             deductions: 2,
//                             netPay: 18,
//                         },
//                         {
//                             _id: '62300ffcf5dc5babb1d5b609',
//                             teacher: {
//                                 id: '620d74e79b7de75762ea432c',
//                                 email: 'tester@test.com',
//                                 hourlyRate: '20',
//                                 taxRate: '10',
//                             },
//                             startTime: '2022-01-21T20:00:00.000Z',
//                             endTime: '2022-01-21T21:00:00.000Z',
//                             hours: 1,
//                             pay: 20,
//                             deductions: 2,
//                             netPay: 18,
//                         },
//                     ],
//                     hours: 16,
//                     pay: 480,
//                     deductions: 24,
//                     netPay: 456,
//                 })
//             )
//         ).toEqual({
//             ...initialState,
//             payroll: {
//                 period: '2022-3',
//                 shifts: [
//                     {
//                         _id: '62366ffcf5babb1d5b667',
//                         teacher: {
//                             id: '628d74e79b7de75762ea432c',
//                             email: 'tester@test.com',
//                             hourlyRate: '28',
//                             taxRate: '10',
//                         },
//                         startTime: '2022-02-26T20:00:00.000Z',
//                         endTime: '2022-02-21T21:00:00.000Z',
//                         hours: 1,
//                         pay: 20,
//                         deductions: 2,
//                         netPay: 18,
//                     },
//                     {
//                         _id: '62300ffcf5dc5babb1d5b609',
//                         teacher: {
//                             id: '620d74e79b7de75762ea432c',
//                             email: 'tester@test.com',
//                             hourlyRate: '20',
//                             taxRate: '10',
//                         },
//                         startTime: '2022-01-21T20:00:00.000Z',
//                         endTime: '2022-01-21T21:00:00.000Z',
//                         hours: 1,
//                         pay: 20,
//                         deductions: 2,
//                         netPay: 18,
//                     },
//                 ],
//                 hours: 16,
//                 pay: 480,
//                 deductions: 24,
//                 netPay: 456,
//             },
//             loading: false,
//         });
//     });
//     it('handles loading pass', () => {
//         expect(reducer(testStatePass, loadingPayrolls)).toEqual({
//             ...testStatePass,
//             loading: true,
//         });
//     });
// });
