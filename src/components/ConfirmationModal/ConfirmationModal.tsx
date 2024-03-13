import './confirmationModal.scss'
import Button from "../Button/Button"

interface ConfirmationModalPropTypes {
  onDeleteTask: () => void
  onDeleteCancel: () => void
}

const ConfirmationModal = ({ onDeleteTask, onDeleteCancel } : ConfirmationModalPropTypes) => {

  /* To confirm deletion of task */
  const deleteTask = () => {
    onDeleteTask()
  }

  /* To cancel deletion of task */
  const cancelDelete = () => {
    onDeleteCancel()
  }

  return (
    <div className="confirmation-modal">
      <p>Are you sure to delete the task?</p>
      <div className="confirmation-modal__btn-wrapper">
        <Button
          buttonText="Yes"
          buttonType="primary"
          handleBtnClick={deleteTask}
        />
        <Button
          buttonText="No"
          buttonType="primary"
          handleBtnClick={cancelDelete}
        />
      </div>
    </div>
  )
}

export default ConfirmationModal