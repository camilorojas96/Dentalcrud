import user_icon from './person.png'
import password_icon from './password.png'
import { useState, } from 'react'
import { useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import axios from 'axios'


const Login_page = () => {
  const [inputUsername, setUsername] = useState('')
  const [inputPassword, setPassword] = useState('')
  const navigate = useNavigate() 

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === 'username') {
      setUsername(value);
    } else if (type === 'password') {
      setPassword(value);
    }
  };

  const validateUser = async (e) => {
    e.preventDefault();

  if (inputUsername === '' || inputPassword === '') {
    toast.error('Please fill all the information');
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/api/patients/login', {
      username: inputUsername,
      password: inputPassword,
    });

    if (response.data.success) {
      const is_admin = response.data.is_admin
      const _id = response.data._id

      if (is_admin) {
        toast.success('Admin login successful')
        navigate('/home')
      } else {
        toast.success('Patient login successful')
        navigate(`/home/patient/${_id}`)
      }
    } else {
      toast.error('Invalid credentials')
    }
  } catch (error) {
    toast.error('Error during login. Please try again.')
  }
  
}

  return (
    <div className="container bg-gray-200 p-8 md:p-16 rounded-lg">
      <div className="header flex flex-col items-center gap-4 mt-8 md:mt-12">
        <h1 className="text-purple-500 text-4xl font-bold">Log in</h1>
        <div className="w-16 h-1 bg-purple-500 rounded-full"></div>
      </div>

      <div className="inputs mt-8 md:mt-12 flex flex-col gap-6">
        {['username', 'password'].map((type, index) => (
          <div
            key={index}
            className="input flex items-center mx-auto w-72 h-12 bg-gray-300 rounded-md px-4"
          >
            <img
              src={type === 'username' ? user_icon : password_icon}
              alt=""
              className="mr-4"
            />
            <input
              type={type === 'password' ? 'password' : 'text'}
              placeholder={type === 'username' ? 'Username' : 'Password'}
              className="w-full bg-transparent focus:outline-none"
              value={type === 'username' ? inputUsername : inputPassword}
              onChange={(e) => handleInputChange(e, type)}
            />
          </div>
        ))}
      </div>

      <div className="submit-container mt-8 md:mt-12 text-center">
        <button
          onClick={validateUser}
          className="submit bg-purple-500 text-white px-10 py-3 rounded-md font-semibold mx-auto"
        >
          Login
        </button>

        <div className="forgot-password text-sm mt-4">
          <span>Forgot password?</span>
          <span className="text-purple-500 ml-1 cursor-pointer">Click here!</span>
        </div>
      </div>
    </div>
  );
};

export default Login_page;
