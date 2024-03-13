import { ToastContainer } from 'react-toastify'
import './App.css'
import Home from './pages/Home/Home'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Home />
      <ToastContainer
        autoClose={2000}
      />
    </>
  )
}

export default App
