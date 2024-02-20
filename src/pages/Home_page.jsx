import { useEffect, useState } from "react"
import axios from "axios"
import Patient from "../components/Patients"
import {Link} from "react-router-dom"



const Home_page = ()=>{
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const get_patients = async () => {
      try {
        setIsLoading(true);
        const token = sessionStorage.getItem("token")
        const response = await axios.get("http://127.0.0.1:3000/api/patients", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
        setPatients(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      get_patients();
    }, []);
  
    return (
      <div>
        <div>
          <Link to="/create" className="inline-block mt-4 shadow-md bg-emerald-500 text-white rounded-sm px-4 py-2 font-bold hover:bg-emerald-400 hover:cursor-pointer">
            Add Patient
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {isLoading ? (
            "Loading"
          ) : (
            <>
              {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <Patient key={index} patient={patient} get_patients={get_patients} />
                ))
              ) : (
                <div>
                  There are no patients
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
}

export default Home_page