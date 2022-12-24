export default function formatDate(newDate) {
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const d = newDate
    const year = d.getUTCFullYear()
    const date = d.getUTCDate()
    const monthIndex = d.getUTCMonth()
    const monthName = months[d.getUTCMonth()]
    const dayName = days[d.getUTCDay()] // Thu
    const formatted = `${dayName}, ${date} ${monthName} ${year}`
    return formatted.toString()
  }