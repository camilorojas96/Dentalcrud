
import user_icon from './person.png'
import password_icon from './password.png'
import {Link} from "react-router-dom"




const Login_page = () =>{

  return (
    <div className="container bg-gray-200 p-8 md:p-16 rounded-lg">
    <div className="header flex flex-col items-center gap-4 mt-8 md:mt-12">
      <h1 className="text-purple-500 text-4xl font-bold">Log in</h1>
      <div className="w-16 h-1 bg-purple-500 rounded-full"></div>
    </div>

    <div className="inputs mt-8 md:mt-12 flex flex-col gap-6">
      {['user', 'password'].map((type, index) => (
        <div
          key={index}
          className="input flex items-center mx-auto w-72 h-12 bg-gray-300 rounded-md px-4"
        >
          <img
            src={type === 'user' ? user_icon : password_icon}
            alt=""
            className="mr-4"
          />
          <input
            type={type === 'password' ? 'password' : 'text'}
            placeholder={type === 'user' ? 'Username' : 'Password'}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
      ))}
    </div>

    <div className="submit-container mt-8 md:mt-12 text-center">
      <Link to="/home" className="submit bg-purple-500 text-white px-10 py-3 rounded-md font-semibold mx-auto">Login</Link>

      <div className="forgot-password text-sm mt-4">
        <span>Forgot password?</span>
        <span className="text-purple-500 ml-1 cursor-pointer">Click here!</span>
      </div>
    </div>
  </div>
)
  
}
export default Login_page