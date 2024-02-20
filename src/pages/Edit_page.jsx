import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"


const Edit_page = ()=>{
    let {id} = useParams()
    const navigate = useNavigate()
    const [is_loading, set_is_loading] =useState(false)
    const [patient, set_patient] = useState({
        id: "",
        name: "",
        last_name: "",
        phone: "",
        email: "",
        password: "",
    })

    const get_patient = async() =>{
        set_is_loading(true)
        try {
        const token = sessionStorage.getItem('token')
        const response = await axios.get(`http://127.0.0.1:3000/api/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
            set_patient({
                id: response.data.id,
                name: response.data.name,
                last_name: response.data.last_name,
                phone: response.data.phone,
                email: response.data.email,
                password: response.data.password
            })
            set_is_loading(false)
            
        } catch (error) {
            set_is_loading(false)
            toast.error(error.message)
        }
    }

    const update_patient= async(e)=>{
        e.preventDefault()
        set_is_loading(true)
        const pattern_id = /^(\d{6,10})$/
        if(!pattern_id.test(patient.id)){
            set_is_loading(false)
            toast.error(("Invalid ID"))
            toast.error(("Id must only contain [6-10] Numbers"))
            return
        }
        const pattern_last_name = /^([A-Z]{1})([a-z]{1,})$/
        if(!pattern_last_name.test(patient.last_name)){
            set_is_loading(false)
            toast.error(("Invalid last name"))
            toast.error(("Only input one last name , starting with Upper case"))
            return
        }
        const pattern_name = /^([A-Z]{1})([a-z]{1,})$/
        if(!pattern_name.test(patient.name)){
            set_is_loading(false) 
            toast.error(("Invalid name"))
            toast.error(("Only input one name , starting with Upper case"))
            return 
        }
        const pattern_phone = /\+\d{12}/
        if(!pattern_phone.test(patient.phone)){
            set_is_loading(false)
            toast.error(("Invalid phone"))
            toast.error(("'+' + Country code + Phone"))
            return
        }
        const pattern_email = /^[\w.-]{4,30}@[\w.-]{3,10}\.\w{2,5}([.\w]{3,3})?$/
        if(!pattern_email.test(patient.email)){
            set_is_loading(false)
            toast.error(("Invalid email"))
            toast.error(("Characters not permitted"))
            return
        }
        const pattern_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*#?&]){8,16}$/
        if(!pattern_password.test(patient.password)){
            set_is_loading(false)
            toast.error(("Invalid password"))
            toast.error(("Password must contain: 8-16 characters, at least one upper, lower letter and special character"))
            return
        } 
        try {

            await axios.put(`http://localhost:3000/api/patients/${id}`, patient)
            toast.success("Updated patient")
            navigate('/home')

            
        } catch (error) {
            set_is_loading(false)
            toast.error(error.message)
        }
        
    }

    useEffect(()=>{
        get_patient()
    },[id])

    return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
        <h2 className=" font-semibold text-2x1 mb-4 block text-center">
            Update Patient {patient.id}
        </h2>
        {is_loading ? ("Loading"): (
            <>
                <form onSubmit={update_patient}>
                <div className="space-y-2">
                    <label>ID</label>
                    <input type="string" value={patient.id} onChange={(e)=> set_patient({...patient, id: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Change patient ID"/>
                </div>
                <div className="space-y-2">
                    <label>Last name</label>
                    <input type="text" value={patient.last_name} onChange={(e)=> set_patient({...patient, last_name: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Change patient last name"/>
                </div>
                <div className="space-y-2">
                    <label>Name</label>
                    <input type="text" value={patient.name} onChange={(e)=> set_patient({...patient, name: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Change patient name"/>
                </div>
                <div className="space-y-2">
                    <label>Phone</label>
                    <input type="string" value={patient.phone} onChange={(e)=> set_patient({...patient, phone: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Change patient phone"/>
                </div>
                <div className="space-y-2">
                    <label>Email</label>
                    <input type="text" value={patient.email} onChange={(e)=> set_patient({...patient, email: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Change patient email"/>
                </div>
                <div className="space-y-2">
                    <label>Password</label>
                    <input type="text" value={patient.password} onChange={(e)=> set_patient({...patient, password: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Change patient password"/>
                </div>
                <div>
                    {!is_loading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Update Patient</button>)}   
                </div>
            </form>
            </>
        )}
        
    </div>
        
    )
}

export default Edit_page