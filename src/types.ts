export interface Task {
  id: number
  name: string
  dueDate: string
  status: string
}

export interface FilteredDateType {
  from_date: string,
  to_date: string
}