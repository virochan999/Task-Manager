import "./Home.scss"
import { useEffect, useState } from "react"
import Navigation from "../../components/Navigations/Navigation"
import TaskCard from "../../components/TaskCard/TaskCard"
import Header from "../../components/Header/Header"
import useLocalStorage  from "../../hooks/useLocalStorage"
import SortTasks from "../../components/SortTasks/SortTasks"
import Filter from "../../components/Filter/Filter"
import { FilteredDateType, Task } from "../../types"
import { toast } from "react-toastify"

const Home = () => {
  const [taskData, setTaskData] = useLocalStorage<Task[]>("tasks", [] as Task[])
  const [filteredData, setFilteredData] = useState(taskData)
  const [searchedName, setSearchedName] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  /* Set filtered data whenever the task data changes */
  useEffect(() => {
    setFilteredData(taskData)
  },[taskData])

  /* Filter the tasks when status, search data and original data changes */
  useEffect(() => {
    let filteredTasks

    if(selectedStatus === 'All') {
      filteredTasks = searchedName.trim() !== ""
        ? taskData.filter((item) => item.name.toLowerCase().includes(searchedName.toLowerCase()))
        :  [...taskData]
    } else {
      filteredTasks = taskData.filter(item => item.status === selectedStatus 
        && item.name.toLowerCase().includes(searchedName.toLowerCase())
      )
    }
    // Arrange tasks on the basis of their orders
    if(selectedOrder) {
      if(selectedOrder === 'ascending') {
        filteredTasks = [...filteredTasks].sort((a,b) => 
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        )
      } else {
        filteredTasks = [...filteredTasks].sort((a,b) => 
          new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        )
      }
    }
    setFilteredData(filteredTasks)
  },[selectedStatus, searchedName, selectedOrder, taskData])
  
  /* Arrange the tasks by ascending order */
  const orderTaskByAsc = (order: string) => {
    setSelectedOrder(order)
  }

  /* Arrange the tasks by descending order */
  const orderTaskByDesc = (order: string) => {
    setSelectedOrder(order)
  }

  /* To create a new task */
  const createNewTask = (newTask: Task) => {
    const newData = [...taskData, newTask]
    setTaskData(newData)
    toast.success("Successfully added the new task")
  }

  /* Apply the filters according the from and to dates */
  const applyFilter = (filterDates: FilteredDateType) => {
    const filteredTasks = taskData.filter((task) => {
      const taskDueDate = new Date(task.dueDate).getTime()
      const fromDate = filterDates.from_date ? new Date(filterDates.from_date).getTime() : 0
      const toDate = filterDates.to_date ? new Date(filterDates.to_date).getTime() : Number.MAX_SAFE_INTEGER

      return taskDueDate >= fromDate && taskDueDate <= toDate
    })

    setFilteredData(filteredTasks)
  }

  /* Set the task status */
  const filterTasksStatus = (status: string) => {
    setSelectedStatus(status)
  }

  /* Set the searched string in state */
  const searchedTask = (searchTerm: string) => {
    setSearchedName(searchTerm)
  }

  /* Update the task data with the new data */
  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    const updatedTasks = taskData.map((task) => {
      if(task.id === id) {
        return {
          ...task,
          ...updatedTask  
        }
      } else {
        return task
      }
    })
    setTaskData(updatedTasks)
    toast.success("Successfully updated the task")
  }

  /* Delete the selected task */
  const deleteTask = (taskId: number) => {
    // Find the task index from task list
    const index = taskData.findIndex((task) => task.id === taskId)

    // Slice the list from that index to delete the task
    if(index !== -1) {
      const updatedTasks = [...taskData.slice(0, index), ...taskData.slice(index + 1)]
      setTaskData(updatedTasks)
    }
    toast.success("Successfully deleted the task")
  }

  return (
    <>
      <Header
        searchedTask={searchedTask}
        createNewTask={createNewTask}
      />
      <div className="home-page">
        <div className="home-page__header">
          <SortTasks
            orderTaskByAsc={orderTaskByAsc}
            orderTaskByDesc={orderTaskByDesc}
          />
          <Filter
            handleApplyFilter={applyFilter}
          />
        </div>
        <div className="home-page__section">
          <Navigation
            filterTasksStatus={filterTasksStatus}
          />
          {filteredData.length === 0 && <p className="home-page__no-task">No Task Found</p>}

          <div className="home-page__tasks-section">
            { 
              filteredData.length !== 0 &&
              filteredData.map((task) => (
                <div key={`task -${task.id}`} className="home-page__task">
                  <TaskCard
                    taskData={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home