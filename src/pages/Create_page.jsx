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
    const[administrator,set_administrator] = useState(false)
    const[is_loading, set_is_loading] = useState(false)
    const navigate = useNavigate()

    
    const add_patient = async(e) =>{
        e.preventDefault()
        if(name === "" || id ==="" || last_name ==="" || phone === "" || email ===""){
            toast.error(("Please fill all the information"))
            return    
        }
        const pattern_id = /^(\d{6,10})$/
        if(!pattern_id.test(id)){
            toast.error(("Invalid ID"))
            toast.error(("Id must only contain [6-10] Numbers"))
            return
        }
        const pattern_last_name = /^([A-Z]{1})([a-z]{1,})$/
        if(!pattern_last_name.test(last_name)){
            toast.error(("Invalid last name"))
            toast.error(("Only input one last name , starting with Upper case"))
            return
        }
        const pattern_name = /^([A-Z]{1})([a-z]{1,})$/
        if(!pattern_name.test(name)){
            toast.error(("Invalid name"))
            toast.error(("Only input one name , starting with Upper case"))
            return 
        }
        const pattern_phone = /\+\d{12}/
        if(!pattern_phone.test(phone)){
            toast.error(("Invalid phone"))
            toast.error(("'+' + Country code + Phone"))
            return
        }
        const pattern_email = /^[\w.-]{4,30}@[\w.-]{3,10}\.\w{2,5}([.\w]{3,3})?$/
        if(!pattern_email.test(email)){
            toast.error(("Invalid email"))
            toast.error(("Characters not permitted"))
            return
        }
        try {
            set_is_loading(true)
            const token = sessionStorage.getItem('token')   
            const response = await axios.post("http://localhost:3000/api/patients/create", 
        {name: name, last_name: last_name, id: id, phone: phone, email: email, administrator: administrator}, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
            toast.success(`Saved: ${response.data.last_name} ${response.data.name} successfully`)
            set_is_loading(false)
            navigate("/home")
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
                    <input type="string" value={id} onChange={(e)=> set_id(e.target.value)}className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter patient ID"/>
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
                    <input type="string" value={phone} onChange={(e)=> set_phone(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter patient phone"/>
                </div>
                <div className="space-y-2">
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e)=> set_email(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter patient email"/>
                </div>
                <div className="space-y-4">
                <div className="flex items-center">
                    <label className="mr-4">Not Administrator</label>
                    <div>
                        <input
                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-blue-600 dark:after:bg-blue-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            role="switch"
                            id="flex_switch"
                            checked={administrator}
                            onChange={(e) => set_administrator(e.target.checked)}
                        />
                        <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                            Administrator
                        </label>
                    </div>
                </div>
                </div>
                <div>
                    {!is_loading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Add Patient</button>)}   
                </div>
            </form>
        </div>
            
    )
}

export default Create_page