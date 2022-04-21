/** @module date_util */

/**
 * Checks 2 dates for equality in terms of period.
 *
 * @function
 * @param {Date} date1
 * @param {Date} date2
 * @returns True if the given dates are in the same period.
 */
exports.checkSamePeriod = (date1, date2) => {
    return (
        new Date(date1).getMonth() >= new Date(date2).getMonth() &&
        new Date(date1).getFullYear() >= new Date(date2).getFullYear()
    );
};

/**
 * Checks if a ratelog contains a given period.
 *
 * @function
 * @param {Object} ratelog
 * @param {Date} date
 * @returns True if the given ratelog contains the given date period.
 */
exports.checkRatelogHasPeriod = (ratelog, date) => {
    return ratelog.some((log) => this.checkSamePeriod(log.date, date));
};
