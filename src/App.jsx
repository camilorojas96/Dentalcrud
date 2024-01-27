import { Route, Routes, Link } from "react-router-dom"
import Home_page from "./pages/Home_page"
import Create_page from "./pages/Create_page"
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Edit_page from "./pages/Edit_page";

const App = ()=>{
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="container mx-1 p-2">
          <Link to="/"><h2 className="text-white text-2xl font-bold">Dental CRUD</h2></Link>
        </div>
      </nav>
      <div className="container mx-auto p-2 h-full">
      <Routes>
        <Route index element ={<Home_page/>}></Route>
        <Route path="/create" element ={<Create_page/>}></Route>
        <Route path="/edit/:id" element={<Edit_page/>}></Route>
      </Routes>
      </div>
      <ToastContainer/>
      
    </div>
  )
}

export default App