import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"


const Home_page_patient = ()=>{

  let {id} = useParams()
    
    const [patient, set_patient] = useState({
        id: "",
        name: "",
        last_name: "",
        phone: "",
        email: "",
    })

    const get_patient = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`http://127.0.0.1:3000/api/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.data && response.data._id) {
          set_patient({
            id: response.data.id,
            name: response.data.name,
            last_name: response.data.last_name,
            phone: response.data.phone,
            email: response.data.email,
          });
        } else {      
          toast.error("Invalid patient data");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
  useEffect(()=>{
    get_patient()
  },[])

    return (
<div className="max-w-lg mx-auto p-7 rounded mt-6 bg-white shadow-md">
    <h2 className="font-semibold text-2xl mb-4 block text-center">
      Patient: {patient.id}
    </h2>

    <table className="table-auto w-full text-center">
      <thead>
        <tr>
          <th className="px-4 py-2 text-gray-700 bg-gray-200">Patient</th>
          <th className="px-4 py-2 text-gray-700 bg-gray-200">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 text-gray-600">ID</td>
          <td className="px-4 py-2 text-gray-600">{patient.id}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-gray-600">Last Name</td>
          <td className="px-4 py-2 text-gray-600">{patient.last_name}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-gray-600">Name</td>
          <td className="px-4 py-2 text-gray-600">{patient.name}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-gray-600">Phone</td>
          <td className="px-4 py-2 text-gray-600">{patient.phone}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-gray-600">Email</td>
          <td className="px-4 py-2 text-gray-600">{patient.email}</td>
        </tr>
      </tbody>
    </table>
  </div>
)
}

export default Home_page_patient