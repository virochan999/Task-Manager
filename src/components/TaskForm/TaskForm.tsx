import React, { useReducer, useState } from "react"
import './taskForm.scss'
import Button from "../Button/Button"
import taskFormReducer from "../../Reducers/taskFormReducers"
import { Task } from "../../types"


interface TaskFormPropTypes {
  closeModal: () => void
  createNewTask: (newTask: Task) => void
}

interface FormErrors {
  name?: string;
  date?: string;
}

const TaskForm = ({ closeModal, createNewTask } : TaskFormPropTypes ) => {

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    date: ''
  })
  const [state, dispatch] = useReducer(taskFormReducer, {
    id: null,
    name: "",
    dueDate: "",
    status: "To-Do",
    errors: {}
  })

  const validateFormData = () => {
    const errors: FormErrors = {};
    if (!state.name.trim()) {
      errors.name = "Task name is required";
    }
    if (!state.dueDate) {
      errors.date = "Due date is required";
    }
    return errors;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    switch (id) {
      case "name":
        dispatch({ type: "SET_TASK_NAME", payload: value })
        break
      case "dueDate":
        dispatch({ type: "SET_DUE_DATE", payload: value })
        break
      case "status":
        dispatch({ type: "SET_STATUS", payload: value })
        break
      default:
        break
    }
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_STATUS", payload: e.target.value })
  }

  const closeForm = () => {
    setFormErrors({name: '', date: ''})
    closeModal()
  }

  const createNewTaskForm = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault()
      const errors = validateFormData();
      if (Object.keys(errors).length === 0) {
        const newTask = {
          id: Date.now(),
          name: state.name,
          dueDate: state.dueDate,
          status: state.status,
        }
  
        dispatch({ type: "RESET_FORM" })
        setFormErrors({name: '', date: ''})
        createNewTask(newTask)
        closeModal()
      } else {
        setFormErrors(errors)
      }
    }
  }

  return (
    <form className="task-form">
      <h3 className="task-form__heading">Create New Task</h3>
      <div className="task-form__input-wrapper">
        <label htmlFor="name">Name :
          <span className="task-form__required-sign">*</span>
          { formErrors.name && 
            <span className="error-message">{formErrors.name}</span>
          }
        </label>
        <input 
          type="text" 
          required
          placeholder="Enter Task Name..." 
          id="name"
          value={state.name}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="task-form__input-wrapper">
        <label htmlFor="dueDate">Due Date :
          <span className="task-form__required-sign">*</span>
          { formErrors.date && 
            <span className="error-message">{formErrors.date}</span>
          }
        </label>
        <input 
          type="date" 
          required
          placeholder="Enter Due Date(Format: 01/01/2024)"
          id="dueDate"
          value={state.dueDate}
          onChange={handleInputChange} 
        />
      </div>
      <div className="task-form__input-wrapper-status">
        <h3>Status :</h3>
        <div className="task-form__input-wrapper--status">
          <div className="task-form__status-label">
            <input 
              type="radio"
              id="To-Do"
              name="status"
              value="To-Do"
              checked={state.status === "To-Do"}
              onChange={handleStatusChange}
            />
            <label htmlFor="To-Do">To-Do</label>
          </div>
          <div className="task-form__status-label">
            <input 
              type="radio"
              id="InProgress"
              name="status"
              value="InProgress"
              checked={state.status === "InProgress"}
              onChange={handleStatusChange}
            />
            <label htmlFor="InProgress">InProgress</label>
          </div>
          <div className="task-form__status-label">
            <input 
              type="radio"
              id="Done"
              name="status"
              value="Done"
              checked={state.status === "Done"}
              onChange={handleStatusChange}
            />
            <label htmlFor="InProgress">Done</label>
          </div>
        </div>
      </div>
      <div className="task-form__btn-wrapper">
        <Button
          buttonText="Create"
          buttonType="secondary"
          btnType='submit'
          handleBtnClick={createNewTaskForm}
        />
        <Button
          buttonText="Close"
          buttonType="secondary"
          handleBtnClick={closeForm}
        />
      </div>
    </form>
  )
}

export default TaskForm