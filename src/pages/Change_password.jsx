  import { useState } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import { toast } from 'react-toastify';
  import axios from 'axios';

  const Change_password = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    let { id} = useParams()

    const handleNewPasswordChange = (e) => {
      const value = e.target.value;
      setNewPassword(value);
    };

    const handleConfirmPasswordChange = (e) => {
      const value = e.target.value;
      setConfirmPassword(value);
    };

    const Change_password = async (e) => {
      e.preventDefault();

      if (newPassword === '' || confirmPassword === '') {
        toast.error('Please enter both new and confirm passwords');
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      try {
        const response = await axios.post(`http://localhost:3000/api/patients/change_password/${id}`, {
          newPassword,
        });
        
        if (response.data.success) {
          toast.success('Password changed successfully');
          navigate('/');
        } else {
          toast.error('Invalid token or error changing password');
        }
      } catch (error) {
        toast.error('Error during password change. Please try again.');
      }
    };

    return (
      <div className="container bg-gray-200 p-8 md:p-16 rounded-lg">
        <div className="header flex flex-col items-center gap-4 mt-8 md:mt-12">
          <h1 className="text-purple-500 text-4xl font-bold">Change Password</h1>
          <div className="w-16 h-1 bg-purple-500 rounded-full"></div>
        </div>

        <div className="inputs mt-8 md:mt-12 flex flex-col gap-6">
          <div className="input flex items-center mx-auto w-72 h-12 bg-gray-300 rounded-md px-4">
            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-transparent focus:outline-none"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className="input flex items-center mx-auto w-72 h-12 bg-gray-300 rounded-md px-4">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-transparent focus:outline-none"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
        </div>

        <div className="submit-container mt-8 md:mt-12 text-center">
          <button
            onClick={Change_password}
            className="submit bg-purple-500 text-white px-10 py-3 rounded-md font-semibold mx-auto"
          >
            Change Password
          </button>
        </div>
      </div>
    );
  };

  export default Change_password
