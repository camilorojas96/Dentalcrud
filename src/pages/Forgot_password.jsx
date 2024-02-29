
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Forgot_password= () => {
    {
        const [input_username, setUsername] = useState('');
        const navigate = useNavigate();
      
        const handleInputChange = (e) => {
          const value = e.target.value;
          setUsername(value);
        };
      
        const reset_password = async (e) => {
          e.preventDefault();
      
          if (input_username === '') {
            toast.error('Please enter your username');
            return;
          }
      
          try {
            const response = await axios.post('http://localhost:3000/api/patients/forgot_password', {
              username: input_username,
            });
      
            if (response.data.success) {
              toast.success('Password reset link sent to your email');
              navigate('/');
            } else {
              toast.error('Invalid username');
            }
          } catch (error) {
            toast.error('Error during password reset. Please try again.');
          }
        };
      
        return (
          <div className="container bg-gray-200 p-8 md:p-16 rounded-lg">
            <div className="header flex flex-col items-center gap-4 mt-8 md:mt-12">
              <h1 className="text-purple-500 text-4xl font-bold">Forgot Password</h1>
              <div className="w-16 h-1 bg-purple-500 rounded-full"></div>
            </div>
      
            <div className="inputs mt-8 md:mt-12 flex flex-col gap-6">
              <div className="input flex items-center mx-auto w-72 h-12 bg-gray-300 rounded-md px-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full bg-transparent focus:outline-none"
                  value={input_username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
      
            <div className="submit-container mt-8 md:mt-12 text-center">
              <button
                onClick={reset_password}
                className="submit bg-purple-500 text-white px-10 py-3 rounded-md font-semibold mx-auto"
              >
                Reset Password
              </button>
            </div>
          </div>
        )
      }
    } 
export default Forgot_password
