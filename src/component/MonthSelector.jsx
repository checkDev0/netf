const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // const [selectedMonth, setSelectedMonth] = useState('')

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value))
  }

  return (
    <select
      value={selectedMonth}
      onChange={handleMonthChange}
      className='form-input'
    >
      <option value=''>Month</option>
      {months.map((month, index) => (
        <option key={index} value={index}>
          {month}
        </option>
      ))}
    </select>
  )
}

export default MonthSelector
