import {Link} from "react-router-dom"

function Login_page() {
  return (
    <div>
      <h2>
        Login page
      </h2>
      <div>
      <Link to ="/home" className="inline-block mt-4 shadow-md bg-green-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-green-500 hover:cursor-pointer"> Log in</Link>
      </div>
    </div>
  );
}

export default Login_page