import { useEffect, useState } from "react"
import axios from "axios"
import Patient from "../components/Patients"
import {Link} from "react-router-dom"



const Home_page = ()=>{
    
    const [patients, set_patients] = useState([])
    const [is_loading, set_is_loading] = useState(false)
    
    
    const get_patients = async() =>{
        try {
            set_is_loading(true)
            const response =  await axios.get("http://127.0.0.1:3000/api/patients")
            console.log(response.data)
            set_patients(response.data)
            set_is_loading(false)

        } catch (error) {
            console.log(error)        
        }

    }

    useEffect(() => {
        get_patients()
    }, [])

    return(
        <div>
            <div>
                <Link to ="/create" className="inline-block mt-4 shadow-md bg-green-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-green-500 hover:cursor-pointer"> Add Patient</Link>
            </div>
            <div className=" grid grid.cols-2 lg:grid-cols-4 gap-4 mt-5">
                {is_loading ?(
                    "Loading"
                ): (
                    <>
                    {patients.length > 0 ? (   
                        <>
                            {
                                patients.map((patient, index) =>{
                                    return (
                                        <Patient key={index} patient={patient} get_patients ={get_patients}/>
                                    )
                                })
                            }
                        </> 

                    ): (
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