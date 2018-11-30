
/**
 * Trida pro praci s typen Date.
 *
 */
const DateTime = {
  /**
   *  Prevod Date na textovou reprezentaci datumu
   */
  date2string (date, version) {
    let strDate = ''
    if (version === 'input') {
      // 2000-12-30
      strDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    } else {
      // 1.9.2000
      strDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    }
    return strDate
  },

  /**
   * Prevod Date na textovou reprezentaci casu
   */
  time2string (date, version) {
    let strTime = ''
    strTime = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
    return strTime
  },

  getAge (birthday, nowDate = new Date()) {
    let ageDifMs = Date.now() - birthday.getTime()
    let ageDate = new Date(ageDifMs) // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  },
}

module.exports = DateTime;

