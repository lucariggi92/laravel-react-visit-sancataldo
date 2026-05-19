import HomePage from './pages/HomePage'
import AppLayout from './layouts/AppLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowsRouter>

        <Routes>
          <Route element={<AppLayout/>}>
            <Route element={<HomePage/>} path="/" />
          </Route>
        </Routes>
      </BrowsRouter>

    </>
  )
}

export default App
