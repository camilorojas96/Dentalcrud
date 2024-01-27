import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Create_page = ()=>{

    const[name,set_Name]  = useState("")
    const[id,set_id] = useState("")
    const[last_name,set_last_name] = useState("")
    const[phone,set_phone] = useState("")
    const[email,set_email] = useState("")
    const[is_loading, set_is_loading] = useState(false)
    const navigate = useNavigate()
    
    const add_patient = async(e) =>{
        e.preventDefault()
        if(name === "" || id ==="" || last_name ==="" || phone === "" || email ===""){
            toast.error(("Please fill all the information"))
            return
        }
        try {
            set_is_loading(true)
            const response = await axios.post("http://localhost:3000/api/patients", {name: name, last_name: last_name, id: id, phone: phone, email: email})
            toast.success(`Saved: ${response.data.last_name} ${response.data.name} successfully`)
            set_is_loading(false)
            navigate("/")
        } catch (error) {
            toast.error(error.message)
            set_is_loading(false)
            
        }
    }

    return(
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className=" font-semibold text-2x1 mb-4 block text-center">
                Add a patient
            </h2>
            <form onSubmit={add_patient}>
                <div className="space-y-2">
                    <label>ID</label>
                    <input type="number" value={id} onChange={(e)=> set_id(e.target.value)}className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter patient ID"/>
                </div>
                <div className="space-y-2">
                    <label>Last name</label>
                    <input type="text" value={last_name} onChange={(e)=> set_last_name(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter patient last name"/>
                </div>
                <div className="space-y-2">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e)=> set_Name(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter patient name"/>
                </div>
                <div className="space-y-2">
                    <label>Phone</label>
                    <input type="number" value={phone} onChange={(e)=> set_phone(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter patient phone"/>
                </div>
                <div className="space-y-2">
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e)=> set_email(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter patient email"/>
                </div>
                <div>
                    {!is_loading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Add Patient</button>)}   
                </div>
            </form>
        </div>
            
    )
}

export default Create_page