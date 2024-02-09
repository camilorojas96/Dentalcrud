import {Link} from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
/* eslint-disable react/prop-types */

const Patient = ({patient, get_patients}) =>{

    
    const delete_patient = async(id) =>{
        const result = await Swal.fire({
            title: "Do you really want to delete the patient?",
            icon: "Warning",
            showCancelButton: true,
            confirmButtonColor: "#008000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it"
        })

        if(result.isConfirmed){
            try {
                await axios.delete(`http://localhost:3000/api/patients/${id}`)
                toast.success("Deleted patient successfully")
                get_patients()
                
            } catch (error) {
                toast.error(error.message)
            }

        }
    }

    return(
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="px-3 pb-3">
                <h2 className="text font-semibold">ID: {patient.id}</h2>
                <div className="text-sm">Last name: {patient.last_name}</div>
                <div className="text-sm">Name: { patient.name}</div>
                <div className="text-sm">Phone: {patient.phone}</div>
                <div className="text-sm">Email: {patient.email}</div>

                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${patient._id}`} className="inline-block w-full text-center shadow-md text-sm bg-blue-600 text-white rounded-sm px-4 py-1 font-bold hover:bg-blue-400 hover:cursor-pointer">Edit</Link>
                    <button onClick={()=>delete_patient(patient._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-500 hover:cursor-pointer">Delete</button>
                </div>
            
            </div>
            
        </div>
    )
}

export default Patient