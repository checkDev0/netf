import { useState, useEffect } from 'react'

const YearSelector = ({ selectedYear, setSelectedYear }) => {
  // const [selectedYear, setSelectedYear] = useState('')
  const [years, setYears] = useState([])

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const futureYears = []
    for (let i = 0; i < 6; i++) {
      futureYears.push(currentYear + i)
    }
    setYears(futureYears)
    setSelectedYear(currentYear)
  }, [])

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value))
  }

  return (
    <select
      value={selectedYear}
      onChange={handleYearChange}
      className='form-input'
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  )
}

export default YearSelector
