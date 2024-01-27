import {Link} from "react-router-dom"
/* eslint-disable react/prop-types */

const Patient = ({patient}) =>{
    return(
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="px-3 pb-3">
                <h2 className="text font-semibold">ID: {patient.id}</h2>
                <div className="text-sm">Last name: {patient.last_name}</div>
                <div className="text-sm">Name: { patient.name}</div>
                <div className="text-sm">Phone: {patient.phone}</div>
                <div className="text-sm">Email: {patient.email}</div>

                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${patient._id}`} className="inline-block w-full text-center shadow-md text-sm bg-yellow-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-yellow-500 hover:cursor-pointer">Edit</Link>
                    <Link to={`/edit`} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-500 hover:cursor-pointer">Delete</Link>
                </div>
            
            </div>
            
        </div>
    )
}

export default Patient