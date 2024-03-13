import Button from '../Button/Button'
import descImg from "../../assets/decending-icon.svg"
import ascImg from "../../assets/ascending-icon.svg"
import './sortTasks.scss'
import { useState } from 'react'

interface sortTasksPropTypes {
  orderTaskByAsc: (order: string) => void
  orderTaskByDesc: (order: string) => void
}

const SortTasks = ({ orderTaskByAsc, orderTaskByDesc } : sortTasksPropTypes) => {
  const [taskOrderType, setTaskOrderType] = useState('')

  /* To lift state on ascending button click */
  const handleAscOrder = () => {
    orderTaskByAsc('ascending')
    setTaskOrderType('ascending')
  }

  /* To lift state on descending button click */
  const handleDescOrder = () => {
    orderTaskByDesc('descending')
    setTaskOrderType('descending')
  }

  return (
    <div className="home-page__order-btns">
      <Button
        buttonType={`order-by ${taskOrderType === 'ascending' ? 'active' : ''}`}
        buttonText="Ascending"
        handleBtnClick={handleAscOrder}
      >
        <img 
          src={ascImg} 
          alt="filter-img"
          className={`home-page__order-btns--image ${taskOrderType === 'ascending' ? 'active' : ''}`}
        />
      </Button>
      <Button
        buttonType={`order-by ${taskOrderType === 'descending' ? 'active' : ''}`}
        buttonText="Descending"
        handleBtnClick={handleDescOrder}
      >
        <img 
          src={descImg} 
          alt="filter-img" 
          className={`home-page__order-btns--image ${taskOrderType === 'descending' ? 'active' : ''}`}
        />
      </Button>
    </div>
  )
}

export default SortTasks