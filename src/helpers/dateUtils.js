/* 
    usage 
    today: 2023-10-20
    after 7 days getDateRelativeToToday(7)  => 2023-10-27
    before 7 days getDateRelativeToToday(-7) => 2023-10-13
*/
const getDateRelativeToToday = (days) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() + days);
  const formattedDate = sevenDaysAgo.toISOString().split("T")[0];
  return formattedDate;
};

/**
 *
 * @param {number} hours
 * @returns {Date}
 */
const getDateAfterHours = (hours) => {
  const now = new Date();
  const afterHours = new Date(now);
  afterHours.setHours(now.getHours() + hours);
  return afterHours;
};
/**
 *
 * @param {number} days
 * @returns {Date}
 */
const getDateAfterDays = (days) => {
  const now = new Date();
  const afterDays = new Date(now);
  afterDays.setDate(now.getDate() + days);
  return afterDays;
};

/**
 *
 * @param {string} isoDateString
 * @returns {string}
 */
const getDateStringFromISO = (isoDateString) => {
  return isoDateString.split("T")[0];
};

module.exports = {
  getDateRelativeToToday,
  getDateStringFromISO,
  getDateAfterHours,
  getDateAfterDays,
};
