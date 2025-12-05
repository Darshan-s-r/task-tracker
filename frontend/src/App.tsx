import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import NavBar from './components/NavBar';

function App() {
  return (
    <Routes>
      <Route element={ <NavBar />} >
      <Route path="/"  element={<Home />} />
      <Route path="/create-task" element={<CreateTask />} />
      </Route>
    </Routes>
  )
}

export default App;
