
import React, { useState } from 'react'
import Button from '../Button/Button'
import './datefilter.scss'
import { FilteredDateType } from '../../types'

interface DateFilterPropTypes {
  closeModal: () => void
  handleApplyFilter: (data: FilteredDateType) => void
}

const DateFilter = ({ closeModal, handleApplyFilter } : DateFilterPropTypes) => {

  const [filteredDates, setFilteredDates] = useState({
    from_date: '',
    to_date: ''
  })
  const [error, setError] = useState('')

  /* Store the input changes for dates in state */
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target

    setFilteredDates((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  /* To close the filter modal */
  const closeFilter = () => {
    setError('')
    closeModal()
  }

  /* Validate if the dates are not filled */
  const validateFilters = () => {
    let dateError = false
    if(filteredDates.from_date.trim() === '' ||
      filteredDates.to_date.trim() === ''
    ) {
      setError('Both form date and to date are required')
      dateError = true
    } else {
      setError('')
    }
    return dateError
  }

  /* Handle filter when applied */
  const applyFilter = () => {
    // check for validations if any of the input is not filled
    const dateError = validateFilters()
    if(dateError) {
      return
    }
    handleApplyFilter(filteredDates)
    setFilteredDates({from_date: '', to_date: ''})
    closeModal()
  }

  return (
    <div className="filter-modal">
      <div className='filter-modal__date-wrapper'>
        <div className='filter-modal__input-wrapper'>
          <label htmlFor="from_date">From Date :</label>
          <input 
            type='date'
            id='from_date'
            name='date'
            className='filter-modal__date-input'
            value={filteredDates.from_date}
            onChange={handleDateInputChange}
          />
        </div>
        <div className='filter-modal__input-wrapper'>
          <label htmlFor="to_date">To Date :</label>
          <input
            type='date'
            id='to_date'
            name='date'
            value={filteredDates.to_date}
            className='filter-modal__date-input'
            onChange={handleDateInputChange}
          />
        </div>
      </div>
      <div className='filter-modal__btn-wrapper'>
        <Button 
          buttonText='Apply'
          buttonType='primary'
          handleBtnClick={applyFilter}
        />
        <Button 
          buttonText='Close'
          buttonType='primary'
          handleBtnClick={closeFilter}
        />
      </div>
      { error.trim() !== '' && 
        <p className='error'>
          {error}
        </p>
      } 
    </div>
  )
}

export default DateFilter