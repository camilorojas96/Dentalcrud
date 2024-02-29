import { Route, Routes, Link } from "react-router-dom"
import Home_page from "./pages/Home_page"
import Create_page from "./pages/Create_page"
import Edit_page from "./pages/Edit_page";
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Login_page from "./pages/Log in/Login_page"
import Home_page_patient from "./pages/Home_page_patient";
import Forgot_password from "./pages/Forgot_password";
import Change_password from "./pages/Change_password";


const App = ()=>{
  return (
    <div>
      <nav className="bg-gradient-to-r from-purple-500">
        <div className="container mx-1 p-2">
          <Link to="/"><h2 className="text-white text-2xl font-bold">Heiditas Clinic</h2></Link>
        </div>
      </nav>
      <div className="container mx-auto p-2 h-full">
      <Routes>
        <Route index element ={<Login_page/>}></Route>
        <Route path="/home" element ={<Home_page/>}></Route>
        <Route path="/forgot_password" element ={<Forgot_password/>}></Route>
        <Route path= "/change_password/:id"element ={<Change_password/>}></Route>
        <Route path="/home/patient/:id" element ={<Home_page_patient/>}></Route>
        <Route path="/create" element ={<Create_page/>}></Route>
        <Route path="/edit/:id" element={<Edit_page/>}></Route>
      </Routes>
      </div>
      <ToastContainer/>
      
    </div>
  )
}

export default App