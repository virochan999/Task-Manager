import './header.scss'
import { useState } from 'react'
import taskManagerImg from '../../assets/task-manager.svg'
import Button from '../Button/Button.tsx'
import DialogModal from '../DialogModal/DialogModal.tsx'
import TaskForm from '../TaskForm/TaskForm.tsx'
import { Task } from '../../types.ts'

interface HeaderPropTypes {
  searchedTask: (searchedName: string) => void
  createNewTask: (newTask: Task) => void
}

const Header = ({ searchedTask, createNewTask }: HeaderPropTypes) => {
  const [seachedName, setSeachedName] = useState('')
  const [modal, setModal] = useState(false)

  /* Open modal to create a new task */
  const addNewTask = () => {
    setModal(true)
  }

  /* Set the search string to the state */
  const searchTasks = () => {
    searchedTask(seachedName)
  }

  /* Send the task data to the parent component */
  const createNewTaskForm = (newTask: Task) => {
    createNewTask(newTask)
  }

  return (
    <div className="header">
      <div className='header__heading-wrapper'>
        <img 
          src={taskManagerImg} 
          alt='task manager image' 
          className='header__img'>
        </img>
        <h2 className="home-page__heading">Task Manager</h2>
      </div>
      <div className='header__input-wrapper'>
        <input 
          type="search" 
          className='header__search-bar'
          placeholder='search a task....'
          id='search'
          onChange={(e) => setSeachedName(e.target.value)}
        />
        <Button
          buttonType='primary'
          buttonText='Search'
          handleBtnClick={searchTasks}
        />
      </div>
        <DialogModal
          openModal={modal}
          closeModal={() => setModal(false)}
        >
          <TaskForm
            closeModal={() => setModal(false)}
            createNewTask={createNewTaskForm}
          />
        </DialogModal>
        <Button
          buttonType='primary'
          buttonText='Add New Task'
          handleBtnClick={addNewTask}
          addIcon={true}
        />
    </div>
  )
}

export default Header