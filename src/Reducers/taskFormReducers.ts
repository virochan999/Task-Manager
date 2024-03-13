export interface TaskFormState {
  id: number | null
  name: string
  dueDate: string
  status: string
  errors?: { [key: string]: string }
}

export type TaskFormAction =
  | { type: "SET_ID"; payload: number }
  | { type: "SET_TASK_NAME"; payload: string }
  | { type: "SET_DUE_DATE"; payload: string }
  | { type: "SET_STATUS"; payload: string }
  | { type: "SET_VALIDATION_ERRORS"; payload: { [key: string]: string } }
  | { type: "RESET_FORM" }

type TaskFormReducer = React.Reducer<TaskFormState, TaskFormAction>

const taskFormReducer: TaskFormReducer = (state, action) => {
  switch(action.type) {
    case "SET_ID":
      return { ...state, id: action.payload }
    case "SET_TASK_NAME":
      return { ...state, name: action.payload }
    case "SET_DUE_DATE":
      return { ...state, dueDate: action.payload }
    case "SET_STATUS":
      return { ...state, status: action.payload }
    case "SET_VALIDATION_ERRORS":
      return { ...state, errors: action.payload }
    case "RESET_FORM":
      return {  id: null, name: "", dueDate: "", status: "To-Do", error: {} }
    default:
      return state
  }
}

export default taskFormReducer
