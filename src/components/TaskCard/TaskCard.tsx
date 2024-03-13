import { useState } from "react"
import { Task } from "../../types"
import trashImage from '../../assets/trash-2.svg'
import editImage from '../../assets/edit-icon.svg'
import Button from "../Button/Button"
import DialogModal from "../DialogModal/DialogModal"
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"

interface TaskDataTypes {
  taskData: Task
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void
  deleteTask: (taskId: number) => void
}

interface FormErrors {
  name?: string;
  date?: string;
}

const TaskCard = ({ taskData, updateTask, deleteTask } : TaskDataTypes) => {
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [modal, setModal] = useState(false)
  const [editedTask, setEditedTask] = useState({ ...taskData })
  const [error, setError] = useState<FormErrors>({
    name: '',
    date: ''
  })
  
  /* Toggle the edit task boolean to edit the task */
  const editTaskData = () => {
    setIsEditVisible(!isEditVisible)
  }

  const validateEditTask = () => {
    let valError: FormErrors = {}
    if(editedTask.name.trim() === '') {
      valError.name = '* Required'
    } 
    if(editedTask.dueDate.trim() === '') {
      valError.date = '* Required'
    }
    return valError
  }

  /* Save the new edited task data */
  const saveTaskData = () => {
    const valError = validateEditTask()

    if(Object.keys(valError).length === 0) {
      setError({name: '', date: ''})
      updateTask(taskData.id, editedTask)
      setIsEditVisible(!isEditVisible)
    } else {
      setError(valError)
    }
  }

  /* Handle the cancel button functionality */
  const cancelSave = () => {
    setError({name: '', date: ''})
    setEditedTask({ ...taskData })
    setIsEditVisible(!isEditVisible)
  }

  /* Open delete modal on delete button click */
  const handleDeleteBtnClick = () => {
    setModal(true)
  }

  /* To delete the task data using task ID */
  const deleteTaskData = () => {
    deleteTask(taskData.id)
    setModal(false)
  }

  /* Set the new edited values to the task */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const fieldName = id.replace(`-${taskData.id}`, '')
    setEditedTask((prevTask) => ({
      ...prevTask,
      [fieldName]: value
    }))
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      status: value,
    }))
  }

  return (
    <>
      { isEditVisible ?
        <>
          <input 
            type="text"
            name="name"
            id={`name-${taskData.id}`}
            onChange={handleInputChange}
            value={editedTask.name}
            placeholder="task name..."
            required
            autoComplete="off"
            className={`home-page__task-input ${error.name?.trim() !== '' ? 'error' : ''}`}
          />
          {error.name?.trim() !== '' && <p className="error-message">{error.name}</p>}
        </> :
        <h3 title={taskData.name}>{taskData.name}</h3>
      }
      <span className="home-page__task-date--wrapper">
        <p>Due Date:</p>
        {
          isEditVisible ?
          <>
            <input
              type="date"
              name="dueDate"
              id={`dueDate-${taskData.id}`}
              onChange={handleInputChange}
              value={editedTask.dueDate}
              placeholder="01/01/2001"
              required
              autoComplete="off"
              className="home-page__task-input"
            />
            {error.date?.trim() !== '' && <p className="error-message">{error.date}</p>}
          </> :
          <p className="home-page__task-date">{taskData.dueDate}</p>
        }
      </span>
      {
        isEditVisible ?
        <div className="home-page__edit-status-wrapper">
          <div className="home-page__edit-status">
            <input 
              name={`status-${taskData.id}`}
              id={`to-do-${taskData.id}`}
              type="radio"
              value="To-Do"
              checked={editedTask.status === "To-Do"}
              onChange={handleStatusChange}
              className="home-page__edit-input"
            />
            <label htmlFor={`to-do-${taskData.id}`}>To-Do</label>
          </div>
          <div className="home-page__edit-status">
            <input
              name={`status-${taskData.id}`}
              id={`InProgress-${taskData.id}`}
              type="radio"
              value="InProgress"
              checked={editedTask.status === "InProgress"}
              onChange={handleStatusChange}
              className="home-page__edit-input"
            />
            <label htmlFor={`InProgress-${taskData.id}`}>InProgress</label>
          </div>
          <div className="home-page__edit-status">
            <input
              name={`status-${taskData.id}`}
              id={`done-${taskData.id}`}
              type="radio"
              value="Done"
              checked={editedTask.status === "Done"}
              onChange={handleStatusChange}
              className="home-page__edit-input"
            />
            <label htmlFor={`done-${taskData.id}`}>Done</label>
          </div>
        </div> :
        <p className={`home-page__task-status ${taskData.status.toLowerCase()}`}>{taskData.status}</p>
      }
      <div className="home-page__task-edit">
        {
          isEditVisible ?
          <div className="home-page__action-btns">
            <Button
              buttonText="Save"
              buttonType="secondary"
              handleBtnClick={saveTaskData}
            />
            <Button
              buttonText="Cancel"
              buttonType="secondary"
              handleBtnClick={cancelSave}
            />
          </div> :
          <>
            <Button
              buttonText="Edit"
              buttonType="edit"
              handleBtnClick={editTaskData}
            >
              <img src={editImage} alt="edit icon"></img>
            </Button>
            <Button
              buttonText="Delete"
              buttonType="delete"
              handleBtnClick={handleDeleteBtnClick}
            >
              <img src={trashImage} alt="delete icon"></img>
            </Button>
            <DialogModal
              openModal={modal}
              closeModal={() => setModal(false)}
            >
              <ConfirmationModal
                onDeleteTask={deleteTaskData}
                onDeleteCancel={() => setModal(false)}
              />
            </DialogModal>
          </>
        }
      </div>
    </>
  )
}

export default TaskCard