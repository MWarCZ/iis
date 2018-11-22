
export default class DateTime {
  static date2string (date, version) {
    let strDate = ''
    if (version === 'input') {
      // 2000-12-30
      strDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    } else {
      // 1.9.2000
      strDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    }
    return strDate
  }

  static time2string (date, version) {
    let strTime = ''
    strTime = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
    return strTime
  }
}
